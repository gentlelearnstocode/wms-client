import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

type UseValidationFormProps<T extends FieldValues, K> = {
  schema: K;
};

export const useValidationForm = <T extends Record<string, unknown>, K extends ZodSchema>({
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
