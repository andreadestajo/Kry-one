const {ADMIN_DB} = require("../plugin/firebase");

module.exports =
    {
        table: 'enlistKnights',
        doc(id)
        {
            return ADMIN_DB.doc(`${this.table}/${id}`);
        },
        collection(options = {})
        {
            let collection = ADMIN_DB.collection(this.table);

            if(options.hasOwnProperty('order_by'))
            {
                if(options.order_by === 'rank')
                {
                    collection = collection.orderBy('rank_order', 'asc');
                }
            }

            return collection;
        },
        async add(data)
        {
            let res = await ADMIN_DB.collection(this.table).add(data);
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
            return await this.doc(id).set(data, { merge: true} )
        },
        async remove(id)
        {
            return await this.doc(id).delete();
        },
    };
