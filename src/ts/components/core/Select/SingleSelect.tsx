import React from 'react';
import { CSSObject, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import classes from './style.module.scss';
import { Text } from '@components/core'
import { IOption } from '../../../types/common';

export type SingleSelectProps = {
  className?: CSSObject;
  options: IOption[];
  value: string;
  onChangeOption: (option: string) => void;
  label: string;
}

export const SingleSelect = ({
  options,
  onChangeOption,
  value,
  label,
  ...props
}: SingleSelectProps) => {

  const onOptionClick = (event: SelectChangeEvent<typeof value>) => {
    const selectedValue = event.target.value
    onChangeOption(selectedValue);
  };

  const renderLabel = (selected: string) => {
    const filtered = options.filter((option) => option.value === selected)
    return filtered[0]?.label ?? label
  }

  return (
    <React.Fragment>
      <Select
        multiple={false}
        displayEmpty
        value={value}
        onChange={onOptionClick}
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={(selected) => renderLabel(selected)}
        className={classes.select}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            <Text textSize='small'>{option.label}</Text>
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};

