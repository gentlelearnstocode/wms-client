import { FC } from 'react';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import { SelectProps, SelectChangeEvent } from '@mui/material/Select';

export interface SelectOptionProps extends SelectProps {
  multi?: boolean;
  options: { value: string; label: string; id: number }[];
  // onChangeOption: (event: SelectChangeEvent) => void;
  placeholder?: string;
}

const Select: FC<SelectOptionProps> = ({ multi, ...props }) => {
  return multi ? <MultiSelect {...props} /> : <SingleSelect {...props} />;
};

export default Select;
