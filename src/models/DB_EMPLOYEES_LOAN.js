import { DB } from "../boot/firebase";

export default
{
    table: (employee_id) => `employees/${employee_id}/loans`,

    doc(employee_id, id)
    {
        return DB.doc(`${this.table(employee_id)}/${id}`);
    },
    collection(options = {})
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
    async update(id, data)
    {
        return await this.doc(id).set(data, { merge: true} )
    },
    async remove(id)
    {
        return await this.doc(id).delete();
    },
}