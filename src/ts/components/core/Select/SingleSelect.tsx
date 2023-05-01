import React, { useRef, useState } from 'react';
import { MenuItem } from '@mui/material';
import clsx from 'clsx';

import { FilterPopover } from '@components/common';
import Button from '../Button';
import { ISelectOptions } from './Select';
import classes from './style.module.scss';

const SingleSelect = ({
  className,
  options,
  label,
  onChangeOption = () => {},
  value,
  icon = 'filter_list',
  ...props
}: Omit<ISelectOptions, 'multi'>) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);
  const [selectAnchorEl, setSelectAnchorEl] = useState(null);

  const onOptionClick = (option: any) => {
    setIsSelectOpen(false);
    onChangeOption(option.value);
    setSelectedLabel(option.label);
  };

  const handleSelectClick = (e) => {
    setIsSelectOpen(true);
    setSelectAnchorEl(e.currentTarget);
  };

  return (
    <React.Fragment>
      <Button className={classes.button} iconLeft={icon} theme="cancel" onClick={handleSelectClick}>
        {selectedLabel}
      </Button>
      <FilterPopover
        open={isSelectOpen}
        anchorEl={selectAnchorEl}
        className={clsx(classes.select, className)}
        children={options.map((option) => (
          <MenuItem key={option.id} value={option.label} onClick={() => onOptionClick(option)}>
            {option.label}
          </MenuItem>
        ))}
      />
    </React.Fragment>
  );
};

export default SingleSelect;
