import { TableHead, TableHeadProps } from '@mui/material';

import { TableCell, TableRow } from '@components/core';
import classes from './styles.module.scss';

export interface ITableHeader extends TableHeadProps {
  header: { id: number; label: string }[];
}

export const TableHeader = ({ header, ...props }: ITableHeader) => {
  return (
    <TableHead>
      <TableRow className={classes.headerRow}>
        {header.map((i) => (
          <TableCell className={classes.header} key={i.id}>
            {i.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
