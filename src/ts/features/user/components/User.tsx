import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useUserQuery } from '../api/fetch-users';
import { useWarehouseQuery } from '../../warehouse';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { UserTable } from './UserTable';
import { CreateUser } from './CreateUser';
import MainToolbar from '@components/MainToolbar';
import { Button, Select } from '@components/core';
import { Modal } from '@components/common';
import { USER_TABLE_HEADERS } from '@constants/headers';
import { USER_TYPE_OPTIONS } from '@constants/options';
import classes from './styles/main.module.scss';

const defaultFilters = {
  role: 'all',
};

export const User = () => {
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

  const onCreateUserSuccess = (userData: any) => {
    close();
    enqueueSnackbar(`${userData?.email} has been created successfully`, { variant: 'success' });
  };

  const onCreateUserError = (error: any) => enqueueSnackbar(`Create user failed: ${error}`, { variant: 'error' });

  console.log('warehouse data', warehouseData);

  return (
    <div>
      <MainToolbar description="Users">
        <Button className={classes.button} onClick={() => open()} iconLeft="add">
          Add user
        </Button>
        <Select
          iconRight="person"
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

