import {STORAGEREF}          from '../boot/firebase';
import Store                 from '../store'
import {GETTER_USER_AUTH_ID} from "../store/user-module/getters";

const auth_user_id = (() => Store().getters[GETTER_USER_AUTH_ID])();

const STORAGE_ROOT     = (FILENAME) => STORAGEREF.child(FILENAME);
const STORE_MEMBER_IDS = (FILENAME) => STORAGEREF.child(`members/${auth_user_id}/${FILENAME}`);

export
{
    STORAGE_ROOT,
    STORE_MEMBER_IDS
}
