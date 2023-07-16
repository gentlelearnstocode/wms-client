import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from '@components/core';
import { PURCHASE_ORDER_HEADER } from '@constants/headers';
import { IPurchase } from '../interfaces/purchases.interface';
import { formatDate } from '@utils/date-time';

export type PurchasesTableProps = {
  data: IPurchase[];
};
export const PurchasesTable = ({ data }: PurchasesTableProps) => (
  <Table>
    <TableHeader header={PURCHASE_ORDER_HEADER} />
    <TableBody>
      {data.map((purchase: IPurchase, index: number) => (
        <TableRow key={purchase._id}>
          <TableCell>
            <Text>{index + 1}</Text>
          </TableCell>
          <TableCell>
            <Text>{purchase.PONumber}</Text>
          </TableCell>
          <TableCell>
            <Text>Product</Text>
          </TableCell>
          <TableCell>
            <Text>{purchase.totalOrderQuantity}</Text>
          </TableCell>
          <TableCell>
            <Text>{purchase.status}</Text>
          </TableCell>
          <TableCell>
            <Text>{formatDate(purchase.createdAt)}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
