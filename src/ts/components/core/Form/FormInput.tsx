import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldInput, FieldInputProps, FieldWrapper, FieldWrapperPassProps } from '@components/core';

type FormInputProps = {
  registration: Partial<UseFormRegisterReturn>;
} & FieldWrapperPassProps &
  FieldInputProps;

export const FromInput = (props: FormInputProps) => {
  const { description, registration, error } = props;
  return (
    <FieldWrapper description={description}>
      <FieldInput {...props} {...registration} />
    </FieldWrapper>
  );
};
