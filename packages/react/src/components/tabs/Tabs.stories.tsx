import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTabs } from '@ark-ui/react/tabs';
import * as React from 'react';
import { HandshakeIcon, MapIcon, PresentIcon } from '@/icons/demo';
import { Tabs } from './Tabs';
import styles from './Tabs.stories.module.css';

const meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const tabItems = [
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

function TabsStoryContent() {
  return (
    <>
      <Tabs.List>
        {tabItems.map((item) => (
          <Tabs.Trigger key={item.value} value={item.value}>
            {item.title}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {tabItems.map((item) => (
        <Tabs.Content key={item.value} value={item.value}>
          <p className={styles.panelText}>{item.content}</p>
        </Tabs.Content>
      ))}
    </>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" className={styles.demoRoot}>
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('projects');

    return (
      <Tabs
        value={value}
        onValueChange={(details) => setValue(details.value)}
        className={styles.demoRoot}
      >
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" orientation="vertical" className={styles.demoRoot}>
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const ManualActivation: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" activationMode="manual" className={styles.demoRoot}>
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const Indicator: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" className={styles.demoRoot}>
        <Tabs.List>
          {tabItems.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.title}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        {tabItems.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </Tabs.Content>
        ))}
      </Tabs>
    );
  },
};

export const Line: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" variant="line" className={styles.demoRoot}>
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const Links: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" className={styles.demoRoot}>
        <Tabs.List>
          {tabItems.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value} asChild>
              <a href={`#${item.value}`}>{item.title}</a>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabItems.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <p id={item.value} className={styles.panelText}>
              {item.content}
            </p>
          </Tabs.Content>
        ))}
      </Tabs>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
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
        {tabItems.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </Tabs.Content>
        ))}
      </Tabs>
    );
  },
};

export const DisabledTab: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" className={styles.demoRoot}>
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="projects" disabled>
            Projects
          </Tabs.Trigger>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
        </Tabs.List>
        {tabItems.map((item) => (
          <Tabs.Content key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </Tabs.Content>
        ))}
      </Tabs>
    );
  },
};

export const LazyMount: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" lazyMount unmountOnExit className={styles.demoRoot}>
        <TabsStoryContent />
      </Tabs>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const tabs = useTabs({ defaultValue: 'overview' });

    return (
      <div className={styles.providerStack}>
        <output>selected: {tabs.value}</output>
        <Tabs.RootProvider value={tabs} className={styles.demoRoot}>
          <TabsStoryContent />
        </Tabs.RootProvider>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Tabs defaultValue="name" className={styles.inlineRoot}>
        <Tabs.List className={styles.inlineList}>
          <Tabs.Trigger value="name" className={styles.inlineTrigger}>
            Name
          </Tabs.Trigger>
          <Tabs.Trigger value="email" className={styles.inlineTrigger}>
            Email
          </Tabs.Trigger>
          <Tabs.Indicator className={styles.inlineIndicator} />
        </Tabs.List>
        <Tabs.Content value="name" className={styles.inlineContent}>
          <input className={styles.inlineInput} placeholder="Full name" aria-label="Full name" />
        </Tabs.Content>
        <Tabs.Content value="email" className={styles.inlineContent}>
          <input className={styles.inlineInput} placeholder="Email" aria-label="Email" />
        </Tabs.Content>
      </Tabs>
    );
  },
};