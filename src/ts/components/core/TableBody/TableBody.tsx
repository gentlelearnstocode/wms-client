import { TableBody as MuiTableBody, TableBodyProps as MuiTableBodyProps } from '@mui/material';
import clsx from 'clsx';

import classes from './styles.module.scss';

export interface TableBodyProps {}

export const TableBody = ({ className, ...props }: MuiTableBodyProps) => (
  <MuiTableBody className={clsx(className, classes.root)} {...props} />
);
