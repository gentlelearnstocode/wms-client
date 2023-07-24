import React from 'react';
import { useGetSales } from '../api/fetch-sales';
import { MainToolbar, Spinner } from '@components/common';
import { SalesTable } from './SalesTable';
import { Button } from '@components/core';
import { useDisclosure } from '@hooks/useDisclosure';
import classes from '../../products/components/styles/main.module.scss';
import { CreateSales } from './CreateSales';

export const Sales = () => {
  const salesOrderQuery = useGetSales();
  const { open, isOpen, close } = useDisclosure();
  const renderTable = () => {
    if (salesOrderQuery.isFetching) {
      return <Spinner />;
    }
    if (salesOrderQuery.isFetched) {
      return <SalesTable data={salesOrderQuery.data?.data?.salesOrders} />;
    }
  };

  return (
    <React.Fragment>
      <MainToolbar description="Purchases">
        <Button onClick={() => open()} iconleft="add" theme="primary" className={classes.button}>
          Add sales
        </Button>
      </MainToolbar>
      {renderTable()}
      <CreateSales isOpen={isOpen} close={close} />
    </React.Fragment>
  );
};
