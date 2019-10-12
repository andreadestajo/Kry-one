import { DB, AUTH }   from "../boot/firebase";

export default
{
    table: 'employees',

    doc(id)
    {
        return DB.doc(`${this.table}/${id}`);
    },
    collection(order_by = null)
    {
        let collection = DB.collection(this.table);

        if(!order_by)
        {
            collection = collection.orderBy('series', 'desc');
        }
        else if(order_by === 'birthday')
        {
            collection = collection.orderBy('birthday', 'desc');
        }

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
    signIn(email, password) {
        return AUTH.signInWithEmailAndPassword(email, password)
    },
    getCurrentUser()
    {
        return AUTH.currentUser
    },
    logout() {
        // Logout thingy here
    }
}
