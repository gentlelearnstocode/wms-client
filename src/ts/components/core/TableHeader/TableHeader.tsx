import { FC } from 'react';
import {
  TableRow,
  TableCell,
  TableHead,
  TableRowProps,
  TableCellProps,
  TableHeadProps,
} from '@mui/material';

import classes from './styles.module.scss';

export interface TableHeaderProps {
  headerData: { id: number; label: string }[];
}

const TableHeader: FC<
  TableHeaderProps & TableRowProps & TableCellProps & TableHeadProps
> = ({ headerData, ...props }) => {
  return (
    <TableHead>
      <TableRow>
        {headerData.map((head) => (
          <TableCell className={classes.header} key={head.id}>
            {head.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
