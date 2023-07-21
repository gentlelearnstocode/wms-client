import { Container } from '@mui/material';
import { Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { useCreateProduct } from '../api/create-product';
import { useValidationForm } from '@hooks/useValidationForm';
import { Button, FormInput, FormSelect, Text } from '@components/core';
import { PopupModal } from '@components/common';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import classes from './styles/create-products.module.scss';
import { CreateModalProps } from '../../../types/common';

const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(50)
    .nonempty({ message: 'Product cannot be empty' }),
  type: z.string().min(1, 'Please select product type'),
  price: z.number().positive('Invalid product price'),
  imageUrl: z.string().optional(),
});

type SchemaFieldValues = z.infer<typeof CreateProductSchema>;

export type CreateProductProps = CreateModalProps;

export const CreateProduct = (props: CreateProductProps) => {
  const { isOpen, close } = props;
  const createProductMutation = useCreateProduct();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useValidationForm<SchemaFieldValues, typeof CreateProductSchema>({
    schema: CreateProductSchema,
  });

  const done = () => {
    reset();
    close();
  };

  const onSubmit: SubmitHandler<SchemaFieldValues> = async (data) => {
    await createProductMutation.mutateAsync({
      data,
    });
    done();
  };

  return (
    <PopupModal open={isOpen}>
      <Container className={classes.container}>
        <Text textSize="medium">Add Product</Text>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Enter product name"
            description="Product name"
            registration={register('name')}
            error={errors['name']}
          />
          <FormInput
            placeholder="Enter product price"
            description="Purchase price"
            registration={register('price', { valueAsNumber: true })}
            error={errors['price']}
          />
          <FormInput
            placeholder="Enter image URL"
            description="Image URL"
            registration={register('imageUrl')}
            error={errors['imageUrl']}
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
                  error={errors['type']}
                  {...register}
                />
              );
            }}
          />
          <div className={classes.buttonContainer}>
            <Button theme="white" onClick={() => done()}>
              <Text>Discard</Text>
            </Button>
            <Button theme="primary" type="submit">
              <Text theme="white">Confirm</Text>
            </Button>
          </div>
        </form>
      </Container>
    </PopupModal>
  );
};
