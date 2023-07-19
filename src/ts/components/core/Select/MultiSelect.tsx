import { CSSObject, Checkbox, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { Text } from '@components/core';
import classes from './style.module.scss';


export type MultiSelectProps = {
  className?: CSSObject
  options: { value: string; label: string; id: number }[];
  onChangeOptions: (option: string[]) => void;
  iconRight?: string;
  iconleft?: string;
}

export const MultiSelect = ({
  options,
  iconleft,
  iconRight = 'filter_list',
  onChangeOptions,
  ...props
}: MultiSelectProps) => {
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
            <Checkbox onChange={onChangeCheckbox} value={option.value} />
            <Text textSize="small">{option.label}</Text>
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};

