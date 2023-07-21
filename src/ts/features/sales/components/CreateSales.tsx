import { useEffect } from 'react';
import { Container, Icon } from '@mui/material';
import { Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { Button, FormInput, FormSelect, Text } from '@components/core';
import { PopupModal } from '@components/common';
import { useValidationForm } from '@hooks/useValidationForm';
import { useProductQuery } from '../../products';
import { useCreateSales } from '../api/create-sales';
import { CreateModalProps } from '../../../types/common';
import { remapSelect } from '@utils/remap-select';
import { storage } from '@utils/storage';
import classes from '../styles/create-sales.module.scss';

const SalesProductsSchema = z.object({
  product: z.string().nonempty('Product is required'),
  orderQuantity: z.number().nonnegative('Order quantity must be more than 0'),
});

const SalesSchema = z.object({
  products: z.array(SalesProductsSchema).nonempty('At least one product has to be added'),
  warehouse: z.string().nonempty('Invalid warehouse'),
});

type FieldValues = z.infer<typeof SalesSchema>;
type CreateSalesProps = CreateModalProps;

export const CreateSales = (props: CreateSalesProps) => {
  const { close, isOpen } = props;
  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useValidationForm<FieldValues, typeof SalesSchema>({
    schema: SalesSchema,
    defaultValues: {
      products: [],
    },
  });
  const productData = useProductQuery().data?.data?.products;
  const createSalesMutation = useCreateSales();

  useEffect(() => {
    const user = storage.getStorage('userData');
    setValue('warehouse', user.warehouse);
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const watchedFields = watch('products');
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchedFields[index],
  }));

  const done = () => {
    close();
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await createSalesMutation.mutateAsync({ data });
    done();
  };

  return (
    <PopupModal open={isOpen}>
      <Container className={classes.container}>
        <Text textSize="medium">Add Sales Order</Text>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {controlledFields.map((field, index) => {
            return (
              <div key={field.id} className={classes.inputWrapper}>
                <div className={classes.inputContainer}>
                  <Controller
                    control={control}
                    name={`products.${index}.product`}
                    render={({ field: { value = '', onChange } }) => {
                      return (
                        <FormSelect
                          options={remapSelect(productData, 'name', '_id')}
                          value={value}
                          onChange={onChange}
                          label="Product"
                          description="Sales products"
                          error={errors?.products?.[index]?.product}
                        />
                      );
                    }}
                  />
                  <FormInput
                    description="Order quantity"
                    error={errors?.products?.[index]?.orderQuantity}
                    registration={register(`products.${index}.orderQuantity`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Enter order quantity"
                  />
                </div>
                <Icon className={classes.buttonIcon} onClick={() => remove(index)} color="action">
                  delete
                </Icon>
              </div>
            );
          })}
          <Icon
            color="primary"
            onClick={() => append({ product: '', orderQuantity: 0 })}
            className={classes.buttonIcon}
          >
            add_circle
          </Icon>
          <div className={classes.buttonContainer}>
            <Button theme="white" onClick={() => done()}>
              <Text>Discard</Text>
            </Button>
            <Button type="submit">
              <Text theme="white">Confirm</Text>
            </Button>
          </div>
        </form>
      </Container>
    </PopupModal>
  );
};
