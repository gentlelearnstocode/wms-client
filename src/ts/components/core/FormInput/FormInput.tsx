/* eslint-disable react/display-name */
import { Icon, Input, InputBaseProps } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';
import React from 'react';

export interface FormInputProps extends InputBaseProps {
  iconLeft?: string;
  iconRight?: string;
}

export const FormInput = React.forwardRef(
  ({ className, iconLeft, iconRight, ...props }: FormInputProps, ref) => {
    return (
      <div className={clsx(classes.root, className)}>
        {iconLeft && <Icon>{iconLeft}</Icon>}
        <Input {...props} ref={ref} />
        {iconRight && <Icon>{iconRight}</Icon>}
      </div>
    );
  },
);
