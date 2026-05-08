import {
  HandshakeIcon,
  MapIcon,
  PresentIcon,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TabsTabContent,
  TabsTabIcon,
  TabsTabLabel,
  type TabsProps,
  type TabsValue,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './tabs.module.css';

const tabsItems = [
  {
    value: 'overview',
    title: 'Overview',
    content:
      'Review project status, team velocity, workloads and activity highlights in one place.',
  },
  {
    value: 'projects',
    title: 'Projects',
    content: 'Track active workstreams, owners and milestones across all departments.',
  },
  {
    value: 'account',
    title: 'Account',
    content: 'Manage personal settings, team settings, notifications and access preferences.',
  },
];

export const tabsCssProperties: CssPropertyInput[] = [
  ['--tabs-width', '32rem', 'Controls the root tabs width.'],
  ['--tabs-max-width', 'calc(100vw - 2rem)', 'Controls the root tabs max width.'],
  ['--tabs-bg', 'var(--color-background)', 'Controls the root background color.'],
  ['--tabs-border-color', 'var(--color-border)', 'Controls the root border color.'],
  ['--tabs-radius', 'var(--radius-lg)', 'Controls the root border radius.'],
  ['--tabs-color', 'var(--color-foreground)', 'Controls the root text color.'],
  ['--tabs-gap', '0', 'Controls spacing between the tab list and panels.'],
  ['--tabs-list-bg', 'var(--color-muted)', 'Controls the tab list background color.'],
  ['--tabs-list-border-color', 'var(--color-border)', 'Controls the tab list separator color.'],
  ['--tabs-list-gap', '0.25rem', 'Controls spacing between tabs.'],
  ['--tabs-list-padding', '0.25rem', 'Controls the tab list padding.'],
  ['--tabs-list-padding-x', '0.25rem', 'Controls the tab list horizontal padding.'],
  ['--tabs-list-padding-y', '0.25rem', 'Controls the tab list vertical padding.'],
  ['--tabs-tab-height', '2rem', 'Controls each tab height.'],
  ['--tabs-tab-padding-x', '0.625rem', 'Controls each tab horizontal padding.'],
  ['--tabs-tab-radius', 'var(--radius-sm)', 'Controls each tab border radius.'],
  ['--tabs-tab-color', 'var(--color-muted-foreground)', 'Controls inactive tab text color.'],
  ['--tabs-tab-color-active', 'var(--color-foreground)', 'Controls active tab text color.'],
  ['--tabs-tab-color-hover', 'var(--color-foreground)', 'Controls hovered tab text color.'],
  ['--tabs-tab-font-size', 'var(--text-sm)', 'Controls tab text font size.'],
  ['--tabs-tab-font-weight', 'var(--weight-medium)', 'Controls tab text font weight.'],
  ['--tabs-tab-line-height', 'var(--line-height-text-sm)', 'Controls tab text line height.'],
  ['--tabs-tab-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled tab opacity.'],
  ['--tabs-tab-content-gap', '0.5rem', 'Controls spacing between tab icon and label.'],
  ['--tabs-tab-icon-size', '1rem', 'Controls tab icon size.'],
  ['--tabs-tab-icon-color', 'currentColor', 'Controls tab icon color.'],
  ['--tabs-indicator-bg', 'var(--color-background)', 'Controls the default indicator background.'],
  ['--tabs-indicator-size', '1.75rem', 'Controls the default indicator thickness.'],
  ['--tabs-indicator-radius', 'var(--radius-sm)', 'Controls the default indicator radius.'],
  [
    '--tabs-indicator-transition',
    'translate 200ms ease, width 200ms ease',
    'Controls the default indicator movement transition.',
  ],
  ['--tabs-line-indicator-bg', 'var(--color-foreground)', 'Controls the line indicator color.'],
  ['--tabs-line-indicator-size', '2px', 'Controls the line indicator thickness.'],
  ['--tabs-line-indicator-radius', 'var(--radius-full)', 'Controls the line indicator radius.'],
  [
    '--tabs-line-indicator-transition',
    'translate 200ms ease, width 200ms ease',
    'Controls the line indicator movement transition.',
  ],
  ['--tabs-panel-padding', '1rem', 'Controls panel padding.'],
  ['--tabs-panel-color', 'var(--color-foreground)', 'Controls panel text color.'],
  ['--tabs-panel-font-size', 'var(--text-sm)', 'Controls panel text font size.'],
  ['--tabs-panel-line-height', 'var(--line-height-text-sm)', 'Controls panel text line height.'],
  ['--tabs-vertical-list-width', '12rem', 'Controls the list width in vertical orientation.'],
  ['--tabs-vertical-min-height', '14rem', 'Controls the root min-height in vertical orientation.'],
  ['--tabs-focus-ring-color', 'var(--color-ring)', 'Controls tab and panel focus ring color.'],
];

export function TabsExample(props: TabsProps) {
  return (
    <Tabs defaultValue="overview" {...props}>
      <TabsList>
        {tabsItems.map((item) => (
          <TabsTab key={item.value} value={item.value}>
            {item.title}
          </TabsTab>
        ))}
      </TabsList>
      {tabsItems.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

export function ControlledTabsExample() {
  const [value, setValue] = React.useState<TabsValue>('projects');

  return <TabsExample value={value} onValueChange={setValue} />;
}

export function VerticalTabsExample() {
  return <TabsExample orientation="vertical" />;
}

export function ActivateOnFocusTabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList activateOnFocus>
        {tabsItems.map((item) => (
          <TabsTab key={item.value} value={item.value}>
            {item.title}
          </TabsTab>
        ))}
      </TabsList>
      {tabsItems.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

export function LineTabsExample() {
  return <TabsExample variant="line" />;
}

export function WithoutIndicatorTabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList withIndicator={false}>
        {tabsItems.map((item) => (
          <TabsTab key={item.value} value={item.value}>
            {item.title}
          </TabsTab>
        ))}
      </TabsList>
      {tabsItems.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

export function LinkTabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        {tabsItems.map((item) => (
          <TabsTab
            key={item.value}
            value={item.value}
            nativeButton={false}
            render={<a href={`#${item.value}`} />}
          >
            {item.title}
          </TabsTab>
        ))}
      </TabsList>
      {tabsItems.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          <span id={item.value}>{item.content}</span>
        </TabsPanel>
      ))}
    </Tabs>
  );
}

export function IconTabsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTab value="overview">
          <TabsTabContent>
            <TabsTabIcon>
              <HandshakeIcon />
            </TabsTabIcon>
            <TabsTabLabel>Overview</TabsTabLabel>
          </TabsTabContent>
        </TabsTab>
        <TabsTab value="projects">
          <TabsTabContent>
            <TabsTabIcon>
              <PresentIcon />
            </TabsTabIcon>
            <TabsTabLabel>Projects</TabsTabLabel>
          </TabsTabContent>
        </TabsTab>
        <TabsTab value="account">
          <TabsTabContent>
            <TabsTabIcon>
              <MapIcon />
            </TabsTabIcon>
            <TabsTabLabel>Account</TabsTabLabel>
          </TabsTabContent>
        </TabsTab>
      </TabsList>
      {tabsItems.map((item) => (
        <TabsPanel key={item.value} value={item.value}>
          {item.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

export function InlineInputsTabsExample() {
  return (
    <Tabs defaultValue="name" unstyled className={styles.inlineRoot}>
      <TabsList className={styles.inlineList} classNames={{ indicator: styles.inlineIndicator }}>
        <TabsTab value="name" className={styles.inlineTab}>
          Name
        </TabsTab>
        <TabsTab value="email" className={styles.inlineTab}>
          Email
        </TabsTab>
      </TabsList>
      <TabsPanel value="name" className={styles.inlinePanel}>
        <input className={styles.inlineInput} placeholder="Full name" aria-label="Full name" />
      </TabsPanel>
      <TabsPanel value="email" className={styles.inlinePanel}>
        <input className={styles.inlineInput} placeholder="Email" aria-label="Email" />
      </TabsPanel>
    </Tabs>
  );
}