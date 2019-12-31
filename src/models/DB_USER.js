import { DB, AUTH }   from "../boot/firebase";

export default
{
    table: 'users',

    doc(id)
    {
        return DB.doc(`${this.table}/${id}`);
    },
    collection(options = null)
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
    async getDownline(upline_id, options = null)
    {
        let res = await this.collection(options).where('upline_id', '==', upline_id).get();
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
    async getBinaryDownline(id, position)
    {
        let res = await this.collection()
            .where("placement_id", "==", id)
            .where("placement_position", "==", position)
            .limit(1)
            .get()
            .then(user => {
                return user.empty ? null : Object.assign(user.docs[0].data(), {id: user.docs[0].id})
            })
            .catch(error => {
                return {error}
            });

        return res;
    },
    async getPaidDownline(upline_id, options = null)
    {
        let res = await this.collection(options).where('upline_id', '==', upline_id).where('nobility_info.rank_order', '>', 1).get();
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
    signIn(email, password)
    {
        return AUTH.signInWithEmailAndPassword(email, password)
    },
    signOut()
    {
        return AUTH.signOut()
    },
    getCurrentUser()
    {
        return AUTH.currentUser
    },
    getUserByEmailAddress(email)
    {
        return this.collection()
            .where("email", "==", email)
            .limit(1)
            .get()
            .then(user => {
                return user.empty ? null : Object.assign(user.docs[0].data(), {id: user.docs[0].id})
            })
            .catch(error => {
                return {error}
            })
    },
    getUserByReferralCode(referral_code)
    {
        return this.collection()
            .where("referral_code", "==", referral_code)
            .limit(10)
            .get()
            .then(user => {
                return user.empty ? null : Object.assign(user.docs[0].data(), {id: user.docs[0].id})
            })
            .catch(error => {
                return {error}
            })
    },
    getUserByFilters(options = {})
    {
        let query = this.collection();

        // Filter or pagination here
        if(options.hasOwnProperty('search_text'))
        {
            query = query.where("filters", "array-contains", options.search_text.trim())
        }

        return query.get()
            .then(user =>
            {
                return user.empty ? null : Object.assign(user.docs[0].data(), {id: user.docs[0].id})
            })
            .catch(error =>
            {
                return {error}
            })
    },

    getUserByWalletAddress(currency, wallet_address) {
        console.log(currency, wallet_address)

        let query = DB.collectionGroup('wallets')
            .where("key", "==", currency.toUpperCase())
            .where("address","==", wallet_address);

        return query.get()
            .then(user =>
            {
                return user.empty ? null : Object.assign(user.docs[0].data(), {id: user.docs[0].id})
            })
            .catch(error =>
            {
                return {error}
            })
    },

    getUsersByRole(role, options = {})
    {
        let query = this.collection().where("roles", "array-contains", role);

        if(options.hasOwnProperty('limit'))
        {
            query = query.limit(options.limit)
        }

        return query
        .get()
        .then(user =>
        {
            return user.empty ? [] : user.docs.map(u => Object.assign({}, u.data(), {id: u.id}))
        })
        .catch(error =>
        {
            return {error}
        })
    },
    /**
     *
     * @param _this
     * @param options {name, limit, startAtId}
     * @returns {Promise<firebase.firestore.DocumentData[]> | Promise<firebase.firestore.DocumentData>}
     */
    bindAllUsers(_this, options = {})
    {
        let query = this.collection();

        // Filter or pagination here
        if(options.hasOwnProperty('search_text'))
        {
            query = query.where("filters", "array-contains", options.search_text)
        }

        // Set default name
        if(!options.hasOwnProperty('name'))
        {
            options.name =  "users"
        }

        // order
        query = query.orderBy('full_name');

        return _this.$bind(options.name, query)
    },

    bindReferrals(_this, referral_code, options ={})
    {
        // Set default name
        if(!options.hasOwnProperty('name'))
        {
            options.name =  "referrals"
        }

        return _this.$bind(options.name, this.collection()
            .where("referred_by", "==", referral_code)
            .orderBy("full_name"))
    },

    bindAllAdmins(_this, options = {})
    {
        // Set default name
        if(!options.hasOwnProperty('name'))
        {
            options.name =  "admins"
        }

        return _this.$bind(options.name, this.collection()
            .where('roles', 'array-contains', 'admin'))
    }
}
