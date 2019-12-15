const { ADMIN_DB }  = require("../plugin/firebase");
const FieldValue    = require("firebase-admin").firestore.FieldValue;
module.exports =
{
    table: (uid) => `users/${uid}/wallets`,

    doc(uid, id)
    {
        return ADMIN_DB.doc(`${this.table(uid)}/${id}`);
    },
    collection(uid, options = {})
    {
        const collection = ADMIN_DB.collection(this.table(uid));
        return collection;
    },
    async adjustWallet(uid, id, amount)
    {
        let wallet_update           = {};
        wallet_update.wallet        = FieldValue.increment(amount);
        wallet_update.log_count     = FieldValue.increment(1);
        wallet_update.last_update   = new Date();
        this.update(uid, id, wallet_update);
    },
    async add(uid, data)
    {
        let res = await ADMIN_DB.collection(this.table(uid)).add(data);
        return res.id;
    },
    async get(uid, id)
    {
        let res = await this.doc(uid, id).get();
        let data = res.data();

        if (data)
        {
            data.id = res.id;
            return data;   
        }
        else
        {
            return null;
        }
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
