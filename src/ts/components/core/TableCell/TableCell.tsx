import { TableCell as MuiTableCell, TableCellProps as MuiTableCellProps } from '@mui/material';
import clsx from 'clsx';

import classes from './styles.module.scss';

export type TableCellProps = MuiTableCellProps;

export const TableCell = ({ className, ...props }: TableCellProps) => (
  <MuiTableCell className={clsx(className, classes.root)} {...props} />
);
