import { DB } from "../boot/firebase";

export default
{
    table: 'kycVerifications',

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

    /**
     *
     * @param _this
     * @param options {name, limit, startAtId}
     * @returns {Promise<firebase.firestore.DocumentData[]> | Promise<firebase.firestore.DocumentData>}
     */
    bindKycVerifications(_this, options = {})
    {
        let query = this.collection();

        // Apply filter
        if(options.hasOwnProperty('status_filter'))
        {
            const filter = options.status_filter.length ? options.status_filter : ["not_in_filters"];
            query = query.where("status", "in", filter)
        }

        query = query.orderBy("date_time_submitted", "desc");

        // Set default name
        if(!options.hasOwnProperty('name'))
        {
            options.name =  "kycVerifications"
        }

        return _this.$bind(options.name, query)
    }
}
