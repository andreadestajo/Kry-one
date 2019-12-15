const {ADMIN_DB, ADMIN_AUTH}  = require("../plugin/firebase");
const {nobilities, account}   = require("../references/ref_initial_data");
const ScheduleController      = require("../controllers/ScheduleController");

const MDB_USER           = require('../models/MDB_USER');
const MDB_NOBILITY       = require('../models/MDB_NOBILITY');

module.exports =
{
    async initialize(req, res) {
        // check if already initialized
        const is_user = await MDB_USER.collection().limit(1).get().then(doc => !doc.empty);

        if(is_user) {
            return res.status(200).send({message: "Has been initialized."});
        }

        // Initialize Nobilities
        const addNobilities = nobilities.map(n => {
            delete n.__index;
           return MDB_NOBILITY.add(n)
        });

        //Delete all users
        const users = await ADMIN_AUTH.listUsers(1000)
            .then(function(listUsersResult) {
                return listUsersResult.users.map(function(userRecord) {
                    return userRecord.toJSON().uid
                });
            });

        const deleteUsers = users.map(uid => {
            return ADMIN_AUTH.deleteUser(uid)
        });

        // Initialize Account
        const account_data = account;

        const createUser = await ADMIN_AUTH.createUser
        ({
            email         : account_data.email,
            password      : process.env.ACC_PASSWORD,
            phoneNumber   : account_data.contact_number,
            emailVerified : true
        })
        .then(function(userRecord)
        {
            return {
                data : userRecord.toJSON(),
                error: null
            }
        })
        .catch(function (error)
        {
            return {error}
        });

        if(createUser.error)
        {
            return res.status(500).send({error})
        }

        // Add user
        account_data.created_at = new Date();

        const addAccount = MDB_USER.doc(createUser.data.uid).set(account_data);

        // update currency
        Promise.all([...addNobilities, ...deleteUsers, addAccount, ScheduleController.updateCurrency()])
            .then(async () => {
                // Initial nobility data
                const nobility = await MDB_NOBILITY.getNobilityByRankOrder(2);

                // Assign nobility
                const data = {
                    nobility_id   : nobility.id,
                    nobility_info :
                    {
                        id:             nobility.id,
                        title:          nobility.title,
                        rank_order:     nobility.rank_order,
                        badge_color:    nobility.badge_color,
                    }
                };

                // Update user nobility
                await MDB_USER.update(createUser.data.uid, data);

                return res.status(200).send({message: "You have successfully initialized the data."})
            })
            .catch((error) => {
                return res.status(500).send({error})
            })
    }
};
