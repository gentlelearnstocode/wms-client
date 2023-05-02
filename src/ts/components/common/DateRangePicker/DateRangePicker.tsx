import React, { useState } from 'react';
import { DatePickerProps } from '@mui/x-date-pickers';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';

import { useDisclosure } from 'src/ts/hooks/useDisclosure';
import FilterPopover from '../FilterPopover';
import { formatDate } from 'src/ts/utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { Button } from '@components/core';
import classes from './styles.module.scss';
import './Calendar.css';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateValue, setDateValue] = useState({
    fromDate,
    toDate,
  });
  const { isOpen, open, close } = useDisclosure();

  const handleChangeDate = (value: Value, key: string) => {
    setDateValue({
      ...dateValue,
      [key]: value,
    });
  };

  const handleButtonClick = (e) => {
    open();
    setAnchorEl(e.currentTarget);
  };

  const onCancelClick = () => {
    setDateValue({ fromDate, toDate });
    close();
  };

  const onApplyClick = () => {
    onChangeDate(dateValue);
    close();
  };

  return (
    <React.Fragment>
      <Button theme="cancel" onClick={handleButtonClick} iconLeft="calendar_today">
        {formatDate(fromDate || new Date(), DEFAULT_DATE_FORMAT)} -{' '}
        {formatDate(toDate || new Date(), DEFAULT_DATE_FORMAT)}
      </Button>
      <FilterPopover
        open={isOpen}
        anchorEl={anchorEl}
        className={classes.button}
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
      </FilterPopover>
    </React.Fragment>
  );
};

export default DateRangePicker;
