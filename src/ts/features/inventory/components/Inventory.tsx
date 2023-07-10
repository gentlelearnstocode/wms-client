import { TextField, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useCreateProduct } from '../../products';

export const Inventory = () => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useCreateProduct();

  const onCreateNewProduct = handleSubmit(async (product: any) => {
    await mutateAsync(product, {
      onSuccess: (res) => {
        console.log('product', res);
      },
    });
  });

  return (
    <>
      <Box>
        <form onSubmit={onCreateNewProduct}>
          <TextField {...register('name')} label="Product name" type="text" name="name" required />
          <TextField {...register('price')} label="Price" type="number" name="price" required />
          <TextField {...register('type')} label="Type" type="text" name="type" required />
          <Button type="submit">Create</Button>
        </form>
      </Box>
    </>
  );
};

