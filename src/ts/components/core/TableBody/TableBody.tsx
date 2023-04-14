import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
  TableRow,
  TableRowProps,
  TableCell,
  TableCellProps,
} from '@mui/material';
import { FC } from 'react';

import classes from './styles.module.scss';

const mockData = [1, 'Thuoc tri covid', 'Medical', '10,000,000', 10];

export interface TableBodyProps {
  tableData: {}[];
}

const TableBody: FC<
  TableBodyProps & MuiTableBodyProps & TableCellProps & TableRowProps
> = ({ className, ...props }) => {
  return (
    <MuiTableBody>
      <TableRow>
        {mockData.map((item, index) => (
          <TableCell className={classes.tableCell} key={index}>
            {item}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableBody>
  );
};

export default TableBody;
