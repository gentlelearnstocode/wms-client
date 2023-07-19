import React from 'react';
import clsx from 'clsx';
import {
  FieldWrapper,
  FieldWrapperPassProps,
  SingleSelect,
  SingleSelectProps,
} from '@components/core';
import classes from './style.module.scss';

type FormSelectProps = FieldWrapperPassProps & SingleSelectProps;

export const FormSelect = (props: FormSelectProps) => {
  const { description, className, error } = props;
  return (
    <FieldWrapper description={description} error={error}>
      <SingleSelect {...props} className={clsx(classes.select, className)} />
    </FieldWrapper>
  );
};
