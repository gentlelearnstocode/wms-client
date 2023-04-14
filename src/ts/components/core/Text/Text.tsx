import { Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';

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
