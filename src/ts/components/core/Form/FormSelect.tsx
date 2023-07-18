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
  const { description, className } = props;
  return (
    <FieldWrapper description={description}>
      <SingleSelect {...props} className={clsx(classes.select, className)} />
    </FieldWrapper>
  );
};
