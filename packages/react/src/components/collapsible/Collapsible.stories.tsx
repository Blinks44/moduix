import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCollapsible } from '@ark-ui/react/collapsible';
import { useState } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Collapsible } from './Collapsible';
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
    <Collapsible className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Collapsible
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        className={styles.root}
      >
        <Collapsible.Trigger>
          Recovery keys
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.Body>
            <RecoveryKeys />
          </Collapsible.Body>
        </Collapsible.Content>
        <div className={styles.status}>Current state: {open ? 'open' : 'closed'}</div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Collapsible lazyMount unmountOnExit className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const PartialCollapse: Story = {
  render: () => (
    <Collapsible collapsedHeight="3rem" className={styles.root}>
      <Collapsible.Trigger>
        Recovery keys
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
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
            <Collapsible.Body>
              <RecoveryKeys />
            </Collapsible.Body>
          </Collapsible.Content>
        </Collapsible.RootProvider>
      </div>
    );
  },
};

export const CustomComposition: Story = {
  render: () => (
    <Collapsible className={styles.customRoot}>
      <Collapsible.Trigger asChild>
        <button type="button" className={styles.customTrigger}>
          <span className={styles.triggerLabel}>Styled recovery keys</span>
          <Collapsible.Indicator className={styles.customIndicator}>
            <ChevronDownIcon />
          </Collapsible.Indicator>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.customContent}>
        <Collapsible.Body className={styles.customContentBody}>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};