import React from 'react';

import { useGetInventory } from '../api/fetch-inventory';
import { MainToolbar, PopupModal } from '@components/common';
import { InventoryTable } from './InventoryTable';
import { Button } from '@components/core';
import { useDisclosure } from '@hooks/useDisclosure';
import classes from '../styles/main.module.scss';
import { enqueueSnackbar } from 'notistack';
import { ICreateInventory } from '../interfaces/inventory.interface';
import { CreateInventory } from './CreateInventory';

export const Inventory = () => {
  const { data } = useGetInventory();
  const { isOpen, close, open } = useDisclosure();
  const inventoryData = data?.data?.inventories;

  const onCreateSuccess = (data: ICreateInventory) => {
    close();
    enqueueSnackbar(`Inventory ${data.productId} has been created successfully`, {
      variant: 'success',
    });
  };
  const onCreateError = (err: string) => enqueueSnackbar(err, { variant: 'error' });

  //TODO: handle failed request here if there is no data render handler

  return (
    <React.Fragment>
      <MainToolbar description="Inventory">
        <Button onClick={() => open()} iconleft="add" theme="primary" className={classes.button}>
          Inventory
        </Button>
      </MainToolbar>
      {inventoryData?.length && <InventoryTable data={inventoryData} />}
      <PopupModal onClose={close} open={isOpen}>
        <CreateInventory
          onCreateSuccess={onCreateSuccess}
          closeModal={close}
          onCreateError={onCreateError}
        />
      </PopupModal>
    </React.Fragment>
  );
};
