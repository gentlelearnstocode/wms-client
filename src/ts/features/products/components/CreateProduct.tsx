import { Container } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateProduct } from '../api/create-product';
import { useGetAllSuppliers } from '../../suppliers';
import { useValidationForm } from '@hooks/useValidationForm';
import { Button, FormInput, SingleSelect, Text } from '@components/core';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import { ICreateProduct } from '../interfaces/product.interface';
import classes from './styles/create-products.module.scss';

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Product name is required' })
    .max(50)
    .nonempty({ message: 'Product cannot be empty' }),
  type: z.string().nonempty({ message: 'Product type cannot be empty' }),
  price: z.number().positive(),
});

type FieldValues = z.infer<typeof schema>;

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
  const { control, handleSubmit, reset } = useForm();
  const { mutateAsync, isLoading } = useCreateProduct();
  const { } = useValidationForm({ schema })

  const onAddNewProduct = handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: () => onCreateSuccess(data),
      onError: (err) => onCreateError(err),
    });
    reset();
  });

  const onCancelClick = () => {
    reset();
    closeModal();
  };

  return (
    <Container className={classes.container}>
      <Text textSize="medium">Add Product</Text>
      <form className={classes.form} onSubmit={onAddNewProduct}>
        <div className={classes.contentContainer}>
          <div>
            <Text className={classes.inputLabel}>Product name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <FormInput
                  className={classes.input}
                  placeholder="Enter product name"
                  type="text"
                  defaultValue=""
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Text className={classes.inputLabel}>Purchase price</Text>
            <Controller
              control={control}
              name="price"
              render={({ field, fieldState }) => (
                <FormInput
                  className={classes.input}
                  placeholder="Enter purchase price"
                  type="number"
                  defaultValue={0}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Text className={classes.inputLabel}>Type</Text>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value, name } }) => {
                return (
                  <SingleSelect
                    onChangeOption={onChange}
                    value={value}
                    options={PRODUCT_TYPE_OPTIONS}
                    label="Type"
                  />
                );
              }}
            />
          </div>
          <div>
            <Text className={classes.inputLabel}>Suppliers</Text>
            {/* {supplierData?.data.suppliers.length && (
              <Controller
                control={control}
                name="suppliers"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  // <SingleSelect
                  //   onChangeOption={onChange}
                  //   name={name}
                  //   value={value}
                  //   label="Suppliers"
                  //   defaultValue=''
                  //   options={remapSelect(supplierData?.data.suppliers, 'name', '_id')}
                  // />
                  <Text>demo</Text>
                )}
              />
            )} */}
          </div>
          <div>
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
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button theme="cancel" onClick={() => closeModal()}>
            Discard
          </Button>
          <Button theme="primary" type="submit">
            Add product
          </Button>
        </div>
      </form>
    </Container>
  );
};
