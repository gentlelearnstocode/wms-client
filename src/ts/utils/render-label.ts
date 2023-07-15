import { IOption } from '../types/common';

export const renderLabel = (
  value: string,
  options: IOption[],
  defaultLabel? = 'Default',
): string => {
  const filtered = options.filter((option) => option.value === value);
  return filtered[0]?.label ?? defaultLabel;
};
