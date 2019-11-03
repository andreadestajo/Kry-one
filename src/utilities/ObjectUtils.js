import { extend } from 'quasar'

export const arrayToObject = (array, obj_key) =>
{
    const new_obj = {};

    array.forEach(arr => {
        new_obj[arr[obj_key]] = extend({}, arr)
    });

    return new_obj;
};
