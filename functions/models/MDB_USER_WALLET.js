const {ADMIN_DB} = require("../plugin/firebase");

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
