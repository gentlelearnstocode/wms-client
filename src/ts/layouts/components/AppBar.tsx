import { FormInput, UserAvatar } from '@components/core';
import classes from './styles.module.scss';

export interface AppBarProps {
  authInfo: any;
}

const AppBar = ({ authInfo, ...props }: AppBarProps) => {
  const { email, role } = authInfo;
  return (
    <div className={classes.root}>
      <FormInput
        className={classes.searchBar}
        iconLeft="search"
        placeholder="Search product, supplier, order"
      />
      <UserAvatar email={email} userRole={role} alt={`user-${name}`} />
    </div>
  );
};

export default AppBar;
