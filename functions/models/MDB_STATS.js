const { ADMIN_DB }  = require("../plugin/firebase");
const FieldValue    = require("firebase-admin").firestore.FieldValue;

class Stats 
{
    constructor(docUid = '')
    {
        this.collection_name    = 'stats';
        this.document_id        = docUid;
        this.collection         = ADMIN_DB.collection(this.collection_name);
    }

    async getDoc(opt= {})
    {
        let document = await this.collection.doc(this.document_id).get(opt);

        return document.data();
    }

    async getCollection()
    {
        let collection = await this.collection;
        return collection;
    }

    async incrementField(field)
    {
        let increment   = await FieldValue.increment(1);
        let jsonObj     = {};
        jsonObj[field]  = increment;

        await this.collection.doc(this.document_id).update(jsonObj)
    }
    
    async decrementField(field)
    {
        let decrement   = await FieldValue.increment(-1);
        let jsonObj     = {};
        jsonObj[field]  = decrement;

        await this.collection.doc(this.document_id).update(jsonObj)
    }
}

module.exports = Stats;