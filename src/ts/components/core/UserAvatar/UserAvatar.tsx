import { Avatar, AvatarProps } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { Text } from '@components/core';
import classes from './styles.module.scss';

export interface UserAvatarProps extends AvatarProps {
  userRole: string;
  email: string;
}

const UserAvatar: FC<UserAvatarProps> = ({
  className,
  email,
  userRole,
  ...props
}) => {
  return (
    <div className={classes.container}>
      <Avatar
        className={clsx(classes.root, className, classes[`${userRole}BG`])}
        {...props}
      />
      <Text textSize="small">{email}</Text>
    </div>
  );
};

export default UserAvatar;
