import { Typography, TypographyProps } from '@mui/material';

import classes from './styles.module.scss';
import clsx from 'clsx';

export interface TextProps extends TypographyProps {
  textSize?: 'small' | 'medium' | 'large' | 'superlarge';
  theme?: 'default' | 'white';
}

export const Text = ({
  className,
  textSize = 'small',
  theme = 'default',
  ...otherProps
}: TextProps) => {
  return (
    <Typography
      className={clsx(classes.root, className, classes[textSize], classes[theme])}
      {...otherProps}
    />
  );
};
