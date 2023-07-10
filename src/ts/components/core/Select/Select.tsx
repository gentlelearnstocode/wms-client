import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

export interface ISelectOptions extends React.HTMLProps<HTMLInputElement> {
  multi?: boolean;
  options: { value: string; label: string; id: number }[];
  label: string;
  onChangeOptions?: (option: string[]) => void;
  onChangeOption?: (option: string) => void;
  iconRight?: string;
  iconLeft?: string;
}

const Select = ({ multi, ...props }: ISelectOptions) => {
  return multi ? <MultiSelect {...props} /> : <SingleSelect {...props} />;
};

export default Select;
