import React from 'react';
import { useGetPurchases } from '../api/fetch-purchases';
import { MainToolbar, Spinner } from '@components/common';
import { PurchasesTable } from './PurchasesTable';
import { Button } from '@components/core';
import classes from '../styles/main.module.scss';
import { useDisclosure } from '@hooks/useDisclosure';
import { CreatePurchase } from './CreatePurchase';

export const Purchases = () => {
  const { isOpen, open, close } = useDisclosure();
  const { data, isFetched, isFetching } = useGetPurchases();

  const render = () => {
    if (isFetching) {
      return <Spinner />;
    }
    if (isFetched) {
      return <PurchasesTable data={data?.data?.purchaseOrders} />;
    }
  };

  return (
    <React.Fragment>
      <MainToolbar description="Purchases">
        <Button onClick={() => open()} iconleft="add" theme="primary" className={classes.button}>
          Purchase
        </Button>
      </MainToolbar>
      {render()}
      <CreatePurchase isOpen={isOpen} close={close} />
    </React.Fragment>
  );
};
