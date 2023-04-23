import moment from 'moment';

export const formatDate = (date: Date | null, format: string) => moment(date).format(format);
