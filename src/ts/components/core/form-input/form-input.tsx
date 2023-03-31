import { TextFieldProps } from '@mui/material/TextField';
import { TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

export type FormInputProps<TFormValues> = TextFieldProps & {
  register?: UseFormRegister<TFormValues>;
};

export const FormInput = ({
  className,
  ...props
}: FormInputProps): JSX.Element => {
  return <TextField className={className} {...props} />;
};
