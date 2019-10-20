import {STORAGEREF} from '../boot/firebase';

const STORAGE_ROOT     = (FILENAME) => STORAGEREF.child(FILENAME);
const STORE_MEMBER_IDS = (FILENAME) => STORAGEREF.child(`members/ids/${FILENAME}`);

export
{
    STORAGE_ROOT,
    STORE_MEMBER_IDS
}
