import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { ChevronDownIcon } from '@/primitives';
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  CollapsibleTriggerIcon,
} from './Collapsible';
import styles from './Collapsible.stories.module.css';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

export const Basic: Story = {
  render: () => {
    return (
      <Collapsible className={styles.root}>
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleTriggerIcon />
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </CollapsiblePanel>
      </Collapsible>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => {
    return (
      <Collapsible defaultOpen className={styles.root}>
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleTriggerIcon />
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </CollapsiblePanel>
      </Collapsible>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Collapsible open={open} onOpenChange={setOpen} className={styles.root}>
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleTriggerIcon />
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </CollapsiblePanel>
        <div className={styles.status}>Current state: {open ? 'open' : 'closed'}</div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Collapsible disabled className={styles.root}>
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleTriggerIcon />
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </CollapsiblePanel>
      </Collapsible>
    );
  },
};

export const HiddenUntilFound: Story = {
  render: () => {
    return (
      <Collapsible className={styles.root}>
        <CollapsibleTrigger>
          Searchable recovery keys
          <CollapsibleTriggerIcon />
        </CollapsibleTrigger>
        <CollapsiblePanel hiddenUntilFound>
          <ul className={styles.keysList}>
            {recoveryKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </CollapsiblePanel>
      </Collapsible>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Collapsible className={styles.customRoot}>
        <CollapsibleTrigger className={styles.customTrigger}>
          Styled recovery keys
          <CollapsibleTriggerIcon className={styles.customTriggerIcon}>
            <ChevronDownIcon />
          </CollapsibleTriggerIcon>
        </CollapsibleTrigger>
        <CollapsiblePanel className={styles.customPanel}>
          <div className={styles.customPanelContent}>
            <ul className={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </div>
        </CollapsiblePanel>
      </Collapsible>
    );
  },
};

export const ManualTriggerComposition: Story = {
  render: () => {
    return (
      <Collapsible className={styles.customRoot}>
        <CollapsibleTrigger render={<div />} nativeButton={false} className={styles.customTrigger}>
          <span className={styles.triggerLabel}>Recovery keys</span>
          <CollapsibleTriggerIcon className={styles.customTriggerIcon}>
            <ChevronDownIcon />
          </CollapsibleTriggerIcon>
        </CollapsibleTrigger>
        <CollapsiblePanel className={styles.customPanel}>
          <div className={styles.customPanelContent}>
            <ul className={styles.keysList}>
              {recoveryKeys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </div>
        </CollapsiblePanel>
      </Collapsible>
    );
  },
};