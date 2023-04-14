import { useState } from 'react';
import { Box, Container } from '@mui/material';

import { useProductQuery } from '@api/product-api';
import { DateRangePicker, Modal } from '@components/common';
import { Button, Text, Table, TableHeader, TableBody } from '@components/core';
import CreateProduct from './components';
import { PRODUCT_TABLE_HEADERS } from 'src/constants/headers';
import classes from './style.module.scss';

const ProductList = () => {
  const [dateData, setDateData] = useState({
    fromDate: null,
    toDate: null,
  });
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false);
  const { isFetching, isFetched, isError, data } = useProductQuery();

  const onClickOpenModal = () => setCreateProductModalOpen(true);
  const onClickCloseModal = () => setCreateProductModalOpen(false);

  console.log('data', data);
  console.log('is fetched', isFetched);
  console.log('is fetching', isFetching);
  console.log('is Error', isError);

  return (
    <div className={classes.container}>
      <div className={classes.toolbarContainer}>
        <Text textSize="large">Products</Text>
        <div className={classes.toolbar}>
          <Button
            onClick={() => onClickOpenModal()}
            iconLeft="add"
            className={classes.button}
            theme="primary"
          >
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
        <Table>
          <TableHeader headerData={PRODUCT_TABLE_HEADERS} />
          <TableBody tableData={[{}]} />
        </Table>
      </div>
      <Modal
        onClose={onClickCloseModal}
        open={createProductModalOpen}
        children={<CreateProduct />}
      />
    </div>
  );
};

export default ProductList;
