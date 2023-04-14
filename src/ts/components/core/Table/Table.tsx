import { Table as MuiTable } from '@mui/material';
import { TableProps } from '@mui/material/Table';
import clsx from 'clsx';

import classes from './styles.module.scss';

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <MuiTable className={clsx(classes.root, className)}>{children}</MuiTable>
  );
};

export default Table;
