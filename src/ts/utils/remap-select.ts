export const remapSelect = <T>(collection: T[] = [], labelField: string, valueField: string) => {
  return collection.map((item: any, index: number) => {
    return {
      id: index,
      label: item[labelField] || '',
      value: item[valueField] || '',
    };
  });
};
