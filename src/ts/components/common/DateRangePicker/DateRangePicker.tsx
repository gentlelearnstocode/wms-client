import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers';

import classes from './styles.module.scss';

export interface DateRangePickerProps extends DatePickerProps<Date> {
  size?: 'small' | 'medium' | 'large';
  fromDate: Date | null;
  toDate: Date | null;
  labelFrom: string;
  labelTo: string;
  onChangePicker: (date: any) => void;
}

const DateRangePicker = ({
  className,
  fromDate,
  toDate,
  onChangePicker,
  labelFrom = 'From',
  labelTo = 'To',
}: DateRangePickerProps) => {
  return (
    <div className={classes.container}>
      <DatePicker
        label={labelFrom}
        value={fromDate}
        onChange={(date) => onChangePicker({ toDate, fromDate: date })}
        disableFuture
      />
      <DatePicker
        label={labelTo}
        value={toDate}
        onChange={(date) => onChangePicker({ fromDate, toDate: date })}
        disableFuture
      />
    </div>
  );
};

export default DateRangePicker;
