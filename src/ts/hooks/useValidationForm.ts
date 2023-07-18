import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

type UseValidationFormProps<T extends ZodSchema> = {
  schema: T;
};

export const useValidationForm = <T extends ZodSchema>({
  schema,
  ...formConfig
}: UseValidationFormProps<T>) => {
  if (!schema) {
    throw new Error('Scheme is required');
  }
  return useForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};
