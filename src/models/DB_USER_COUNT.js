import { DB } from "../boot/firebase";

export default
{
    table: (uid) => `users/${uid}/count`,

    doc(uid, id)
    {
        return DB.doc(`${this.table(uid)}/${id}`);
    },
    collection(uid, options = {})
    {
        let collection = DB.collection(this.table(uid));
        return collection;
    },
    async getMany(uid, order_by = null)
    {
        let res = await this.collection(uid, {order_by}).get();
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
    async add(uid, data)
    {
        let res = await DB.collection(this.table(uid)).add(data);
        return res.id;
    },
    async update(uid, id, data)
    {
        return await this.doc(uid, id).set(data, { merge: true} )
    },
    async remove(uid, id)
    {
        return await this.doc(uid, id).delete();
    },
}
