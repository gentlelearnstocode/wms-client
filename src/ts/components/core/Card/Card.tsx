import { ReactElement } from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardActions,
} from '@mui/material';
import clsx from 'clsx';

import { Text } from '@components/core';
import classes from './card.module.scss';

//Todo: review this component and make it generic
type CardProps = {
  description?: string;
  deleteButton: ReactElement;
  confirmButton: ReactElement;
} & MuiCardProps;

export const Card = (props: CardProps) => {
  const { description, children, className, deleteButton, confirmButton } = props;
  return (
    <MuiCard {...props} className={clsx(classes.root, className)}>
      <Text textSize="large">{description}</Text>
      <CardContent className={classes.content}>{children}</CardContent>
      <CardActions>
        {confirmButton}
        {deleteButton}
      </CardActions>
    </MuiCard>
  );
};
