import React from 'react';
import { useGetInventory } from '../api/fetch-inventory';
import { MainToolbar } from '@components/common';
import { InventoryTable } from './InventoryTable';

export const Inventory = () => {
  const { data } = useGetInventory();
  const inventoryData = data?.data?.inventories;

  console.log('inventory data', inventoryData);

  //TODO: handle failed request here if there is no data render handler

  return (
    <React.Fragment>
      <MainToolbar description="Purchases"></MainToolbar>
      {inventoryData?.length && <InventoryTable data={inventoryData} />}
    </React.Fragment>
  );
};
