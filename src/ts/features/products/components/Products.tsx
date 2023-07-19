import { useState } from 'react';

import { useProductQuery } from '../api/fetch-product';
import { DateRangePicker, MainToolbar, Spinner } from '@components/common';
import { Button, MultiSelect } from '@components/core';
import { useDisclosure } from '@hooks/useDisclosure';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';
import classes from './styles/main.module.scss';
import { CreateProduct } from './CreateProduct';
import { ProductsTable } from './ProductsTable';

const defaultFilter = {
  fromDate: null,
  toDate: null,
  types: [] as string[],
};

export const Products = () => {
  const [productFilter, setProductFilter] = useState(defaultFilter);
  const { isOpen, open, close } = useDisclosure();
  const { data, isLoading, isError, isFetched } = useProductQuery();

  const onChangeDatePicker = (value: Date) => {
    setProductFilter({ ...productFilter, ...value });
  };

  const onChangeOptions = (options: string[]) => {
    setProductFilter({ ...productFilter, types: options });
  };

  const renderTable = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isFetched) {
      return <ProductsTable tableData={data?.data?.products} />;
    }
  };

  return (
    <div className={classes.container}>
      <MainToolbar description="Products">
        <Button onClick={() => open()} iconleft="add" theme="primary" className={classes.button}>
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
        {renderTable()}
        <CreateProduct isOpen={isOpen} close={close} />)
      </div>
    </div>
  );
};
