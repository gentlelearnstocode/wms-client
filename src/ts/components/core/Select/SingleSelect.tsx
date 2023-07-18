import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Text } from '@components/core';
import { IOption } from '../../../types/common';
import { renderLabel } from '@utils/render-label';
import classes from './style.module.scss';
import clsx from 'clsx';

export type SingleSelectProps = {
  className?: string;
  options: IOption[];
  value: string;
  onChange: (option: string) => void;
  label?: string;
};

export const SingleSelect = (props: SingleSelectProps) => {
  const { options, onChange, value, label, className } = props;
  const onOptionClick = (event: SelectChangeEvent<typeof value>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <React.Fragment>
      <Select
        multiple={false}
        displayEmpty
        value={value}
        onChange={onOptionClick}
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={(selected) => renderLabel(selected, options, label)}
        className={clsx(classes.select, className)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            <Text textSize="small">{option.label}</Text>
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};
