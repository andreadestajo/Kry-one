import { DB, AUTH }   from "../boot/firebase";

export default
{
    table: 'nobilities',

    doc(id)
    {
        return DB.doc(`${this.table}/${id}`);
    },
    collection(options = {})
    {
        let collection = DB.collection(this.table);
        return collection;
    },
    async add(data)
    {
        let res = await DB.collection(this.table).add(data);
        return res.id;
    },
    async get(id)
    {
        let res     = await this.doc(id).get();
        let data    = res.data();
        data.id     = res.id;
        return data;
    },
    async getMany(options = {})
    {
        let res = await this.collection(options).get();
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
        return await this.doc(id).set(data, { merge: true})
    },
    async remove(id)
    {
        return await this.doc(id).delete();
    },

    bindNobilities(_this, options = {})
    {
        // Set default name
        if(!options.hasOwnProperty('name'))
        {
            options.name =  "nobilities"
        }
        return _this.$bind(options.name, this.collection().orderBy('rank_order'))
    }
}
