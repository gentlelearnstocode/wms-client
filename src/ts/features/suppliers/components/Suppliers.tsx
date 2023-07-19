import React from 'react';
import { enqueueSnackbar } from 'notistack';

import { useDisclosure } from '../../../hooks/useDisclosure';
import { useGetAllSuppliers } from '../api/fetch-suppliers';
import { MainToolbar, PopupModal } from '@components/common';
import { Button, Spinner } from '@components/core';
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
        <Button onClick={() => open()} iconleft="add" theme="primary">
          Add Supplier
        </Button>
      </MainToolbar>
      <PopupModal open={isOpen} onClose={close}>
        <CreateSupplier
          onCreateError={onCreateSupplierError}
          onCreateSuccess={onCreateSupplierSuccess}
          closeModal={close}
        />
      </PopupModal>
      {supplierData ? <SupplierTable tableData={supplierData?.data.suppliers} /> : <Spinner />}
    </React.Fragment>
  );
};
