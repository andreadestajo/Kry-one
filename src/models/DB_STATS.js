import { DB } from "../boot/firebase";

export default class Stats 
{
    constructor(docUid = '')
    {
        this.collection_name    = 'stats';
        this.document_name      = docUid;
        this.collection         = DB.collection(this.collection_name);
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
}