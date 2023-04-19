import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { useProductQuery } from '@api/product-api';
import { DateRangePicker, Modal } from '@components/common';
import { Button, Text, Table, TableHeader, TableBody, CircularLoading, TableCell, TableRow } from '@components/core';
import CreateProduct from './components';
import { PRODUCT_TABLE_HEADERS } from 'src/constants/headers';
import classes from './style.module.scss';

const ProductList = () => {
  const [dateData, setDateData] = useState({
    fromDate: null,
    toDate: null,
  });
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false);
  const { data, isLoading, isError, isFetched } = useProductQuery();

  const openModal = () => setCreateProductModalOpen(true);
  const closeModal = () => setCreateProductModalOpen(false);

  const onCreateProductSuccess = () => {
    closeModal();
    enqueueSnackbar('New Product has been created successfully', {
      variant: 'success',
    });
  };

  const onCreateProductError = (err) => enqueueSnackbar(err, { variant: 'error' });

  return (
    <div className={classes.container}>
      <div className={classes.toolbarContainer}>
        <Text textSize="large">Products</Text>
        <div className={classes.toolbar}>
          <Button onClick={() => openModal()} iconLeft="add" className={classes.button} theme="primary">
            Add Product
          </Button>
          <DateRangePicker
            fromDate={dateData.fromDate}
            toDate={dateData.toDate}
            onChangePicker={setDateData}
            labelFrom="From"
            labelTo="To"
          />
        </div>
      </div>
      <div>
        {isFetched ? (
          <Table>
            <TableHeader headerData={PRODUCT_TABLE_HEADERS} />
            <TableBody>
              {data?.data.products.map((product: any, index: number) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{product?.type}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>{product?.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <CircularLoading />
        )}
      </div>
      <Modal
        onClose={closeModal}
        open={createProductModalOpen}
        children={<CreateProduct onCreateSuccess={onCreateProductSuccess} onCreateError={onCreateProductError} />}
      />
    </div>
  );
};

export default ProductList;
