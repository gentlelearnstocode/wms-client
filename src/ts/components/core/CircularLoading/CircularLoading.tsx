import { CircularProgress } from '@mui/material';

const CircularLoading = (props: any) => {
  const { color } = props;

  return <CircularProgress color={color} />;
};

export default CircularLoading;
