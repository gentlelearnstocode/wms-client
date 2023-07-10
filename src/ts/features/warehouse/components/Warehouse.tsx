import React from 'react';
import { useWarehouseQuery } from '../api/fetch-warehouse';

export const Warehouse = () => {
  const { data: warehouseData, isFetched, isFetching, isError } = useWarehouseQuery();

  console.log('warehouse data', warehouseData);

  return <React.Fragment>Warehouse management</React.Fragment>;
};

