import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useProductQuery } from '../api/fetch-product';
import { DateRangePicker, Modal } from '@components/common';
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  CircularLoading,
  TableCell,
  TableRow,
  Select,
} from '@components/core';
import MainToolbar from '@components/MainToolbar';
import { CreateProduct } from './CreateProduct';
import { PRODUCT_TABLE_HEADERS } from '@constants/headers';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import { formatDate } from '../../../utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { useDisclosure } from '../../../hooks/useDisclosure';
import classes from './styles/main.module.scss';

const defaultFilter = {
  fromDate: null,
  toDate: null,
  status: [] as string[],
};

export const Products = () => {
  const [productFilter, setProductFilter] = useState(defaultFilter);
  const { isOpen, open, close } = useDisclosure();
  const { data, isLoading, isError, isFetched } = useProductQuery();

  const onCreateProductSuccess = (productData: any) => {
    close();
    enqueueSnackbar(`Product ${productData.name} has been created successfully`, {
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

  return (
    <div className={classes.container}>
      <MainToolbar description="Products">
        <Button onClick={() => open()} iconLeft="add" theme="primary">
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
        onClose={close}
        open={isOpen}
        children={
          <CreateProduct
            onCreateSuccess={onCreateProductSuccess}
            closeModal={close}
            onCreateError={onCreateProductError}
          />
        }
      />
    </div>
  );
};

