import { Typography, TypographyProps } from '@mui/material';

import classes from './styles.module.scss';
import clsx from 'clsx';

export interface TextProps extends TypographyProps {
  textSize?: 'small' | 'medium' | 'large' | 'superlarge';
}

const Text = ({ className, textSize = 'medium', ...props }: TextProps) => {
  return (
    <Typography
      className={clsx(classes.root, className, classes[textSize])}
      {...props}
    />
  );
};

export default Text;
