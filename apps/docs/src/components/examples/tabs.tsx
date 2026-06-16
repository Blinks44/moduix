import { clsx } from 'clsx';
import {
  HandshakeIcon,
  MapIcon,
  PresentIcon,
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from 'moduix';
import { useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
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
    content:
      'Track active workstreams, owners and milestones across all departments and align delivery timelines.',
  },
  {
    value: 'account',
    title: 'Account',
    content: 'Manage personal settings, team settings, notifications and access preferences.',
  },
];

export const tabsOverrideCssProperties: CssPropertyInput[] = [
  ['--tabs-bg', 'var(--color-background)', 'Controls the panel background color.'],
  ['--tabs-border-color', 'var(--color-border)', 'Controls the panel border color.'],
  ['--tabs-border-width', 'var(--border-width-sm)', 'Controls the panel border width.'],
  ['--tabs-color', 'var(--color-foreground)', 'Controls the root text color.'],
  ['--tabs-focus-ring-color', 'var(--color-ring)', 'Controls tab and panel focus ring color.'],
  ['--tabs-focus-ring-offset', '0', 'Controls tab focus ring offset.'],
  ['--tabs-focus-ring-width', 'var(--border-width-sm)', 'Controls tab and panel focus ring width.'],
  ['--tabs-gap', '0.75rem', 'Controls spacing between the tab list and panels.'],
  ['--tabs-indicator-bg', 'var(--color-background)', 'Controls the default indicator background.'],
  ['--tabs-indicator-radius', 'var(--radius-sm)', 'Controls the default indicator radius.'],
  ['--tabs-indicator-size', '1.75rem', 'Controls the default indicator thickness.'],
  [
    '--tabs-indicator-transition',
    'translate 200ms ease, width 200ms ease',
    'Controls the default indicator movement transition.',
  ],
  [
    '--tabs-line-indicator-bg',
    'var(--tabs-tab-color-active, var(--color-foreground))',
    'Controls the line indicator color.',
  ],
  ['--tabs-line-indicator-radius', 'var(--radius-full)', 'Controls the line indicator radius.'],
  ['--tabs-line-indicator-size', '2px', 'Controls the line indicator thickness.'],
  [
    '--tabs-line-indicator-transition',
    'translate 200ms ease, width 200ms ease',
    'Controls the line indicator movement transition.',
  ],
  ['--tabs-list-bg', 'var(--color-muted)', 'Controls the tab list background color.'],
  ['--tabs-list-border-color', 'var(--color-border)', 'Controls the tab list border color.'],
  ['--tabs-list-border-width', 'var(--border-width-sm)', 'Controls the tab list border width.'],
  ['--tabs-list-gap', '0.25rem', 'Controls spacing between tabs.'],
  ['--tabs-list-padding', '0.25rem', 'Controls the tab list padding.'],
  [
    '--tabs-list-padding-x',
    'var(--tabs-list-padding, 0.25rem)',
    'Controls the tab list horizontal padding.',
  ],
  [
    '--tabs-list-padding-y',
    'var(--tabs-list-padding, 0.25rem)',
    'Controls the tab list vertical padding.',
  ],
  [
    '--tabs-panel-color',
    'var(--tabs-color, var(--color-foreground))',
    'Controls panel text color.',
  ],
  ['--tabs-panel-font-size', 'var(--text-sm)', 'Controls panel text font size.'],
  ['--tabs-panel-line-height', 'var(--line-height-text-sm)', 'Controls panel text line height.'],
  ['--tabs-panel-focus-ring-offset', '-1px', 'Controls panel focus ring offset.'],
  ['--tabs-panel-padding', '1rem', 'Controls panel padding.'],
  ['--tabs-radius', 'var(--radius-lg)', 'Controls the tab list and panel border radius.'],
  ['--tabs-tab-color', 'var(--color-muted-foreground)', 'Controls inactive tab text color.'],
  ['--tabs-tab-color-active', 'var(--color-foreground)', 'Controls active tab text color.'],
  [
    '--tabs-tab-color-hover',
    'var(--tabs-tab-color-active, var(--color-foreground))',
    'Controls hovered tab text color.',
  ],
  ['--tabs-tab-content-gap', '0.5rem', 'Controls spacing between tab icon and label.'],
  ['--tabs-tab-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled tab opacity.'],
  ['--tabs-tab-font-size', 'var(--text-sm)', 'Controls tab text font size.'],
  ['--tabs-tab-font-weight', 'var(--weight-medium)', 'Controls tab text font weight.'],
  ['--tabs-tab-height', '2rem', 'Controls each tab height.'],
  ['--tabs-tab-icon-size', '1rem', 'Controls tab icon size.'],
  ['--tabs-tab-icon-color', 'currentColor', 'Controls tab icon color.'],
  ['--tabs-tab-line-height', 'var(--line-height-text-sm)', 'Controls tab text line height.'],
  ['--tabs-tab-padding-x', '0.625rem', 'Controls each tab horizontal padding.'],
  ['--tabs-tab-radius', 'var(--radius-sm)', 'Controls each tab border radius.'],
  ['--tabs-tab-transition', 'var(--transition-default)', 'Controls tab text color transition.'],
  ['--tabs-vertical-list-width', '12rem', 'Controls the list width in vertical orientation.'],
];

export function TabsCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable properties={tabsOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function TabsExample(props: ComponentProps<typeof Tabs>) {
  const { className, ...restProps } = props;

  return (
    <Tabs defaultValue="overview" className={clsx(styles.demoRoot, className)} {...restProps}>
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
  const [value, setValue] = useState('projects');

  return <TabsExample value={value} onValueChange={setValue} />;
}

export function VerticalTabsExample() {
  return <TabsExample orientation="vertical" />;
}

export function ActivateOnFocusTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
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

export function LinkTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
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
    <Tabs defaultValue="overview" className={styles.demoRoot}>
      <TabsList>
        <TabsTab value="overview">
          <HandshakeIcon />
          <span>Overview</span>
        </TabsTab>
        <TabsTab value="projects">
          <PresentIcon />
          <span>Projects</span>
        </TabsTab>
        <TabsTab value="account">
          <MapIcon />
          <span>Account</span>
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

export function DisabledTabTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects" disabled>
          Projects
        </TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      {tabsItems.map((item) => (
        <TabsPanel key={item.value} value={item.value} keepMounted>
          {item.content}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

export function InlineInputsTabsExample() {
  return (
    <Tabs defaultValue="name" className={styles.inlineRoot}>
      <TabsList className={styles.inlineList}>
        <TabsTab value="name" className={styles.inlineTab}>
          Name
        </TabsTab>
        <TabsTab value="email" className={styles.inlineTab}>
          Email
        </TabsTab>
        <TabsIndicator className={styles.inlineIndicator} renderBeforeHydration />
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