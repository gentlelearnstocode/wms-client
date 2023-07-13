import { CircularProgress } from '@mui/material';

export const CircularLoading = (props: any) => {
  const { color } = props;

  return <CircularProgress color={color} />;
};
