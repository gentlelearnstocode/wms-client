import { useState } from 'react';
import { Select, MenuItem, SelectProps, Checkbox } from '@mui/material';
import { FilterPopover } from '@components/common';
import { CSSObject } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface ISingleSelect {
  options: { value: string; label: string; id: number }[];
  className: CSSObject;
  label: string;
  onChangeOption: (event: React.ChangeEvent) => void;
}

const SingleSelect = ({ className, options, label, onChangeOption, ...props }: ISingleSelect) => {
  const [filterOpen, toggleFilter] = useState(false);

  return (
    <FilterPopover
      open={filterOpen}
      filterLabel={label}
      icon="filter_list"
      className={clsx(classes.select, className)}
      children={options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          <Checkbox onChange={onChangeOption} value={option.value} />
          {option.label}
        </MenuItem>
      ))}
      {...props}
    />
  );
};

export default SingleSelect;
