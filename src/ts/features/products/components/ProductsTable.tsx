import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from '@components/core';
import { renderLabel } from '@utils/render-label';
import { formatDate } from '@utils/date-time';
import { IProduct } from '../interfaces/product.interface';
import { DEFAULT_DATE_FORMAT } from '@constants/settings';
import { PRODUCT_TABLE_HEADERS } from '@constants/headers';
import { PRODUCT_TYPE_OPTIONS } from '@constants/options';

type ProductsTableProps = {
  tableData: IProduct[];
};

export const ProductsTable = ({ tableData }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader header={PRODUCT_TABLE_HEADERS} />
      <TableBody>
        {tableData.map((product: IProduct, index: number) => (
          <TableRow key={product._id}>
            <TableCell>
              <Text>{index + 1}</Text>
            </TableCell>
            <TableCell>
              <Text>{product?.name}</Text>
            </TableCell>
            <TableCell>
              <Text>{renderLabel(product?.type, PRODUCT_TYPE_OPTIONS)}</Text>
            </TableCell>
            <TableCell>
              <Text>{product?.price}</Text>
            </TableCell>
            <TableCell>
              <Text>{formatDate(product.createdAt, DEFAULT_DATE_FORMAT)}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
