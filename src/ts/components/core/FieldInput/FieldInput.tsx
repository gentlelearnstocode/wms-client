/* eslint-disable react/display-name */
import React from 'react';
import { Icon, Input, InputBaseProps } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface FieldInputProps extends InputBaseProps {
  iconLeft?: string;
  iconRight?: string;
}

export const FieldInput = React.forwardRef((props: FieldInputProps, ref) => {
  const { className, iconLeft, iconRight } = props;
  console.log('input props', props);
  return (
    <div className={clsx(classes.container, className)}>
      {iconLeft && <Icon>{iconLeft}</Icon>}
      <Input className={classes.input} {...props} ref={ref} />
      {iconRight && <Icon>{iconRight}</Icon>}
    </div>
  );
});
