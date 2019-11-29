const {ADMIN_DB}    = require("../plugin/firebase");
const FieldValue    = require("firebase-admin").firestore.FieldValue;
module.exports =
{
    table: 'users',
    doc(id)
    {
        return ADMIN_DB.doc(`${this.table}/${id}`);
    },
    collection(options = {})
    {
        const collection = ADMIN_DB.collection(this.table);
        return collection;
    },
    async newNotification(uid)
    {
        this.doc(uid).update({ notification_count: FieldValue.increment(1) });
    },
    async addBinaryPointValue(uid, binary_point_value)
    {
        this.doc(uid).update({ binary_point_value : FieldValue.increment(binary_point_value) });
    },
    async addBinaryPointLeftRight(uid, position, points)
    {
        if(position.toLowerCase() === 'left')
        {
            this.doc(uid).update({ binary_points_left : FieldValue.increment(points), binary_point_value : FieldValue.increment(points) });
        }
        else
        {
            this.doc(uid).update({ binary_points_right : FieldValue.increment(points), binary_point_value : FieldValue.increment(points) });
        } 
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

        if(data)
        {
            data.id = data ? res.id : null;
            return data;
        }
        else
        {
            return null;
        }
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
    async getDownline(id)
    {
        let res = await this.collection().where('upline_id', '==', id).get();
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

    getUserByReferralCode(referral_code) {
        return this.collection()
            .where("referral_code", "==", referral_code)
            .limit(1)
            .get()
            .then(user => {
                return user.empty ? null : Object.assign(user.docs[0].data(), {id: user.docs[0].id})
            })
            .catch(error => {
                return {error}
            })
    }
};
