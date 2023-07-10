import React, { useState } from 'react';
import { EnqueueSnackbar, enqueueSnackbar } from 'notistack';

import { useDisclosure } from '../../../hooks/useDisclosure';
import {useGetAllSuppliers} from '../api/fetch-suppliers';
import MainToolbar from '@components/MainToolbar';
import { Button, CircularLoading, Text } from '@components/core';
import { Modal } from '@components/common';
import { CreateSupplier } from './CreateSupplier';
import { SupplierTable } from './SupplierTable';

export const Suppliers = () => {
  const { isOpen, open, close } = useDisclosure();
  const { data: supplierData, isFetching } = useGetAllSuppliers();

  const onCreateSupplierSuccess = (supplierData: any) => {
    enqueueSnackbar(`Supplier ${supplierData.name} has been created`, { variant: 'success' });
    close();
  };

  const onCreateSupplierError = (error: any) => {
    enqueueSnackbar(`Create supplier failed: ${error}`, { variant: 'error' });
  };

  return (
    <React.Fragment>
      <MainToolbar description="Suppliers">
        <Button onClick={() => open()} iconLeft="add" theme="primary">
          Add Supplier
        </Button>
      </MainToolbar>
      <Modal open={isOpen} onClose={close}>
        <CreateSupplier
          onCreateError={onCreateSupplierError}
          onCreateSuccess={onCreateSupplierSuccess}
          closeModal={close}
        />
      </Modal>
      {supplierData ? <SupplierTable tableData={supplierData?.data.suppliers} /> : <CircularLoading />}
    </React.Fragment>
  );
};

