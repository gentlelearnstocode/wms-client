import { MenuItem, Checkbox } from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react';

import { useDisclosure } from 'src/ts/hooks/useDisclosure';
import { FilterPopover } from '@components/common';
import { Button } from '@components/core';
import classes from './style.module.scss';
import { ISelectOptions } from './Select';

const MultiSelect = ({
  className,
  options,
  label,
  icon = 'filter_list',
  onChangeOptions = () => {},
  ...props
}: Omit<ISelectOptions, 'multi'>) => {
  const [selectedValue, setSelectedValue] = useState([] as string[]);
  const [selectAnchorEl, setSelectAnchorEl] = useState(null);
  const { close, open, isOpen } = useDisclosure();

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedValue([...selectedValue, e.target.value]);
    } else {
      const deselect = selectedValue.indexOf(e.target.value);
      const newSelected = selectedValue.filter((_, index) => index !== deselect);
      setSelectedValue([...newSelected]);
    }
  };

  const handleApplyClick = () => {
    onChangeOptions(selectedValue);
    setSelectedValue([]);
    close();
  };

  const handleButtonClick = (e) => {
    open();
    setSelectAnchorEl(e.currentTarget);
  };

  const handleCancelClick = () => {
    setSelectedValue([]);
    close();
  };

  return (
    <React.Fragment>
      <Button iconLeft={icon} theme="cancel" onClick={handleButtonClick}>
        {label}
      </Button>
      <FilterPopover
        open={isOpen}
        anchorEl={selectAnchorEl}
        className={clsx(classes.select, className)}
        children={options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            <Checkbox onChange={onChangeCheckbox} value={option.value} inputProps={{ ...props }} />
            {option.label}
          </MenuItem>
        ))}
        onApplyButtonClick={handleApplyClick}
        onCancelButtonClick={handleCancelClick}
        showActionButtons
      />
    </React.Fragment>
  );
};

export default MultiSelect;
