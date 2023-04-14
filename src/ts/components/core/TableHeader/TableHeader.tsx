import { FC } from 'react';
import { TableRow, TableCell, TableHead } from '@mui/material';
import { TableRowProps } from '@mui/material/TableRow';
import { TableCellProps } from '@mui/material/TableCell';
import { TableHeadProps } from '@mui/material/TableHead';

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
