import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { useUserQuery } from '../api/fetch-users';
import { useWarehouseQuery } from '../../warehouses';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { UserTable } from './UserTable';
import { CreateUser } from './CreateUser';
import { Button, SingleSelect } from '@components/core';
import { MainToolbar, PopupModal } from '@components/common';
import { USER_TABLE_HEADERS } from '@constants/headers';
import { USER_TYPE_OPTIONS } from '@constants/options';

export const Users = () => {
  const [userRole, setUserRole] = useState<string>('all');
  const { open, close, isOpen } = useDisclosure();
  const {
    data: userData,
    isFetched: userIsFetched,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useUserQuery();
  const {
    data: warehouseData,
    isFetched: warehouseIsFetched,
    isFetching: warehouseIsFetching,
    isError: warehouseIsError,
  } = useWarehouseQuery();

  const onChangeRole = (option: string) => {
    setUserRole(option);
  };

  const onCreateUserSuccess = (userData: any) => {
    close();
    enqueueSnackbar(`${userData?.email} has been created successfully`, { variant: 'success' });
  };

  const onCreateUserError = (error: any) =>
    enqueueSnackbar(`Create user failed: ${error}`, { variant: 'error' });

  return (
    <div>
      <MainToolbar description="Users">
        <Button onClick={() => open()} iconleft="add">
          Add user
        </Button>
        <SingleSelect
          label="Role"
          options={USER_TYPE_OPTIONS}
          onChange={onChangeRole}
          value={userRole}
        />
      </MainToolbar>
      <div>
        {userData && (
          <UserTable tableHeader={USER_TABLE_HEADERS} tableData={userData?.data.users} />
        )}
      </div>
      ;
      <PopupModal open={isOpen} onClose={close}>
        <CreateUser
          onCreateSuccess={onCreateUserSuccess}
          onCreateError={onCreateUserError}
          closeModal={close}
          warehouses={warehouseData?.data.warehouses}
        />
      </PopupModal>
    </div>
  );
};
