import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldInput, FieldInputProps, FieldWrapper, FieldWrapperPassProps } from '@components/core';

type FormInputProps = {
  registration: Partial<UseFormRegisterReturn>;
} & FieldWrapperPassProps &
  Omit<FieldInputProps, 'error'>;

export const FormInput = (props: FormInputProps) => {
  const { description, registration, error, ...otherProps } = props;
  return (
    <FieldWrapper description={description} error={error}>
      <FieldInput {...otherProps} {...registration} error={Boolean(error)} />
    </FieldWrapper>
  );
};
