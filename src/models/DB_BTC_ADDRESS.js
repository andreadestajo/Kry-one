import { DB }   from "../boot/firebase";

export default
{
    table: 'btcAddresses',

    doc(id)
    {
        return DB.doc(`${this.table}/${id}`);
    },
    collection(options = {})
    {
        const collection = DB.collection(this.table);
        return collection;
    },
    async add(data)
    {
        let res = await DB.collection(this.table).add(data);
        return res.id;
    },
    async get(id)
    {
        let res = await this.doc(id).get();

        if (res.exists)
        {
            let data = res.data();
            data.id  = res.id;
            return data;
        }
        else
        {
            return null;
        }
    },
    async getMany(order_by = null)
    {
        let res = await this.collection(order_by).get();
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
    async update(id, data)
    {
        return await this.doc(id).set(data, { merge: true} )
    },
    async remove(id)
    {
        return await this.doc(id).delete();
    },
};
