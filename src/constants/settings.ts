import moment from 'moment';

export const CURRENT_DATE = moment().startOf('day').format('YYYY-MM-DD');

export const DEFAULT_FILTER_DATE = moment().subtract(14, 'days').startOf('day').format('YYYY-MM-DD');

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
