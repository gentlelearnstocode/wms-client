export const reMapSelect = (collection: any, labelField: string, valueField: string) => {
  return collection?.map((item: any, index: number) => {
    return {
      id: index,
      label: item[labelField] || '',
      value: item[valueField] || '',
    };
  });
};
