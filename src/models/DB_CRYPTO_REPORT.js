import { DB } from "../boot/firebase";

export default
{
    table: 'cryptoReport',

    /**
     *
     * @param _this
     * @param options {name, limit, startAtId}
     * @returns {Promise<firebase.firestore.DocumentData[]> | Promise<firebase.firestore.DocumentData>}
     */
    bindAllRequests(_this, options = {})
    {
        let query = this.collection();

        // Filter or pagination here
        if (options.hasOwnProperty('currency'))
        {
            query = query.where("currency", "==", options.currency);
        }

        // Set default name
        if (!options.hasOwnProperty('name'))
        {
            options.name = "users";
        }

        return _this.$bind(options.name, query)
    },
    doc(id)
    {
        return DB.doc(`${this.table}/${id}`);
    },
    collection(order_by = null)
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

}
