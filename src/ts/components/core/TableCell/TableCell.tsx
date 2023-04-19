import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';
import clsx from 'clsx';

import classes from './styles.module.scss';

export interface TableCellProps extends MuiTableCellProps {}

const TableCell = ({ className, ...props }: TableCellProps) => (
  <MuiTableCell className={clsx(className, classes.root)} {...props} />
);

export default TableCell;
