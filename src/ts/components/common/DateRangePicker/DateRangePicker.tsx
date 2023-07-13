import React, { useState } from 'react';
import { DatePickerProps } from '@mui/x-date-pickers';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';

import { useDisclosure } from 'src/ts/hooks/useDisclosure';
import { FilterPopover } from '@components/common';
import { Button } from '@components/core';
import { usePopoverAnchorEl } from '../../../hooks';
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

export const DateRangePicker = ({
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
  const { isOpen, open, close } = useDisclosure();
  const { anchorEl, setAnchor } = usePopoverAnchorEl();

  const handleChangeDate = (value: Value, key: string) => {
    setDateValue({
      ...dateValue,
      [key]: value,
    });
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    open();
    setAnchor(event);
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
      <Button
        theme="cancel"
        onClick={handleButtonClick}
        iconLeft="calendar_today"
        className={classes.button}
      />
      <FilterPopover
        open={isOpen}
        className={classes.button}
        showActionButtons={true}
        onCancelButtonClick={onCancelClick}
        onApplyButtonClick={onApplyClick}
        anchorEl={anchorEl}
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
