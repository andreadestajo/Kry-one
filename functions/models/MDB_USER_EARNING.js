const { ADMIN_DB }  = require("../plugin/firebase");
const FieldValue    = require("firebase-admin").firestore.FieldValue;
module.exports =
{
    table: (uid) => `users/${uid}/earnings`,

    doc(uid, id)
    {
        return ADMIN_DB.doc(`${this.table(uid)}/${id}`);
    },
    collection(uid, options = {})
    {
        const collection = ADMIN_DB.collection(this.table(uid));
        return collection;
    },
    async initializeEarning(uid)
    {
        let earning_list = ['direct', 'stairstep', 'binary'];
        let earning_promise = [];

        earning_list.forEach((earning_id) =>
        {
            let earning_update             = {};
            earning_update.last_update     = new Date();
            earning_update.count           = 0;
            earning_update.total           = 0;
            earning_promise.push(this.update(uid, earning_id, earning_update));
        });

        await Promise.all(earning_promise);
        return "initialize done";
    },
    async addEarning(uid, earning_id, amount)
    {
        let earning_update             = {};
        earning_update.last_update     = new Date();
        earning_update.count           = FieldValue.increment(1);
        earning_update.total           = FieldValue.increment(amount);
        this.update(uid, earning_id, earning_update);
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
