import Moment from 'moment'


export const formatDate = (date, format = 'MM/DD/YYYY') =>
{
    if(!Moment(new Date(date)).isValid()) {return null}
    return Moment(new Date(date)).format(format)
};

/**
 *
 * @param date
 */
export const getRelativeTime = (date) =>
{
    // for additional conditions
    const date_time = new Date(date);
    return Moment(date_time).fromNow()
};
