/**
 * @param firstName
 * @param lastName
 * @param middleName
 * @param suffix
 * @returns {string}
 */
export const formatFullname = (firstName, lastName, middleName) =>
{
    return (`${lastName}, ${firstName} ${middleName ? middleName : ''}`)
};
