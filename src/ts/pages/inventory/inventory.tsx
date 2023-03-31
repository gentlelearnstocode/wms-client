import { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useProductQuery } from '@api/product-api';

const Inventory = () => {
  const { register, handleSubmit } = useForm();

  const onCreateNewProduct = handleSubmit(async (product: any) => {
    console.log('data', product);
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjMyYjI3NDkyZDhjNjRmM2RjMCIsImlhdCI6MTY4MDA5NDc3MCwiZXhwIjoxNjg3ODcwNzcwfQ._c05fjKiQ9CUnG6XigpUKgaJHgTeC50Pf4D7L1Wyrlo';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(product),
    };
    const response = await fetch(
      'http://localhost:8001/api/v1/products/create-product',
      options
    ).catch((err) => console.log('err', err));
    if (response) {
      const result = await response.json();
      console.log('result', result);
    }
  });

  return (
    <>
      <Box>
        <form onSubmit={onCreateNewProduct}>
          <TextField
            {...register('name')}
            label="Product name"
            type="text"
            name="name"
            required
          />
          <TextField
            {...register('price')}
            label="Price"
            type="number"
            name="price"
            required
          />
          <TextField
            {...register('type')}
            label="Type"
            type="text"
            name="type"
            required
          />
          <Button type="submit">Create</Button>
        </form>
      </Box>
    </>
  );
};

export default Inventory;
