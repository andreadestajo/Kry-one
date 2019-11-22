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

        if(options.hasOwnProperty('order_by'))
        {
            if(options.order_by == 'date')
            {
                collection = collection.orderBy('date_created', 'desc');
            }
        }

        return collection;
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

    /**
     * Used to paginating wallet logs
     * @param _this
     * @param uid
     * @param name
     * @param currency
     * @param options {limit (int), start_after (doc)}
     * @returns {Promise<firebase.firestore.QueryDocumentSnapshot[] | never>}
     */
    getUserWalletLogs(uid, name, currency, options = {})
    {
        // Process currency
        currency = currency ? currency.toUpperCase() : currency;
        currency = currency === "UNIQ" ? "XAU" : currency;

        let query = this.collection(uid, currency);

        // Order
        query = query.orderBy('date_created', 'desc');

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
    bindUserWalletLogs(_this, uid, name, currency, options = {})
    {
        // Process currency
        currency = currency.toUpperCase();
        currency = currency === "UNIQ" ? "XAU" : currency;

        let query = this.collection(uid, currency);

        // Order
        query = query.orderBy('date_created', 'desc');

        // Limit
        if(options.hasOwnProperty('limit'))
        {
            query = query.limit(options.limit)
        }

        return _this.$bind(name, query);
    }
}
