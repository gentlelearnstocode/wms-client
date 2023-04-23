import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { CalendarType } from 'react-calendar/dist/cjs/shared/types';
import './Calendar.css';

import { Button, Text } from '@components/core';
import FilterPopover from '../FilterPopover';
import { formatDate } from 'src/ts/utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import classes from './styles.module.scss';

export interface DateRangePickerProps extends DatePickerProps<Date> {
  size?: 'small' | 'medium' | 'large';
  fromDate: Date | null;
  toDate: Date | null;
  labelFrom: string;
  labelTo: string;
  onChangeDate: (value: any) => void;
}

const DateRangePicker = ({
  className,
  fromDate,
  toDate,
  labelFrom = 'From',
  labelTo = 'To',
  onChangeDate,
}: DateRangePickerProps) => {
  const [dateValue, setDateValue] = useState({
    fromDate,
    toDate,
  });

  const handleChangeDate = (value: Value, key: string) => {
    setDateValue({
      ...dateValue,
      [key]: value,
    });
  };

  const renderDates = () => (
    <Text textSize="small">
      {formatDate(dateValue.fromDate || new Date(), DEFAULT_DATE_FORMAT)} -
      {formatDate(dateValue.toDate || new Date(), DEFAULT_DATE_FORMAT)}
    </Text>
  );

  const onCancelClick = () => setDateValue({ fromDate, toDate });

  const onApplyClick = () => {
    onChangeDate(dateValue);
    setDateValue({ fromDate, toDate });
  };

  return (
    <FilterPopover
      className={classes.button}
      icon="calendar_today"
      filterLabel={renderDates()}
      showActionButtons={true}
      onCancelButtonClick={onCancelClick}
      onApplyButtonClick={onApplyClick}
    >
      <div className={classes.container}>
        <Calendar
          onChange={(value) => handleChangeDate(value, 'fromDate')}
          className={classes.calendar}
          value={dateValue.fromDate}
        />
        <Calendar
          onChange={(value) => handleChangeDate(value, 'toDate')}
          className={classes.calendar}
          value={dateValue.toDate}
        />
      </div>
      {/* <DatePicker
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
      /> */}
    </FilterPopover>
  );
};

export default DateRangePicker;
