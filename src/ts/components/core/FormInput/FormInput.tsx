import React from 'react';
import { Icon, InputBase, InputBaseProps } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface FormInputProps extends InputBaseProps {
  iconLeft?: string;
  iconRight?: string;
}

export const FormInput = React.forwardRef(
  ({ className, iconLeft, iconRight, ...props }: FormInputProps, ref) => {
    return (
      <div className={clsx(classes.root, className)}>
        {iconLeft && <Icon children={iconLeft} />}
        <InputBase className={classes.input} {...props} ref={ref} />
        {iconRight && <Icon children={iconRight} />}
      </div>
    );
  });
