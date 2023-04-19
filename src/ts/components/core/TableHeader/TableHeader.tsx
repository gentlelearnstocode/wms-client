import { TableHead, TableHeadProps } from '@mui/material';

import TableRow from '../TableRow';
import TableCell from '../TableCell';
import classes from './styles.module.scss';

export interface TableHeaderProps extends TableHeadProps {
  headerData: { id: number; label: string }[];
}

const TableHeader = ({ headerData, ...props }: TableHeaderProps) => {
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

export default TableHeader;
