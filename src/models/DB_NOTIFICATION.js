import { DB } from "../boot/firebase";

export default
{
    table: (uid) => `users/${uid}/notifications`,

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
    getUserNotifications(uid, options = {})
    {
        let query = this.collection(uid);

        // Order
        query = query.orderBy('created_date', 'desc');

        // Start after
        if(options.hasOwnProperty('start_after'))
        {
            query = query.startAfter(options.start_after)
        }

        // Limit
        if(options.hasOwnProperty('limit'))
        {
            query = query.limit(options.limit)
        }

        return query.get().then(doc => doc.docs)
    },
}
