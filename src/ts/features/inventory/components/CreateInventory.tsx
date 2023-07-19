import { Container } from '@mui/material';
import { Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button, FormSelect, FromInput, Text } from '@components/core';
import { PopupModal } from '@components/common';
import { useCreateInventory } from '../api/create-inventory';
import { useProductQuery } from '../../products';
import { useValidationForm } from '@hooks/useValidationForm';
import { remapSelect } from '@utils/remap-select';
import classes from '../styles/create-inventory.module.scss';

const CreateInventorySchema = z.object({
  productId: z.string().min(1, 'Product Id is required'),
  stockQuantity: z.number().nonnegative('Stock quantity cannot be negative'),
});

type SchemaFieldValues = z.infer<typeof CreateInventorySchema>;

export type CreateInventoryProps = {
  isOpen: boolean;
  close: () => void;
};

export const CreateInventory = (props: CreateInventoryProps) => {
  const { isOpen, close } = props;
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useValidationForm<SchemaFieldValues, typeof CreateInventorySchema>({
    schema: CreateInventorySchema,
  });
  const createInventoryMutation = useCreateInventory();
  const { data } = useProductQuery();
  const productData = data?.data.products;

  const done = () => {
    reset();
    close();
  };

  const onSubmit: SubmitHandler<SchemaFieldValues> = async (data) => {
    await createInventoryMutation.mutateAsync({ data });
    done();
  };

  return (
    <PopupModal open={isOpen}>
      <Container className={classes.container}>
        <Text textSize="medium">Create inventory</Text>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="productId"
            control={control}
            render={({ field: { value = '', onChange } }) => {
              return (
                <FormSelect
                  options={remapSelect(productData, 'name', '_id')}
                  value={value}
                  onChange={onChange}
                  description="Product name"
                  label="Product"
                  error={errors['productId']}
                  {...register}
                />
              );
            }}
          />
          <FromInput
            registration={register('stockQuantity', { valueAsNumber: true })}
            description="Stock quantity"
            error={errors['stockQuantity']}
            placeholder="Enter stock quantity"
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
