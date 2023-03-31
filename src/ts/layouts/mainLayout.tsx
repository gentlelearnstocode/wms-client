import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom';

import classes from '@styles/main-layout.module.scss';
import { ReactChildrenType } from '../types';
import styles from './styles';

const MainLayout = ({ children }: ReactChildrenType) => {
  const { collapsed, collapseSidebar } = useProSidebar();
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
            >
              Home
            </MenuItem>
            <MenuItem
              component={<Link to="/inventory" />}
              icon={<Icon children="inventory" color="action" />}
            >
              Inventory
            </MenuItem>
            <MenuItem
              component={<Link to="/product-list" />}
              icon={<Icon children="shopping_cart" color="action" />}
            >
              Product
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
