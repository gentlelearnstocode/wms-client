import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { ISelectOptions } from './Select';
import classes from './style.module.scss';

const SingleSelect = ({
  className,
  options,
  label,
  onChangeOption,
  value,
  iconLeft,
  iconRight = 'filter_list',
  ...props
}: Omit<ISelectOptions, 'multi'>) => {
  const onOptionClick = (event: SelectChangeEvent<typeof value>) => {
    const selectedValue = event.target.value as string;
    onChangeOption(selectedValue);
  };

  return (
    <React.Fragment>
      <Select
        multiple={false}
        displayEmpty
        value={value}
        onChange={onOptionClick}
        renderValue={(selected) => selected}
        inputProps={{ 'aria-label': 'Without label' }}
        className={classes.select}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default SingleSelect;
