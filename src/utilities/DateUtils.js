import Moment from 'moment'


export const formatDate = (date, format = 'MM/DD/YYYY') =>
{
    if(!Moment(new Date(date)).isValid()) {return null}
    return Moment(new Date(date)).format(format)
};
