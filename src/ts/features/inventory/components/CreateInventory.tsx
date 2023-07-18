import { Container } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Button, FieldInput, SingleSelect, Text } from '@components/core';
import { ICreateInventory } from '../interfaces/inventory.interface';
import classes from '../styles/create-inventory.module.scss';
import { useCreateInventory } from '../api/create-inventory';
import { useProductQuery } from '../../products';
import { remapSelect } from '@utils/remap-select';

export type CreateInventoryProps = {
  onCreateSuccess: (data: ICreateInventory) => void;
  onCreateError: (err: any) => void;
  closeModal: () => void;
};

export const CreateInventory = ({
  onCreateSuccess,
  onCreateError,
  closeModal,
}: CreateInventoryProps) => {
  const { control, handleSubmit, reset } = useForm();
  const { mutateAsync, isLoading } = useCreateInventory();
  const { data } = useProductQuery();
  const productData = data?.data.products;

  const onCreateInventory = handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: () => onCreateSuccess(data),
      onError: (err) => onCreateError(err),
    });
    console.log('mutate data', data);
    reset();
  });

  const onCancelClick = () => {
    reset();
    closeModal();
  };

  console.log('products data', productData);

  return (
    <Container className={classes.container}>
      <Text textSize="medium">Create inventory</Text>
      <form className={classes.form} onSubmit={onCreateInventory}>
        <div className={classes.contentContainer}>
          <div>
            <Text className={classes.inputLabel}>Product</Text>
            <Controller
              control={control}
              name="productId"
              render={({ field: { onChange, value = '' } }) => {
                return (
                  <SingleSelect
                    onChange={onChange}
                    value={value}
                    options={remapSelect(productData, 'name', '_id')}
                    label="Product"
                  />
                );
              }}
            />
          </div>
          <div>
            <Text className={classes.inputLabel}>Quantity</Text>
            <Controller
              control={control}
              name="stockQuantity"
              render={({ field, fieldState }) => (
                <FieldInput
                  className={classes.input}
                  placeholder="Enter inventory quantity"
                  type="number"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button theme="cancel" onClick={() => onCancelClick()}>
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
