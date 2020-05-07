/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useMemo, useContext, createContext } from 'react';
import {
  useTabState,
  Tab as BaseTab,
  TabList as BaseTabList,
  TabPanel as BaseTabPanel,
  TabStateReturn,
  TabInitialState,
} from 'reakit/Tab';

const TabsContext = createContext<TabStateReturn>(undefined as any);

export const Tabs: React.FC<TabInitialState> = ({
  children,
  ...initialState
}: React.PropsWithChildren<TabInitialState>) => {
  const tab = useTabState(initialState);
  const value = useMemo(() => tab, Object.values(tab));
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export const Tab: React.FC = (props) => {
  const tab = useContext<TabStateReturn>(TabsContext);
  return <BaseTab {...tab} {...props} />;
};
export const TabList: React.FC = (props) => {
  const tab = useContext<TabStateReturn>(TabsContext);
  return <BaseTabList {...tab} {...props} />;
};
export const TabPanel: React.FC = (props) => {
  const tab = useContext<TabStateReturn>(TabsContext);
  return <BaseTabPanel {...tab} {...props} />;
};
