/* eslint-disable react/display-name */
import React from 'react';
import { Icon, Input, InputBaseProps } from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export type FieldInputProps = {
  iconleft?: string;
  iconright?: string;
  error?: boolean;
} & Omit<InputBaseProps, 'error'>;

export const FieldInput = React.forwardRef((props: FieldInputProps, ref) => {
  const { className, iconleft, iconright } = props;
  return (
    <div className={clsx(classes.container, className)}>
      {iconleft && <Icon>{iconleft}</Icon>}
      <Input className={classes.input} {...props} ref={ref} />
      {iconright && <Icon>{iconright}</Icon>}
    </div>
  );
});
