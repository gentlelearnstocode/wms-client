import { Checkbox, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { Text } from '@components/core';
import classes from './style.module.scss';
import { ISelectOptions } from './Select';

const MultiSelect = ({
  className,
  options,
  label,
  iconLeft,
  iconRight = 'filter_list',
  onChangeOptions,
  ...props
}: Omit<ISelectOptions, 'multi'>) => {
  const [selectedValue, setSelectedValue] = useState([] as string[]);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedValue([...selectedValue, e.target.value]);
    } else {
      const deselect = selectedValue.indexOf(e.target.value);
      const newSelected = selectedValue.filter((_, index) => index !== deselect);
      setSelectedValue([...newSelected]);
    }
  };

  return (
    <React.Fragment>
      <Select
        multiple
        displayEmpty
        value={selectedValue}
        renderValue={() => <Text textSize="small">Type</Text>}
        inputProps={{ 'aria-label': 'Without label' }}
        className={classes.select}
      >
        {options.map((option) => (
          <MenuItem key={option.id}>
            <Checkbox onChange={onChangeCheckbox} value={option.value} inputProps={{ ...props }} />
            <Text textSize="small">{option.label}</Text>
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default MultiSelect;
