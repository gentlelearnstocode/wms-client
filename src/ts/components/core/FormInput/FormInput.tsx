import React from 'react';
import { InputBase, Icon, InputBaseProps } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface FormInputProps extends InputBaseProps {
  iconLeft?: string;
  iconRight?: string;
}

export const FormInput = ({ className, iconLeft, iconRight, ...props }: FormInputProps, ref: any) => {
  return (
    <div className={clsx(classes.root, className)}>
      {iconLeft && <Icon children={iconLeft} />}
      <InputBase className={classes.input} ref={ref} {...props} />
      {iconRight && <Icon children={iconRight} />}
    </div>
  );
};

export default React.forwardRef(FormInput);
