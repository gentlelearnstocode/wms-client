import { Box, Container } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useCreateProduct } from '@api/product-api';
import { FormInput, Button, Text, Select } from '@components/core';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import classes from './styles.module.scss';

export interface CreateProductProps {
  onCreateSuccess: () => void;
  onCreateError: (err) => void;
}

const CreateProduct = ({ onCreateSuccess, onCreateError }: CreateProductProps) => {
  const { control, handleSubmit, reset } = useForm();
  const { mutateAsync, isLoading } = useCreateProduct();

  const onAddNewProduct = handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: () => onCreateSuccess(),
      onError: (err) => onCreateError(err),
    });
    reset();
  });

  return (
    <Container className={classes.container}>
      <Text textSize="large">Add Product</Text>
      <form className={classes.form} onSubmit={onAddNewProduct}>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Product Name
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <FormInput className={classes.input} placeholder="Enter product name" type="text" {...field} />
            )}
          />
        </div>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Purchase Price
          </Text>
          <Controller
            control={control}
            name="price"
            render={({ field, fieldState }) => (
              <FormInput className={classes.input} placeholder="Enter purchase price" type="number" {...field} />
            )}
          />
        </div>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Type
          </Text>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, onBlur, value = [], name, ref } }) => (
              <Select onChange={onChange} name={name} value={value} options={PRODUCT_TYPE_OPTIONS} />
            )}
          />
        </div>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Image upload
          </Text>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field, fieldState }) => (
              <FormInput placeholder="Enter image url" type="text" className={classes.input} {...field} />
            )}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button theme="cancel">Clear</Button>
          <Button theme="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProduct;
