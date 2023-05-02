import React, { useState } from 'react';
import { EnqueueSnackbar, enqueueSnackbar } from 'notistack';

import { useDisclosure } from 'src/ts/hooks/useDisclosure';
import { useGetAllSuplliers } from '@api/supplier-api';
import MainToolbar from '@components/MainToolbar';
import { Button, CircularLoading, Text } from '@components/core';
import { Modal } from '@components/common';
import CreateSupplier from './components/create-supplier';
import SupplierTable from './components/supplier-table';

const Suppliers = () => {
  const { isOpen, open, close } = useDisclosure();
  const { data: supplierData, isFetching } = useGetAllSuplliers();

  const onCreateSupplierSuccess = (supplierData) => {
    enqueueSnackbar(`Supplier ${supplierData.name} has been created`, { variant: 'success' });
    close();
  };

  const onCreateSupplierError = (error) => {
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

export default Suppliers;
