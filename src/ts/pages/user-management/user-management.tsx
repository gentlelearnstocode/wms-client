import { useUserQuery } from '@api/user-api';

import UserTable from './components';
import { USER_TABLE_HEADERS } from '@constants/headers';
import MainToolbar from '@components/MainToolbar';
import { Button } from '@components/core';
import { FilterPopover } from '@components/common';

const UserManagement = () => {
  const { data, isFetched, isFetching, isError } = useUserQuery();
  return (
    <div>
      <MainToolbar description="Users">
        <Button iconLeft="add">Add user</Button>
        <FilterPopover />
      </MainToolbar>
    </div>
  );

  // return <div>{data && <UserTable tableHeader={USER_TABLE_HEADERS} tableData={data?.data.users} />}</div>;
};

export default UserManagement;
