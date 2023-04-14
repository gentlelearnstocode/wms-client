import { useEffect } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { Icon, Breadcrumbs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { signout } from '@api/auth-api';
import AppBar from './components';
import classes from '@styles/main-layout.module.scss';
import styles from './styles';

export interface MainLayoutProps {
  children: React.ReactNode;
  authInfo: {};
}

const MainLayout = ({ authInfo, children }: MainLayoutProps) => {
  const { collapsed, collapseSidebar } = useProSidebar();

  console.log('auth info', authInfo);

  return (
    <div className={classes.mainLayout}>
      <div>
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: styles.sidebar,
          }}
        >
          <Menu>
            <MenuItem onClick={() => collapseSidebar()}>
              {collapsed ? (
                <Icon children="chevron_right" />
              ) : (
                <Icon children="chevron_left" />
              )}
            </MenuItem>
            <MenuItem
              component={<Link to="/inventory" />}
              icon={<Icon children="home" color="action" />}
              children="Home"
            />
            <MenuItem
              component={<Link to="/inventory" />}
              icon={<Icon children="inventory" color="action" />}
              children="Inventory"
            />
            <MenuItem
              component={<Link to="/product-list" />}
              icon={<Icon children="shopping_cart" color="action" />}
              children="Product List"
            />
          </Menu>
          <Menu>
            <MenuItem
              onClick={() => signout()}
              icon={<Icon children="logout" color="action" />}
              children="Log out"
            />
          </Menu>
        </Sidebar>
      </div>
      <div className={classes.container}>
        <AppBar authInfo={authInfo} />
        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
