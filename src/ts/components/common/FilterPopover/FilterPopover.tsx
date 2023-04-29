import React, { useState } from 'react';
import { Paper, Popover, PopoverProps } from '@mui/material';

import { Text, Button } from '@components/core';
import classes from './styles.module.scss';

export interface IFilterPopover extends PopoverProps {
  filterLabel: string;
  icon: string;
  showActionButtons?: boolean;
  onCancelButtonClick?: () => void;
  onApplyButtonClick?: () => void;
}

const FilterPopover = ({
  filterLabel,
  children,
  onApplyButtonClick = () => {},
  onCancelButtonClick = () => {},
  icon = 'filter_list',
  showActionButtons = false,
  open = false,
  ...props
}: IFilterPopover) => {
  const [isPopoverOpen, togglePopover] = useState(open);
  const [anchorElement, setAnchorElement] = useState(null);

  const handleButtonClick = (e) => {
    setAnchorElement(e.currentTarget);
    togglePopover(true);
  };

  const handleClosePopover = () => {
    togglePopover(false);
    onCancelButtonClick();
  };

  const handleApplyButtonClick = () => {
    onApplyButtonClick();
    togglePopover(false);
  };

  return (
    <React.Fragment>
      <Button className={classes.button} theme="cancel" iconLeft={icon} onClick={(e) => handleButtonClick(e)}>
        {filterLabel}
      </Button>
      {
        <Popover
          onClose={() => handleClosePopover()}
          anchorEl={anchorElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isPopoverOpen}
        >
          <Paper className={classes.popoverChildren}>{children}</Paper>
          {showActionButtons && (
            <div className={classes.buttonContainer}>
              <Button theme="cancel" onClick={() => handleClosePopover()}>
                Cancel
              </Button>
              <Button theme="primary" onClick={() => handleApplyButtonClick()}>
                Apply
              </Button>
            </div>
          )}
        </Popover>
      }
    </React.Fragment>
  );
};

export default FilterPopover;
