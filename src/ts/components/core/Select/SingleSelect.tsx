import { Select, MenuItem } from '@mui/material';
import { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface SingleSelectProps extends SelectProps {
  options: { value: string; label: string; id: number }[];
  // onChangeOption: (event: SelectChangeEvent) => void;
}

const SingleSelect = ({
  className,
  placeholder,
  options,
  value,
  // onChangeOption,
  ...props
}: SingleSelectProps) => {
  return (
    <Select
      value={value}
      className={clsx(classes.select, className)}
      children={options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      {...props}
    />
  );
};

export default SingleSelect;
