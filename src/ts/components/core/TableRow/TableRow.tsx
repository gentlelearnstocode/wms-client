import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from '@mui/material';
import clsx from 'clsx';

import classes from './styles.module.scss';

export interface TableRowProps extends MuiTableRowProps {}

const TableRow = ({ className, ...props }: MuiTableRowProps) => (
  <MuiTableRow className={clsx(className, classes.root)} {...props} />
);

export default TableRow;
