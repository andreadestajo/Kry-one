import { DB } from "../boot/firebase";

export default
{
    table: (uid, currency) => `users/${uid}/wallets/${currency}/logs`,

    doc(uid, currency, id)
    {
        return DB.doc(`${this.table(uid, currency)}/${id}`);
    },
    collection(uid, currency, options = {})
    {
        let collection = DB.collection(this.table(uid, currency));
        return collection;
    },
    async getMany(uid, currency, order_by = null)
    {
        let res = await this.collection(uid, currency, {order_by}).get();
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
    async add(uid, currency, data)
    {
        let res = await DB.collection(this.table(uid, currency)).add(data);
        return res.id;
    },
    async update(uid, currency, id, data)
    {
        return await this.doc(uid, currency, id).set(data, { merge: true} )
    },
    async remove(uid, currency, id)
    {
        return await this.doc(uid, currency, id).delete();
    },
}
