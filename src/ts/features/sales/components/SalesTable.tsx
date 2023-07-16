import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from '@components/core';
import { SALES_ORDER_HEADER } from '@constants/headers';
import { ISales } from '../interfaces/sales.interface';
import { formatDate } from '../../../utils/dateTime';

export type SalesTableProps = {
  data: ISales[];
};

export const SalesTable = ({ data }: SalesTableProps) => (
  <Table>
    <TableHeader header={SALES_ORDER_HEADER} />
    <TableBody>
      {data.map((order: ISales, index: number) => (
        <TableRow key={order._id}>
          <TableCell>
            <Text>{index + 1}</Text>
          </TableCell>
          <TableCell>
            <Text>{order.SONumber}</Text>
          </TableCell>
          <TableCell>
            <Text>Product</Text>
          </TableCell>
          <TableCell>
            <Text>{order.totalOrderQuantity}</Text>
          </TableCell>
          <TableCell>
            <Text>{order.status}</Text>
          </TableCell>
          <TableCell>
            <Text>{formatDate(order.createdAt)}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
