import React from 'react';

import { MainToolbar, Spinner } from '@components/common';
import { InventoryTable } from './InventoryTable';
import { Button } from '@components/core';
import { useGetInventory } from '../api/fetch-inventory';
import { useDisclosure } from '@hooks/useDisclosure';
import { CreateInventory } from './CreateInventory';
import classes from '../styles/main.module.scss';

export const Inventory = () => {
  const getInventoryQuery = useGetInventory();
  const { isOpen, close, open } = useDisclosure();

  const render = () => {
    if (getInventoryQuery.isFetching) {
      return <Spinner />;
    }
    if (getInventoryQuery.isFetched) {
      return <InventoryTable data={getInventoryQuery.data?.data?.inventories} />;
    }
  };

  return (
    <React.Fragment>
      <MainToolbar description="Inventory">
        <Button onClick={() => open()} iconleft="add" theme="primary" className={classes.button}>
          Inventory
        </Button>
      </MainToolbar>
      {render()}
      <CreateInventory isOpen={isOpen} close={close} />
    </React.Fragment>
  );
};
