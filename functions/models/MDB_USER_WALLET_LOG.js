const {ADMIN_DB} = require("../plugin/firebase");

module.exports =
{
    table: (uid, currency) => `users/${uid}/wallets/${currency}/logs`,

    doc(uid, currency, log_id)
    {
        return ADMIN_DB.doc(`${this.table(uid, currency)}/${log_id}`);
    },
    collection(uid, currency, options = {})
    {
        const collection = ADMIN_DB.collection(this.table(uid, currency));
        return collection;
    },
    async add(uid, currency, data)
    {
        let res = await ADMIN_DB.collection(this.table(uid, currency)).add(data);
        return res.id;
    },
    async get(uid, currency, log_id)
    {
        let res     = await this.doc(uid, currency, log_id).get();
        let data    = res.data();
        data.id     = res.id;
        return data;
    },
    async getMany(uid, currency, options = {})
    {
        let res = await this.collection(uid, currency, options).get();
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
    async update(uid, currency, log_id, data)
    {
        return await this.doc(uid, currency, log_id).set(data, { merge: true} )
    },
    async remove(uid, currency, log_id)
    {
        return await this.doc(uid, currency, log_id).delete();
    },
};
