const { ADMIN_DB }  = require("../plugin/firebase");
const MDB_USER      = require("../models/MDB_USER");

module.exports =
{
    table: (uid) => `users/${uid}/notifications`,

    doc(uid, id)
    {
        return ADMIN_DB.doc(`${this.table(uid)}/${id}`);
    },
    collection(uid, options = {})
    {
        const collection = ADMIN_DB.collection(this.table(uid));
        return collection;
    },

    async addNew(uid, description, image, options = {})
    {
        let add =   {
                        image: image ? image : '../statics/boy.jpg',
                        new: true,
                        created_date: new Date(),
                        read_date: new Date(),
                        detail: description, 
                        options
                    };

        await this.add(uid, add);
        await MDB_USER.newNotification(uid);

        return "new user added";
    },

    async add(uid, data)
    {
        let res = await ADMIN_DB.collection(this.table(uid)).add(data);
        return res.id;
    },
    async get(uid, id)
    {
        let res     = await this.doc(uid, id).get();
        let data    = res.data();
        data.id     = res.id;
        return data;
    },
    async getMany(uid, order_by = null)
    {
        let res = await this.collection(uid, order_by).get();
        let data = [];

        if(!res.empty)
        {
            res.docs.forEach((d, i) =>
            {
                data[i] = d.data();
                data[i].id = d.id;
            })
        }

        return data;
    },
    async update(uid, id, data)
    {
        return await this.doc(uid, id).set(data, { merge: true} )
    },
    async remove(uid, id)
    {
        return await this.doc(uid, id).delete();
    },
};
