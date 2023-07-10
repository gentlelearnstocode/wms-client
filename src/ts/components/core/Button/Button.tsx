import React from 'react';
import { Button as MuiButton, Icon, CircularProgress, ButtonProps } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface MuiButtonProps extends ButtonProps {
  isRunningAsync?: boolean;
  iconRight?: string;
  iconLeft?: string;
  theme?: 'primary' | 'success' | 'danger' | 'warning' | 'cancel';
}

const Button = ({
  className,
  variant,
  children,
  iconRight,
  iconLeft,
  isRunningAsync,
  disabled = false,
  theme = 'primary',
  ...props
}: MuiButtonProps) => {
  return (
    <React.Fragment>
      <MuiButton
        {...props}
        disabled={disabled || isRunningAsync}
        className={clsx(classes.root, className, classes[theme])}
      >
        {iconLeft && !disabled && !isRunningAsync && <Icon className={classes.icon} children={iconLeft} />}
        {isRunningAsync ? <CircularProgress size={16} color="primary" /> : children}
        {iconRight && !disabled && <Icon className={classes.icon} children={iconRight} />}
      </MuiButton>
    </React.Fragment>
  );
};

export default Button;
