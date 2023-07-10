import { Table, TableHeader, TableRow, TableCell, TableBody } from '@components/core';
import { SUPPLIERS_TABLE_HEADERS } from '@constants/headers';

export interface ISupplierTable {
  tableData: any;
}

export const SupplierTable = ({ tableData, ...props }: ISupplierTable) => {
  return (
    <Table>
      <TableHeader headerData={SUPPLIERS_TABLE_HEADERS} />
      <TableBody>
        {tableData.map((row: any, index: number) => (
          <TableRow key={row._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.contact.phone}</TableCell>
            <TableCell>{row.taxCode}</TableCell>
            <TableCell>{row.addressInfo.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

