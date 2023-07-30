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
  const { description, className, error, ...otherProps } = props;
  return (
    <FieldWrapper description={description} error={error}>
      <SingleSelect {...otherProps} className={clsx(classes.select, className)} />
    </FieldWrapper>
  );
};
