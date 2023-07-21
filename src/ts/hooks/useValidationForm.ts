import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

type UseValidationFormProps<T extends FieldValues, K extends ZodSchema<T>> = {
  schema: K;
} & Partial<UseFormProps<T>>;

export const useValidationForm = <T extends Record<string, unknown>, K extends ZodSchema<T>>({
  schema,
  ...formConfig
}: UseValidationFormProps<T, K>) => {
  if (!schema) {
    throw new Error('Scheme is required');
  }
  return useForm<T>({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};
