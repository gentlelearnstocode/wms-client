import { TableHead, TableHeadProps } from '@mui/material';

import { TableCell, TableRow } from '@components/core';
import classes from './styles.module.scss';

export interface ITableHeader extends TableHeadProps {
  headerData: { id: number; label: string }[];
}

export const TableHeader = ({ headerData, ...props }: ITableHeader) => {
  return (
    <TableHead>
      <TableRow className={classes.headerRow}>
        {headerData.map((head) => (
          <TableCell className={classes.header} key={head.id}>
            {head.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
