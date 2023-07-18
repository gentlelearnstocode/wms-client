import { Container } from '@mui/material';
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { useCreateProduct } from '../api/create-product';
import { useValidationForm } from '@hooks/useValidationForm';
import { Button, FormSelect, FromInput, Text } from '@components/core';
import { ICreateProduct } from '../interfaces/product.interface';
import classes from './styles/create-products.module.scss';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';

const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is required' })
    .max(50)
    .nonempty({ message: 'Product cannot be empty' }),
  type: z.string().nonempty({ message: 'Product type cannot be empty' }),
  price: z.number().positive(),
});

type SchemaFieldValues = z.infer<typeof CreateProductSchema> | FieldValues;

export type CreateProductProps = {
  onSuccess: (productData: ICreateProduct) => void;
  onError: (err: any) => void;
  closeModal: () => void;
};

export const CreateProduct = ({ onSuccess, onError, closeModal }: CreateProductProps) => {
  const { mutateAsync, isLoading } = useCreateProduct();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useValidationForm<typeof CreateProductSchema>({ schema: CreateProductSchema });

  const onCancel = () => {
    reset();
    closeModal();
  };

  const onSubmit: SubmitHandler<SchemaFieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Container className={classes.container}>
      <Text textSize="medium">Add Product</Text>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.contentContainer}>
          <FromInput
            placeholder="Enter product name"
            description="Product name"
            registration={register('name')}
            error={errors['name']}
          />
          <FromInput
            placeholder="Enter product price"
            description="Purchase price"
            registration={register('price', { valueAsNumber: true })}
          />
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value = '' } }) => {
              return (
                <FormSelect
                  onChange={onChange}
                  className={classes.select}
                  value={value}
                  options={PRODUCT_TYPE_OPTIONS}
                  description="Product type"
                  label="Type"
                  {...register}
                />
              );
            }}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button theme="white" onClick={() => closeModal()}>
            <Text>Discard</Text>
          </Button>
          <Button theme="primary" type="submit">
            <Text theme="white">Confirm</Text>
          </Button>
        </div>
      </form>
    </Container>
  );
};
