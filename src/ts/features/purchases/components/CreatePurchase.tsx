import { CreateModalProps } from '../../../types/common';
import { PopupModal } from '@components/common';
import { Container, Icon } from '@mui/material';
import classes from '../styles/create-purchase.module.scss';
import { Button, FormInput, FormSelect, Text } from '@components/core';
import { useValidationForm } from '@hooks/useValidationForm';
import { z } from 'zod';
import { Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { storage } from '@utils/storage';
import { useProductQuery } from '../../products';
import { remapSelect } from '@utils/remap-select';
import { useCreatePurchase } from '../api/create-purchase';

const PurchaseProductSchema = z.object({
  product: z.string().nonempty('Product is required'),
  orderQuantity: z.number().nonnegative(),
});

const PurchaseOrderSchema = z.object({
  products: z.array(PurchaseProductSchema),
  warehouse: z.string().nonempty('Invalid warehouse'),
});

type FieldValues = z.infer<typeof PurchaseOrderSchema>;

type CreatePurchaseProps = CreateModalProps;

export const CreatePurchase = (props: CreatePurchaseProps) => {
  const { isOpen, close } = props;
  const {
    register,
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useValidationForm<FieldValues, typeof PurchaseOrderSchema>({
    defaultValues: { products: [] },
    schema: PurchaseOrderSchema,
  });
  const createPurchaseMutation = useCreatePurchase();
  const productData = useProductQuery().data?.data?.products;

  useEffect(() => {
    const user = storage.getStorage('userData');
    setValue('warehouse', user.warehouse);
  }, []);

  const { fields, append, remove } = useFieldArray({ control, name: 'products' });

  const watchFields = watch('products');
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFields[index],
  }));

  const done = () => {
    close();
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await createPurchaseMutation.mutateAsync({ data });
    done();
  };

  return (
    <PopupModal open={isOpen}>
      <Container>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          {controlledFields.map((field, index) => {
            return (
              <div className={classes.inputWrapper} key={field.id}>
                <div className={classes.inputContainer}>
                  <Controller
                    control={control}
                    name={`products.${index}.product`}
                    render={({ field: { onChange, value = '' } }) => {
                      return (
                        <FormSelect
                          description="Purchase product"
                          options={remapSelect(productData, 'name', '_id')}
                          value={value}
                          onChange={onChange}
                          label="Product"
                          error={errors?.products?.[index]?.product}
                        />
                      );
                    }}
                  />
                  <FormInput
                    registration={register(`products.${index}.orderQuantity`, {
                      valueAsNumber: true,
                    })}
                    description="Order quantity"
                    placeholder="Enter product quantity"
                    error={errors?.products?.[index]?.orderQuantity}
                  />
                </div>
                <Icon className={classes.buttonIcon} onClick={() => remove(index)} color="action">
                  delete
                </Icon>
              </div>
            );
          })}
          <Icon
            onClick={() => append({ product: '', orderQuantity: 0 })}
            color="primary"
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
