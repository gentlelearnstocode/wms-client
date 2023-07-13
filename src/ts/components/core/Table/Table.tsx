import { Table as MuiTable, TableProps } from '@mui/material';
import clsx from 'clsx';

import classes from './styles.module.scss';

export const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div className={classes.tableContainer}>
      <MuiTable className={clsx(classes.root, className)}>{children}</MuiTable>
    </div>
  );
};
