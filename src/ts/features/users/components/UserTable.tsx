import { formatDate } from '../../../utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { USER_TYPE_OPTIONS } from '../../../../constants';
import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from '@components/core';
import { renderLabel } from '../../../utils/render-label';

export interface IUserTable {
  tableData: any;
  tableHeader: { id: number; label: string }[];
}

export const UserTable = ({ tableData, tableHeader }: IUserTable) => {
  return (
    <Table>
      <TableHeader headerData={tableHeader} />
      <TableBody>
        {tableData.map((user: any, index: number) => (
          <TableRow key={user._id}>
            <TableCell>
              <Text>{index + 1}</Text>
            </TableCell>
            <TableCell>
              <Text>{user?.email}</Text>
            </TableCell>
            <TableCell>
              <Text>{renderLabel(user?.role, USER_TYPE_OPTIONS)}</Text>
            </TableCell>
            <TableCell>
              <Text>{formatDate(user.createdAt, DEFAULT_DATE_FORMAT)}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

