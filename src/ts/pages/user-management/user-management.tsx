import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useUserQuery } from '@api/user-api';
import { useWarehouseQuery } from '@api/warehouse-api';
import { useDisclosure } from 'src/ts/hooks/useDisclosure';
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
  const { open, close, isOpen } = useDisclosure();
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

  const onCreateUserSuccess = (userData) => {
    close();
    enqueueSnackbar(`${userData?.email} has been created successfully`, { variant: 'success' });
  };

  const onCreateUserError = (error) => enqueueSnackbar(`Create user failed: ${error}`, { variant: 'error' });

  console.log('warehouse data', warehouseData);

  return (
    <div>
      <MainToolbar description="Users">
        <Button onClick={() => open()} iconLeft="add">
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
        open={isOpen}
        children={
          <CreateUser
            onCreateSuccess={onCreateUserSuccess}
            onCreateError={onCreateUserError}
            closeModal={close}
            warehouses={warehouseData?.data.warehouses}
          />
        }
        onClose={close}
      />
    </div>
  );
};

export default UserManagement;
