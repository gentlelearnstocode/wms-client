import React from 'react';
import { Paper, Popover, PopoverProps } from '@mui/material';

import { Button } from '@components/core';
import classes from './styles.module.scss';

export interface IFilterPopover extends PopoverProps {
  showActionButtons: boolean;
  onCancelButtonClick: () => void;
  onApplyButtonClick: () => void;
}

export const FilterPopover = ({
  children,
  onApplyButtonClick,
  onCancelButtonClick,
  showActionButtons = false,
  open,
  ...props
}: IFilterPopover) => {
  return (
    <React.Fragment>
      <Popover
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        {...props}
      >
        <Paper>{children}</Paper>
        {showActionButtons && (
          <div className={classes.buttonContainer}>
            <Button theme="cancel" onClick={() => onCancelButtonClick()}>
              Cancel
            </Button>
            <Button theme="primary" onClick={() => onApplyButtonClick()}>
              Apply
            </Button>
          </div>
        )}
      </Popover>
    </React.Fragment>
  );
};
