import React from 'react';
import clsx from 'clsx';
import { FieldError } from 'react-hook-form';
import { Text } from '@components/core';
import classes from './style.module.scss';

type FieldWrapperProps = {
  description: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassProps = Omit<FieldWrapperProps, 'children' | 'className'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { description, className, children } = props;
  return (
    <div className={clsx(classes.wrapper, className)}>
      <Text className={classes.inputLabel}>{description}</Text>
      {children}
    </div>
  );
};
