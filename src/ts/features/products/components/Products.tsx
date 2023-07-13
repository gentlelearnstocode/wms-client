import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useProductQuery } from '../api/fetch-product';
import { DateRangePicker, MainToolbar, PopupModal } from '@components/common';
import {
  Button,
  CircularLoading,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@components/core';
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
  types: [] as string[],
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

  const onChangeOptions = (options: string[]) => {
    setProductFilter({ ...productFilter, types: options });
  };

  return (
    <div className={classes.container}>
      <MainToolbar description="Products">
        <Button onClick={() => open()} iconLeft="add" theme="primary" className={classes.button}>
          Add Product
        </Button>
        <DateRangePicker
          onChangeDate={onChangeDatePicker}
          fromDate={productFilter.fromDate}
          toDate={productFilter.toDate}
          labelFrom="From"
          labelTo="To"
        />
        <Select
          options={PRODUCT_TYPE_OPTIONS}
          label="Status"
          onChangeOptions={onChangeOptions}
          multi
        />
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
      <PopupModal
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
