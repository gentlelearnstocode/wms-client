import { Box, Container } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useCreateProduct } from '@api/product-api';
import { useGetAllSuplliers } from '@api/supplier-api';
import { FormInput, Button, Text, Select } from '@components/core';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import classes from './styles.module.scss';
import { reMapSelect } from 'src/ts/utils/reMapSelect';

export interface ICreateProduct {
  onCreateSuccess: (productData: any) => void;
  onCreateError: (err: any) => void;
  closeModal: () => void;
}

const CreateProduct = ({ onCreateSuccess, onCreateError, closeModal }: ICreateProduct) => {
  const { control, handleSubmit, reset } = useForm();
  const { mutateAsync, isLoading } = useCreateProduct();
  const { data: supplierData, isFetching } = useGetAllSuplliers();

  const onAddNewProduct = handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: () => onCreateSuccess(data),
      onError: (err) => onCreateError(err),
    });
    reset();
  });

  const onClearForm = () => {
    reset();
  };

  const onCancelClick = () => {
    reset();
    closeModal();
  };

  return (
    <Container className={classes.container}>
      <Text textSize="large">Add Product</Text>
      <form className={classes.form} onSubmit={onAddNewProduct}>
        <div className={classes.contentContainer}>
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
                  defaultValue=""
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
            <Text className={classes.inputLabel} textSize="medium">
              Type
            </Text>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  onChangeOption={onChange}
                  name={name}
                  value={value}
                  label="Product type"
                  defaultValue=""
                  options={PRODUCT_TYPE_OPTIONS}
                />
              )}
            />
          </div>
          <div>
            <Text className={classes.inputLabel} textSize="medium">
              Suppliers
            </Text>
            {supplierData?.data.suppliers.length && (
              <Controller
                control={control}
                name="suppliers"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    onChangeOptions={onChange}
                    name={name}
                    // value={value}
                    label="Suppliers"
                    defaultValue={[]}
                    options={reMapSelect(supplierData?.data.suppliers, 'name', '_id')}
                    multi
                  />
                )}
              />
            )}
          </div>
          <div>
            <Text className={classes.inputLabel} textSize="medium">
              Image upload
            </Text>
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
            Cancel
          </Button>
          <Button theme="warning" onClick={() => onClearForm()}>
            Clear
          </Button>
          <Button theme="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProduct;
