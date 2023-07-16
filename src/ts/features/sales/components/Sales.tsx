import React from 'react';
import { useGetSales } from '../api/fetch-sales';
import { MainToolbar } from '@components/common';
import { SalesTable } from './SalesTable';

export const Sales = () => {
  const { data } = useGetSales();
  const salesData = data?.data?.salesOrders;

  //TODO: handle failed request here if there is no data render handler

  return (
    <React.Fragment>
      <MainToolbar description="Purchases"></MainToolbar>
      {salesData?.length && <SalesTable data={salesData} />}
    </React.Fragment>
  );
};
