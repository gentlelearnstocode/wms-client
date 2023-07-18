import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useProductQuery } from '../api/fetch-product';
import { DateRangePicker, MainToolbar, PopupModal } from '@components/common';
import {
  Button,
  CircularLoading,
  MultiSelect,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@components/core';
import { CreateProduct } from './CreateProduct';
import { formatDate } from '@utils/date-time';
import { useDisclosure } from '@hooks/useDisclosure';
import { renderLabel } from '@utils/render-label';
import { PRODUCT_TABLE_HEADERS } from '@constants/headers';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { ICreateProduct } from '../interfaces/product.interface';
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

  const onCreateSuccess = (data: ICreateProduct) => {
    close();
    enqueueSnackbar(`Product ${data.name} has been created successfully`, {
      variant: 'success',
    });
  };

  const onCreateError = (err: string) => enqueueSnackbar(err, { variant: 'error' });

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
        <MultiSelect options={PRODUCT_TYPE_OPTIONS} onChangeOptions={onChangeOptions} />
      </MainToolbar>
      <div>
        {isFetched ? (
          <Table>
            <TableHeader header={PRODUCT_TABLE_HEADERS} />
            <TableBody>
              {data?.data.products.map((product: any, index: number) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Text>{index + 1}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{product?.name}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{renderLabel(product?.type, PRODUCT_TYPE_OPTIONS)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{product?.price}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatDate(product.createdAt, DEFAULT_DATE_FORMAT)}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <CircularLoading />
        )}
      </div>
      <PopupModal onClose={close} open={isOpen}>
        <CreateProduct onSuccess={onCreateSuccess} closeModal={close} onError={onCreateError} />
      </PopupModal>
    </div>
  );
};
