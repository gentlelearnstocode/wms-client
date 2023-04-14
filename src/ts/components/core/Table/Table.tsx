import { Table as MuiTable, TableProps } from '@mui/material';
import clsx from 'clsx';

import classes from './styles.module.scss';

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <MuiTable className={clsx(classes.root, className)}>{children}</MuiTable>
  );
};

export default Table;
