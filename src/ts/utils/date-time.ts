import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';

export const formatDate = (date: Date | null | string, format: string = DEFAULT_DATE_FORMAT) =>
  moment(date).format(format);
