import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useUserQuery } from '@api/user-api';
import { useWarehouseQuery } from '@api/warehouse-api';
import UserTable from './components/user-table';
import CreateUser from './components/create-user';
import MainToolbar from '@components/MainToolbar';
import { Button, Select } from '@components/core';
import { Modal } from '@components/common';
import { USER_TABLE_HEADERS } from '@constants/headers';
import { USER_TYPE_OPTIONS } from '@constants/options';

const defaultFilters = {
  role: 'all',
};

const UserManagement = () => {
  const [userFilters, setUserFilters] = useState(defaultFilters);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const { data: userData, isFetched: userIsFetched, isFetching: userIsFetching, isError: userIsError } = useUserQuery();
  const {
    data: warehouseData,
    isFetched: warehouseIsFetched,
    isFetching: warehouseIsFetching,
    isError: warehouseIsError,
  } = useWarehouseQuery();

  const onChangeRole = (option: string) => {
    setUserFilters({ ...userFilters, role: option });
  };

  const openModal = () => setAddProductModalOpen(true);
  const closeModal = () => setAddProductModalOpen(false);

  const onCreateUserSuccess = (userData) => {
    closeModal();
    enqueueSnackbar(`${userData?.email} has been created successfully`, { variant: 'success' });
  };

  const onCreateUserError = (error) => enqueueSnackbar(`Create user failed: ${error}`, { variant: 'error' });

  // console.log('user filters', userFilters);
  console.log('warehouse data', warehouseData);

  return (
    <div>
      <MainToolbar description="Users">
        <Button onClick={() => openModal()} iconLeft="add">
          Add user
        </Button>
        <Select
          icon="person"
          label="User role"
          options={USER_TYPE_OPTIONS}
          onChangeOption={onChangeRole}
          value={userFilters.role}
        />
      </MainToolbar>
      <div>{userData && <UserTable tableHeader={USER_TABLE_HEADERS} tableData={userData?.data.users} />}</div>;
      <Modal
        open={addProductModalOpen}
        children={
          <CreateUser
            onCreateSuccess={onCreateUserSuccess}
            onCreateError={onCreateUserError}
            closeModal={closeModal}
            warehouses={warehouseData?.data.warehouses}
          />
        }
        onClose={closeModal}
      />
    </div>
  );
};

export default UserManagement;
