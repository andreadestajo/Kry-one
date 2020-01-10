const { ADMIN_DB }  = require("../plugin/firebase");
const FieldValue    = require("firebase-admin").firestore.FieldValue;
module.exports =
{
    table: (uid) => `users/${uid}/count`,

    doc(uid, id)
    {
        return ADMIN_DB.doc(`${this.table(uid)}/${id}`);
    },
    collection(uid, options = {})
    {
        const collection = ADMIN_DB.collection(this.table(uid));
        return collection;
    },
    async add(uid, data)
    {
        let res = await ADMIN_DB.collection(this.table(uid)).add(data);
        return res.id;
    },
    async addBinaryPointValue(uid, id, binary_point_value)
    {
        this.doc(uid, id).update({ binary_point_value : FieldValue.increment(binary_point_value) });
    },
    async addBinaryPointLeftRight(uid, id, position, points)
    {
        if(position.toLowerCase() === 'left')
        {
            await this.doc(uid, id).update({ binary_points_left : FieldValue.increment(points), binary_point_value : FieldValue.increment(points) });
        }
        else
        {
            await this.doc(uid, id).update({ binary_points_right : FieldValue.increment(points), binary_point_value : FieldValue.increment(points) });
        } 
    },
    async deductBinaryPointLeftRight(uid, id, points)
    {
        let deduction = points * -1;
        await this.doc(uid, id).update({ binary_points_left : FieldValue.increment(deduction), binary_points_right : FieldValue.increment(deduction) });
    },
    async get(uid, id)
    {
        let res = await this.doc(uid, id).get();
        let data = res.data();

        if (data)
        {
            data.id = res.id;
            return data;   
        }
        else
        {
            return null;
        }
    },
    async getMany(uid, order_by = null)
    {
        let res = await this.collection(uid, order_by).get();
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
    async update(uid, id, data)
    {
        return await this.doc(uid, id).set(data, { merge: true} )
    },
    async remove(uid, id)
    {
        return await this.doc(uid, id).delete();
    },
};
