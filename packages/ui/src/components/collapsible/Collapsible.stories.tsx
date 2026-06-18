import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Collapsible, useCollapsible } from './Collapsible';
import styles from './Collapsible.stories.module.css';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Collapsible.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];

function RecoveryKeys() {
  return (
    <ul className={styles.keysList}>
      {recoveryKeys.map((key) => (
        <li key={key}>{key}</li>
      ))}
    </ul>
  );
}

export const Basic: Story = {
  render: () => (
    <Collapsible.Root className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible.Root defaultOpen className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Collapsible.Root
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        className={styles.root}
      >
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <RecoveryKeys />
        </Collapsible.Content>
        <div className={styles.status}>Current state: {open ? 'open' : 'closed'}</div>
      </Collapsible.Root>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible.Root disabled className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Collapsible.Root lazyMount unmountOnExit className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};

export const PartialCollapse: Story = {
  render: () => (
    <Collapsible.Root collapsedHeight="3rem" className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <RecoveryKeys />
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const collapsible = useCollapsible();

    return (
      <div className={styles.providerLayout}>
        <output>Current state: {collapsible.open ? 'open' : 'closed'}</output>
        <Collapsible.RootProvider value={collapsible} className={styles.root}>
          <Collapsible.Trigger>
            Recovery keys
            <Collapsible.Indicator />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <RecoveryKeys />
          </Collapsible.Content>
        </Collapsible.RootProvider>
      </div>
    );
  },
};

export const CustomComposition: Story = {
  render: () => (
    <Collapsible.Root className={styles.customRoot}>
      <Collapsible.Trigger asChild>
        <button type="button" className={styles.customTrigger}>
          <span className={styles.triggerLabel}>Styled recovery keys</span>
          <Collapsible.Indicator className={styles.customIndicator}>
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.customContent}>
        <div className={styles.customContentBody}>
          <RecoveryKeys />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  ),
};