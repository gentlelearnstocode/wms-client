import React from 'react';
import { Button as MuiButton, ButtonProps, CircularProgress, Icon } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export type MuiButtonProps = ButtonProps & {
  isRunningAsync?: boolean;
  theme?: 'primary' | 'success' | 'danger' | 'warning' | 'cancel' | 'white';
} & IconProps;

type IconProps =
  | { iconRight: string; iconLeft?: never }
  | { iconRight?: never; iconLeft: string }
  | { iconRight?: undefined; iconLeft?: undefined };

export const Button = ({
  className,
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
        {iconLeft && !disabled && !isRunningAsync && (
          <Icon className={classes.icon}>{iconLeft}</Icon>
        )}
        {isRunningAsync ? <CircularProgress size={16} color="primary" /> : children}
        {iconRight && !disabled && <Icon className={classes.icon}>{iconRight}</Icon>}
      </MuiButton>
    </React.Fragment>
  );
};
