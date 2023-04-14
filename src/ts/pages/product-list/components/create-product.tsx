import { Box, Container } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { FormInput, Button, Text, Select } from '@components/core';
import { PRODUCT_TYPE_OPTIONS } from 'src/constants/options';
import classes from './styles.module.scss';

const CreateProduct = () => {
  const { control, handleSubmit, reset } = useForm();

  const onAddNewProduct = handleSubmit((data) => {
    console.log('log form data', data);
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
              <FormInput
                className={classes.input}
                placeholder="Enter product name"
                type="text"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Purchase Price
          </Text>
          <Controller
            control={control}
            name="purchasePrice"
            render={({ field, fieldState }) => (
              <FormInput
                className={classes.input}
                placeholder="Enter purchase price"
                type="number"
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Quantity
          </Text>
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState }) => (
              <FormInput
                placeholder="Enter product quantity"
                type="number"
                className={classes.input}
                {...field}
              />
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
            render={({
              field: { onChange, onBlur, value = [], name, ref },
            }) => (
              <Select
                onChange={onChange}
                name={name}
                value={value}
                options={PRODUCT_TYPE_OPTIONS}
              />
            )}
          />
        </div>
        <div>
          <Text className={classes.inputLabel} textSize="medium">
            Image upload
          </Text>
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState }) => (
              <FormInput
                placeholder="Enter image url"
                type="text"
                className={classes.input}
                {...field}
              />
            )}
          />
        </div>
        <div>
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
