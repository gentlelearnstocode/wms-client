import { useState } from 'react';
import {
  Menu,
  MenuItem,
  MenuItemProps,
  Sidebar,
  sidebarClasses,
  useProSidebar,
} from 'react-pro-sidebar';
import { Icon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { MAIN_MENU } from '@constants/menus';
import { signout } from '../auth';
import AppBar from './components';
import classes from './styles.module.scss';
import styles from './styles';

export interface MainLayoutProps {
  children: React.ReactNode;
  authInfo: object;
}

export interface LayoutItemProps extends MenuItemProps {
  selected: boolean;
}

const MainLayout = ({ authInfo, children }: MainLayoutProps) => {
  const currentPath = useLocation().pathname;
  const { collapsed, collapseSidebar } = useProSidebar();
  const [selectedTab, setSelectedTab] = useState(currentPath);

  return (
    <div className={classes.mainLayout}>
      <div>
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: styles.sidebar,
          }}
        >
          <Menu>
            {MAIN_MENU.map((menu) => {
              const { id, name, link, icon } = menu;
              return name === 'collapse' ? (
                <MenuItem key={id} onClick={() => collapseSidebar()}>
                  {collapsed ? <Icon children="chevron_right" /> : <Icon children="chevron_left" />}
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => setSelectedTab(link || '')}
                  className={clsx({
                    [classes.layoutItemActive]: selectedTab === link,
                  })}
                  key={id}
                  component={<Link to={link || ''} />}
                  icon={<Icon children={icon} />}
                  children={name}
                />
              );
            })}
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
