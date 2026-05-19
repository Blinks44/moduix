import type * as React from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Tabs.module.css';

type TabsVariant = 'default' | 'line';

type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
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

function Tabs({ className, variant = 'default', ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs-root"
      data-variant={variant}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
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
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={mergeClassName(className, styles.list)}
      {...props}
    >
      {children}
      {withIndicator ? (
        <TabsPrimitive.Indicator
          {...slotProps?.indicator}
          data-slot="tabs-indicator"
          className={mergeClassName(classNames?.indicator, styles.indicator)}
        />
      ) : null}
    </TabsPrimitive.List>
  );
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={mergeClassName(className, styles.tab)}
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
}

function TabsTabContent({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="tabs-tab-content" className={clsx(styles.tabContent, className)} {...props} />
  );
}

function TabsTabIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="tabs-tab-icon" className={clsx(styles.tabIcon, className)} {...props} />;
}

function TabsTabLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="tabs-tab-label" className={clsx(styles.tabLabel, className)} {...props} />
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