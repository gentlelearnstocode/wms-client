import React from 'react';

import { useWarehouseQuery } from '@api/warehouse-api';
import classes from './styles.module.scss';

const WarehouseManagement = () => {
  const { data: warehouseData, isFetched, isFetching, isError } = useWarehouseQuery();

  console.log('warehouse data', warehouseData);

  return <React.Fragment>Warehouse management</React.Fragment>;
};

export default WarehouseManagement;
