import { Toolbar, ToolbarProps } from '@mui/material';

import { Text } from '@components/core';
import classes from './styles.module.scss';

export interface IToolbar extends ToolbarProps {
  description: string;
}

export const MainToolbar = ({ children, description, ...props }: IToolbar) => {
  return (
    <div className={classes.toolbarContainer}>
      <Text textSize="large">{description}</Text>
      <Toolbar className={classes.container}>{children}</Toolbar>
    </div>
  );
};
