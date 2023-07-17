export const remapSelect = <T>(collection: T[] = [], labelField: keyof T, valueField: keyof T) => {
  return collection.map((item: T, index: number) => ({
    id: index,
    label: item[labelField],
    value: item[valueField],
  }));
};
