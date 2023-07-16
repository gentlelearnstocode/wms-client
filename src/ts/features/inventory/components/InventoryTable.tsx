import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from '@components/core';
import { IInventory } from '../interfaces/inventory.interface';
import { INVENTORY_TABLE_HEADER } from '@constants/headers';

export type InventoryTableProps = {
  data: IInventory[];
};

export const InventoryTable = ({ data }: InventoryTableProps) => (
  <Table>
    <TableHeader header={INVENTORY_TABLE_HEADER} />
    <TableBody>
      {data.map((i: IInventory, index: number) => (
        <TableRow key={i._id}>
          <TableCell>
            <Text>{index + 1}</Text>
          </TableCell>
          <TableCell>
            {i.products.map((product) => (
              <Text key={product._id}>{product.name}</Text>
            ))}
          </TableCell>
          <TableCell>
            <Text>{i.incomingQuantity}</Text>
          </TableCell>
          <TableCell>
            <Text>{i.outgoingQuantity}</Text>
          </TableCell>
          <TableCell>
            <Text>{i.stockQuantity}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
