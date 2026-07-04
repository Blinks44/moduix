import { useTabs } from '@ark-ui/react/tabs';
import { Tabs } from '@moduix/react';
import { clsx } from 'clsx';
import { Handshake as HandshakeIcon, Map as MapIcon, Gift as PresentIcon } from 'lucide-react';
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

export const tabsItemsData = `const items = [
  {
    value: "overview",
    title: "Overview",
    content:
      "Review project status, team velocity, workloads and activity highlights in one place.",
  },
  {
    value: "projects",
    title: "Projects",
    content:
      "Track active workstreams, owners and milestones across all departments and align delivery timelines.",
  },
  {
    value: "account",
    title: "Account",
    content: "Manage personal settings, team settings, notifications and access preferences.",
  },
];`;

export const tabsExampleCss = `.tabs-demo {
  width: 22rem;
}

@media (min-width: 32rem) {
  .tabs-demo {
    width: 32rem;
  }
}`;

export const tabsOverrideCssProperties: CssPropertyInput[] = [
  ['--tabs-bg', 'var(--color-background)', 'Controls the content background color.'],
  ['--tabs-border-color', 'var(--color-border)', 'Controls the content border color.'],
  ['--tabs-border-width', 'var(--border-width-sm)', 'Controls the content border width.'],
  ['--tabs-color', 'var(--color-foreground)', 'Controls the root text color.'],
  [
    '--tabs-focus-ring-color',
    'var(--color-ring)',
    'Controls trigger and content focus ring color.',
  ],
  ['--tabs-focus-ring-offset', '0', 'Controls trigger focus ring offset.'],
  [
    '--tabs-focus-ring-width',
    'var(--border-width-sm)',
    'Controls trigger and content focus ring width.',
  ],
  ['--tabs-gap', '0.75rem', 'Controls spacing between the tab list and content.'],
  ['--tabs-indicator-bg', 'var(--color-background)', 'Controls the indicator background.'],
  ['--tabs-indicator-radius', 'var(--radius-md)', 'Controls the indicator radius.'],
  ['--tabs-indicator-shadow', 'var(--shadow-sm)', 'Controls the filled indicator shadow.'],
  ['--tabs-indicator-size', '2rem', 'Controls the filled indicator thickness.'],
  [
    '--tabs-indicator-transition',
    'var(--transition-default)',
    'Controls the filled indicator movement transition.',
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
    'var(--transition-default)',
    'Controls the line indicator movement transition.',
  ],
  ['--tabs-list-bg', 'var(--color-muted)', 'Controls the tab list background color.'],
  ['--tabs-list-border-color', 'var(--color-border)', 'Controls the tab list border color.'],
  ['--tabs-list-border-width', 'var(--border-width-sm)', 'Controls the tab list border width.'],
  ['--tabs-list-gap', '0.25rem', 'Controls spacing between triggers.'],
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
    'Controls content text color.',
  ],
  ['--tabs-panel-font-size', 'var(--text-sm)', 'Controls content text font size.'],
  ['--tabs-panel-line-height', 'var(--line-height-text-sm)', 'Controls content line height.'],
  ['--tabs-panel-focus-ring-offset', '-1px', 'Controls content focus ring offset.'],
  ['--tabs-panel-padding', '1rem', 'Controls content padding.'],
  ['--tabs-radius', 'var(--radius-lg)', 'Controls the tab list and content border radius.'],
  ['--tabs-tab-color', 'var(--color-muted-foreground)', 'Controls inactive trigger text color.'],
  ['--tabs-tab-color-active', 'var(--color-foreground)', 'Controls selected trigger text color.'],
  [
    '--tabs-tab-color-hover',
    'var(--tabs-tab-color-active, var(--color-foreground))',
    'Controls hovered trigger text color.',
  ],
  ['--tabs-tab-content-gap', '0.5rem', 'Controls spacing between trigger icon and label.'],
  ['--tabs-tab-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--tabs-tab-font-size', 'var(--text-sm)', 'Controls trigger text font size.'],
  ['--tabs-tab-font-weight', 'var(--weight-medium)', 'Controls trigger text font weight.'],
  ['--tabs-tab-height', '2rem', 'Controls each trigger height.'],
  ['--tabs-tab-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--tabs-tab-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--tabs-tab-line-height', 'var(--line-height-text-sm)', 'Controls trigger text line height.'],
  ['--tabs-tab-padding-x', '0.625rem', 'Controls each trigger horizontal padding.'],
  ['--tabs-tab-radius', 'var(--radius-md)', 'Controls each trigger border radius.'],
  ['--tabs-tab-transition', 'var(--transition-default)', 'Controls trigger text color transition.'],
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

function TabsItems() {
  return (
    <>
      <Tabs.List>
        {tabsItems.map((item) => (
          <Tabs.Trigger key={item.value} value={item.value}>
            {item.title}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {tabsItems.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </>
  );
}

export function TabsExample(props: ComponentProps<typeof Tabs>) {
  const { className, ...restProps } = props;

  return (
    <Tabs defaultValue="overview" className={clsx(styles.demoRoot, className)} {...restProps}>
      <TabsItems />
    </Tabs>
  );
}

export function ControlledTabsExample() {
  const [value, setValue] = useState('projects');

  return (
    <TabsExample
      value={value}
      onValueChange={(details) => {
        setValue(details.value);
      }}
    />
  );
}

export function VerticalTabsExample() {
  return <TabsExample orientation="vertical" />;
}

export function ManualActivationTabsExample() {
  return <TabsExample activationMode="manual" />;
}

export function IndicatorTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
      <Tabs.List>
        {tabsItems.map((item) => (
          <Tabs.Trigger key={item.value} value={item.value}>
            {item.title}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {tabsItems.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}

export function LazyMountTabsExample() {
  return (
    <Tabs defaultValue="overview" lazyMount unmountOnExit className={styles.demoRoot}>
      <TabsItems />
    </Tabs>
  );
}

export function LineTabsExample() {
  return <TabsExample variant="line" />;
}

export function LinkTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
      <Tabs.List>
        {tabsItems.map((item) => (
          <Tabs.Trigger key={item.value} value={item.value} asChild>
            <a href={`#${item.value}`}>{item.title}</a>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabsItems.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          <span id={item.value}>{item.content}</span>
        </Tabs.Content>
      ))}
    </Tabs>
  );
}

export function IconTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
      <Tabs.List>
        <Tabs.Trigger value="overview">
          <HandshakeIcon />
          <span>Overview</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          <PresentIcon />
          <span>Projects</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="account">
          <MapIcon />
          <span>Account</span>
        </Tabs.Trigger>
      </Tabs.List>
      {tabsItems.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}

export function DisabledTabTabsExample() {
  return (
    <Tabs defaultValue="overview" className={styles.demoRoot}>
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="projects" disabled>
          Projects
        </Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
      </Tabs.List>
      {tabsItems.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}

export function RootProviderTabsExample() {
  const tabs = useTabs({ defaultValue: 'overview' });

  return (
    <div className={styles.providerStack}>
      <output>selected: {tabs.value}</output>
      <Tabs.RootProvider value={tabs} className={styles.demoRoot}>
        <TabsItems />
      </Tabs.RootProvider>
    </div>
  );
}