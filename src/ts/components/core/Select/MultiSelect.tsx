import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectProps,
} from '@mui/material';
import clsx from 'clsx';

import classes from './style.module.scss';

export interface MultiSelectProps extends SelectProps {
  options: { value: string; label: string; id: number }[];
}

const MultiSelect = ({
  className,
  options,
  value,
  ...props
}: MultiSelectProps) => {
  console.log('multiselect value', value);

  return (
    <Select
      multiple={true}
      className={clsx(classes.select, className)}
      children={options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          <div className={classes.menuItem}>
            <ListItemText primary={option.label} />
            <Checkbox />
          </div>
        </MenuItem>
      ))}
      renderValue={(selected) => selected.join(', ')}
      value={value}
      {...props}
    />
  );
};

export default MultiSelect;
