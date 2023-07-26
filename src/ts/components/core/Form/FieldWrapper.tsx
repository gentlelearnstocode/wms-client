import { ReactNode } from 'react';
import clsx from 'clsx';
import { FieldError } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { Text } from '@components/core';
import classes from './style.module.scss';

type FieldWrapperProps = {
  description: string;
  className?: string;
  children: ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassProps = Omit<FieldWrapperProps, 'children' | 'className'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { description, className, children, error } = props;

  if (error) {
    enqueueSnackbar(error.message, { variant: 'error', preventDuplicate: true, persist: true });
  }

  return (
    <div className={clsx(classes.wrapper, className)}>
      <Text className={classes.inputLabel}>{description}</Text>
      {children}
    </div>
  );
};
