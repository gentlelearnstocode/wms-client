import { Tab, Tabs as MuiTabs, TabsProps as MuiTabsProps, Container, Box } from '@mui/material';
import { Fragment, ReactNode, SyntheticEvent, useState } from 'react';

import classes from './tabs.module.scss';

interface SingleTab {
  id: number;
  label: string;
  content: ReactNode;
}

type TabContentProps = {
  children: ReactNode;
  value: number;
  index: number;
};

type TabsProps = {
  tabs: SingleTab[];
} & MuiTabsProps;

export const TabContent = (props: TabContentProps) => {
  const { children, value, index } = props;
  return (
    <div className={classes.tabContent} hidden={value !== index} id={`tabcontent-${index}`}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export const Tabs = (props: TabsProps) => {
  const { tabs } = props;
  const [tabValue, setTabValue] = useState<number>(0);

  const onChangeTab = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabProps = (index: number) => ({
    id: `tab-${index}`,
  });

  const renderTabHeads = () => {
    return (
      <MuiTabs value={tabValue} onChange={onChangeTab}>
        {tabs.map((tabHead) => (
          <Tab
            key={tabHead.id}
            className={classes.tab}
            label={tabHead.label}
            {...tabProps(tabHead.id)}
          />
        ))}
      </MuiTabs>
    );
  };

  const renderTabContent = () => {
    return (
      <Fragment>
        {tabs.map((tabContent) => (
          <TabContent key={tabContent.id} value={tabValue} index={tabContent.id}>
            {tabContent.content}
          </TabContent>
        ))}
      </Fragment>
    );
  };

  return (
    <Container>
      {renderTabHeads()}
      {renderTabContent()}
    </Container>
  );
};
