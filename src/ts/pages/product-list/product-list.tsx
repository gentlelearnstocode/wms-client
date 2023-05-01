import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useProductQuery } from '@api/product-api';
import { DateRangePicker, Modal, FilterPopover } from '@components/common';
import {
  Button,
  Text,
  Table,
  TableHeader,
  TableBody,
  CircularLoading,
  TableCell,
  TableRow,
  Select,
} from '@components/core';
import MainToolbar from '@components/MainToolbar';
import CreateProduct from './components';
import { PRODUCT_TABLE_HEADERS } from 'src/constants/headers';
import classes from './style.module.scss';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import { formatDate } from 'src/ts/utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';

const defaultFilter = {
  fromDate: null,
  toDate: null,
  status: [] as string[],
};

const ProductList = () => {
  const [productFilter, setProductFilter] = useState(defaultFilter);
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

  const onCreateProductError = (err: string) => enqueueSnackbar(err, { variant: 'error' });

  const onChangeDatePicker = (value: Date) => {
    setProductFilter({ ...productFilter, ...value });
  };

  const onChangeStatus = (options: string[]) => {
    setProductFilter({ ...productFilter, status: options });
  };

  console.log('product filter', productFilter);

  return (
    <div className={classes.container}>
      <MainToolbar description="Products">
        <Button onClick={() => openModal()} iconLeft="add" theme="primary">
          Add Product
        </Button>
        <DateRangePicker
          onChangeDate={onChangeDatePicker}
          fromDate={productFilter.fromDate}
          toDate={productFilter.toDate}
          labelFrom="From"
          labelTo="To"
        />
        <Select options={PRODUCT_TYPE_OPTIONS} label="Status" onChangeOptions={onChangeStatus} multi />
      </MainToolbar>
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
                  <TableCell>{formatDate(product.createdAt, DEFAULT_DATE_FORMAT)}</TableCell>
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
        children={
          <CreateProduct
            onCreateSuccess={onCreateProductSuccess}
            closeModal={closeModal}
            onCreateError={onCreateProductError}
          />
        }
      />
    </div>
  );
};

export default ProductList;
