import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { clsx } from 'clsx';
import * as React from 'react';
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

const Tabs = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <TabsPrimitive.Root
        ref={ref}
        data-slot="tabs-root"
        data-variant={variant}
        className={mergeClassName(className, styles.root)}
        {...props}
      />
    );
  },
);

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, classNames, children, slotProps, withIndicator = true, ...props }, ref) => {
    return (
      <TabsPrimitive.List
        ref={ref}
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
  },
);

const TabsTab = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Tab>,
  TabsPrimitive.Tab.Props
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Tab
      ref={ref}
      data-slot="tabs-tab"
      className={mergeClassName(className, styles.tab)}
      {...props}
    />
  );
});

const TabsPanel = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Panel>,
  TabsPrimitive.Panel.Props
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Panel
      ref={ref}
      data-slot="tabs-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
});

type TabSpanProps = React.ComponentPropsWithoutRef<'span'>;

const TabsTabContent = React.forwardRef<HTMLSpanElement, TabSpanProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="tabs-tab-content"
        className={clsx(styles.tabContent, className)}
        {...props}
      />
    );
  },
);

const TabsTabIcon = React.forwardRef<HTMLSpanElement, TabSpanProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="tabs-tab-icon"
        className={clsx(styles.tabIcon, className)}
        {...props}
      />
    );
  },
);

const TabsTabLabel = React.forwardRef<HTMLSpanElement, TabSpanProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="tabs-tab-label"
        className={clsx(styles.tabLabel, className)}
        {...props}
      />
    );
  },
);

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTab.displayName = 'TabsTab';
TabsPanel.displayName = 'TabsPanel';
TabsTabContent.displayName = 'TabsTabContent';
TabsTabIcon.displayName = 'TabsTabIcon';
TabsTabLabel.displayName = 'TabsTabLabel';

type TabsValue = TabsPrimitive.Tab.Value;
type TabsTabProps = TabsPrimitive.Tab.Props;
type TabsPanelProps = TabsPrimitive.Panel.Props;
type TabsTabContentProps = TabSpanProps;
type TabsTabIconProps = TabSpanProps;
type TabsTabLabelProps = TabSpanProps;

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