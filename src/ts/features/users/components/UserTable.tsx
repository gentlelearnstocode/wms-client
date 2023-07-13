import { formatDate } from '../../../utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from '@components/core';

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
              <Text></Text>
              {index + 1}
            </TableCell>
            <TableCell>
              <Text></Text>
              {user?.email}
            </TableCell>
            <TableCell>
              <Text></Text>
              {user?.role}
            </TableCell>
            <TableCell>
              <Text></Text>
              {formatDate(user.createdAt, DEFAULT_DATE_FORMAT)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

