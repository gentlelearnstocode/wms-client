import { useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, TypeOf } from 'zod';
import { FieldValues } from 'react-hook-form';

type UseValidationFormProps<T extends ZodSchema> = {
  schema: T;
};

export const useValidationForm = <T extends ZodSchema>({
  schema,
  ...formConfig
}: UseValidationFormProps<T>) =>
  useForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
