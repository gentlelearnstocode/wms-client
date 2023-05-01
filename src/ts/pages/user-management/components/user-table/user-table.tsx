import { formatDate } from 'src/ts/utils/dateTime';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { Text, Table, TableBody, TableCell, TableHeader, TableRow } from '@components/core';
import classes from './styles.module.scss';

export interface IUserTable {
  tableData: any;
  tableHeader: { id: number; label: string }[];
}

const UserTable = ({ tableData, tableHeader }: IUserTable) => {
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

export default UserTable;
