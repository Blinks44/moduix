import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { HandshakeIcon, MapIcon, PresentIcon } from '@/primitives/Icons';
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TabsTabContent,
  TabsTabIcon,
  TabsTabLabel,
} from './Tabs';
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

export const Basic: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview">
        <TabsList>
          {tabItems.map((item) => (
            <TabsTab key={item.value} value={item.value}>
              {item.title}
            </TabsTab>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('projects');

    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          {tabItems.map((item) => (
            <TabsTab key={item.value} value={item.value}>
              {item.title}
            </TabsTab>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" orientation="vertical">
        <TabsList>
          {tabItems.map((item) => (
            <TabsTab key={item.value} value={item.value}>
              {item.title}
            </TabsTab>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const ActivateOnFocus: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview">
        <TabsList activateOnFocus>
          {tabItems.map((item) => (
            <TabsTab key={item.value} value={item.value}>
              {item.title}
            </TabsTab>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const Line: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview" variant="line">
        <TabsList>
          {tabItems.map((item) => (
            <TabsTab key={item.value} value={item.value}>
              {item.title}
            </TabsTab>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const WithoutIndicator: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview">
        <TabsList withIndicator={false}>
          {tabItems.map((item) => (
            <TabsTab key={item.value} value={item.value}>
              {item.title}
            </TabsTab>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const Links: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview">
        <TabsList>
          {tabItems.map((item) => (
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
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p id={item.value} className={styles.panelText}>
              {item.content}
            </p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
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
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value}>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const DisabledTab: Story = {
  render: () => {
    return (
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="projects" disabled>
            Projects
          </TabsTab>
          <TabsTab value="account">Account</TabsTab>
        </TabsList>
        {tabItems.map((item) => (
          <TabsPanel key={item.value} value={item.value} keepMounted>
            <p className={styles.panelText}>{item.content}</p>
          </TabsPanel>
        ))}
      </Tabs>
    );
  },
};

export const InlineInputs: Story = {
  render: () => {
    return (
      <Tabs defaultValue="name" className={styles.inlineRoot}>
        <TabsList
          className={styles.inlineList}
          classNames={{ indicator: styles.inlineIndicator }}
          slotProps={{ indicator: { renderBeforeHydration: true } }}
        >
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
  },
};