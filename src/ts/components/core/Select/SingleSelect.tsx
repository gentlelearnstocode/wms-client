import React, { useRef, useState } from 'react';
import { MenuItem } from '@mui/material';
import clsx from 'clsx';

import { useDisclosure } from 'src/ts/hooks/useDisclosure';
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
  iconLeft,
  iconRight = 'filter_list',
  ...props
}: Omit<ISelectOptions, 'multi'>) => {
  const [selectedLabel, setSelectedLabel] = useState(label);
  const [selectAnchorEl, setSelectAnchorEl] = useState(null);
  const { close, open, isOpen } = useDisclosure();

  const onOptionClick = (option: any) => {
    close();
    onChangeOption(option.value);
    setSelectedLabel(option.label);
  };

  const handleSelectClick = (e) => {
    open();
    setSelectAnchorEl(e.currentTarget);
  };

  return (
    <React.Fragment>
      <Button className={classes.button} iconLeft={iconLeft} iconRight={iconRight} onClick={handleSelectClick}>
        {selectedLabel}
      </Button>
      <FilterPopover
        open={isOpen}
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
