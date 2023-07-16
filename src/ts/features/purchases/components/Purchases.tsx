import React from 'react';
import { useGetPurchases } from '../api/fetch-purchases';
import { MainToolbar } from '@components/common';
import { PurchasesTable } from './PurchasesTable';

export const Purchases = () => {
  const { data } = useGetPurchases();
  const purchasesData = data?.data?.purchaseOrders;

  console.log('inventory data', data);

  //TODO: handle failed request here if there is no data render handler

  return (
    <React.Fragment>
      <MainToolbar description="Purchases"></MainToolbar>
      {purchasesData?.length && <PurchasesTable data={purchasesData} />}
    </React.Fragment>
  );
};
