import { CircularProgress, CircularProgressProps } from '@mui/material';
import classes from './styles.module.scss';
import clsx from 'clsx';

type SpinnerProps = {
  className?: string;
} & CircularProgressProps;

export const Spinner = (props: SpinnerProps) => {
  const { color, className } = props;

  return <CircularProgress className={clsx(className, classes.root)} color={color} {...props} />;
};
