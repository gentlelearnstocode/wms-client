import { Container } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { useCreateProduct } from '../api/create-product';
import { useValidationForm } from '@hooks/useValidationForm';
import { Button, FormInput, Text } from '@components/core';
import { ICreateProduct } from '../interfaces/product.interface';
import classes from './styles/create-products.module.scss';

const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is required' })
    .max(50)
    .nonempty({ message: 'Product cannot be empty' }),
  type: z.string().nonempty({ message: 'Product type cannot be empty' }),
  price: z.number().positive(),
});

type SchemaFieldValues = z.infer<typeof CreateProductSchema>;

export type CreateProductProps = {
  onCreateSuccess: (productData: ICreateProduct) => void;
  onCreateError: (err: any) => void;
  closeModal: () => void;
};

export const CreateProduct = ({
  onCreateSuccess,
  onCreateError,
  closeModal,
}: CreateProductProps) => {
  const { mutateAsync, isLoading } = useCreateProduct();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useValidationForm<typeof CreateProductSchema>({ schema: CreateProductSchema });

  const onCancelClick = () => {
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
          <div>
            <Text className={classes.inputLabel}>Product name</Text>
            <FormInput
              className={classes.input}
              placeholder="Enter product name"
              type="string"
              {...register('name')}
            />
          </div>
          <div>
            <Text className={classes.inputLabel}>Purchase price</Text>
            <FormInput
              className={classes.input}
              placeholder="Enter purchase price"
              type="string"
              {...register('type')}
            />
          </div>
          <div>
            <Text className={classes.inputLabel}>Purchase price</Text>
            <FormInput
              className={classes.input}
              placeholder="Enter purchase price"
              {...register('price', { valueAsNumber: true })}
            />
          </div>
          {/* <div>
            <Text className={classes.inputLabel}>Type</Text>
            <Controller
              name="type"
              render={({ field: { onChange, value } }) => {
                return (
                  <SingleSelect
                    onChangeOption={onChange}
                    value={value}
                    options={PRODUCT_TYPE_OPTIONS}
                    label="Type"
                    {...register}
                  />
                );
              }}
            /> */}
          {/* <SingleSelect
              onChangeOption={onChange}
              value={value}
              options={PRODUCT_TYPE_OPTIONS}
              label="Type"
            /> */}
          {/* </div> */}
          {/* <div>
            <Text className={classes.inputLabel}>Image upload</Text>
            <Controller
              control={control}
              name="imageUrl"
              render={({ field, fieldState }) => (
                <FormInput
                  placeholder="Enter image url"
                  type="text"
                  defaultValue=""
                  className={classes.input}
                  {...field}
                />
              )}
            />
          </div> */}
        </div>
        <div className={classes.buttonContainer}>
          <Button theme="cancel" onClick={() => closeModal()}>
            Discard
          </Button>
          <Button theme="primary" type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </Container>
  );
};
