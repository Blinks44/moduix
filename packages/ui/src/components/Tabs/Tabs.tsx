import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Tabs.module.css';

type TabsVariant = 'default' | 'line';

type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
  unstyled?: boolean;
};

type TabsListClassNames = {
  indicator?: TabsPrimitive.Indicator.Props['className'];
};

type TabsListSlotProps = {
  indicator?: Omit<TabsPrimitive.Indicator.Props, 'className' | 'children'>;
};

type TabsListProps = TabsPrimitive.List.Props & {
  classNames?: TabsListClassNames;
  slotProps?: TabsListSlotProps;
  withIndicator?: boolean;
};

const TabsStyleContext = React.createContext(false);

function Tabs({ className, variant = 'default', unstyled = false, ...props }: TabsProps) {
  return (
    <TabsStyleContext.Provider value={unstyled}>
      <TabsPrimitive.Root
        data-slot="tabs-root"
        data-variant={variant}
        className={unstyled ? className : mergeClassName(className, styles.root)}
        {...props}
      />
    </TabsStyleContext.Provider>
  );
}

function TabsList({
  className,
  classNames,
  children,
  slotProps,
  withIndicator = true,
  ...props
}: TabsListProps) {
  const unstyled = React.useContext(TabsStyleContext);

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={unstyled ? className : mergeClassName(className, styles.list)}
      {...props}
    >
      {children}
      {withIndicator ? (
        <TabsPrimitive.Indicator
          {...slotProps?.indicator}
          data-slot="tabs-indicator"
          className={
            unstyled
              ? classNames?.indicator
              : mergeClassName(classNames?.indicator, styles.indicator)
          }
        />
      ) : null}
    </TabsPrimitive.List>
  );
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  const unstyled = React.useContext(TabsStyleContext);

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={unstyled ? className : mergeClassName(className, styles.tab)}
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  const unstyled = React.useContext(TabsStyleContext);

  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={unstyled ? className : mergeClassName(className, styles.panel)}
      {...props}
    />
  );
}

function TabsTabContent({ className, ...props }: React.ComponentProps<'span'>) {
  const unstyled = React.useContext(TabsStyleContext);

  return (
    <span
      data-slot="tabs-tab-content"
      className={unstyled ? className : clsx(styles.tabContent, className)}
      {...props}
    />
  );
}

function TabsTabIcon({ className, ...props }: React.ComponentProps<'span'>) {
  const unstyled = React.useContext(TabsStyleContext);

  return (
    <span
      data-slot="tabs-tab-icon"
      className={unstyled ? className : clsx(styles.tabIcon, className)}
      {...props}
    />
  );
}

function TabsTabLabel({ className, ...props }: React.ComponentProps<'span'>) {
  const unstyled = React.useContext(TabsStyleContext);

  return (
    <span
      data-slot="tabs-tab-label"
      className={unstyled ? className : clsx(styles.tabLabel, className)}
      {...props}
    />
  );
}

type TabsValue = TabsPrimitive.Tab.Value;
type TabsTabProps = TabsPrimitive.Tab.Props;
type TabsPanelProps = TabsPrimitive.Panel.Props;
type TabsTabContentProps = React.ComponentProps<'span'>;
type TabsTabIconProps = React.ComponentProps<'span'>;
type TabsTabLabelProps = React.ComponentProps<'span'>;

export { Tabs, TabsList, TabsTab, TabsPanel, TabsTabContent, TabsTabIcon, TabsTabLabel };

export type {
  TabsValue,
  TabsProps,
  TabsVariant,
  TabsListClassNames,
  TabsListSlotProps,
  TabsListProps,
  TabsTabProps,
  TabsPanelProps,
  TabsTabContentProps,
  TabsTabIconProps,
  TabsTabLabelProps,
};