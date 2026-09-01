import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Collapsible, useCollapsible } from '@/components/collapsible/Collapsible';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
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
    <ul class={styles.keysList}>
      {recoveryKeys.map((key) => (
        <li>{key}</li>
      ))}
    </ul>
  );
}

export const Basic: Story = {
  render: () => (
    <Collapsible class={styles.root}>
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
    <Collapsible defaultOpen class={styles.root}>
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
    const [open, setOpen] = createSignal(false);

    return (
      <Collapsible
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
        class={styles.root}
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
        <div class={styles.status}>Current state: {open() ? 'open' : 'closed'}</div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled class={styles.root}>
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
    <Collapsible lazyMount unmountOnExit class={styles.root}>
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
    <Collapsible collapsedHeight="3rem" class={styles.root}>
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

export const PartialWidth: Story = {
  render: () => (
    <Collapsible collapsedWidth="8rem" class={styles.root} style={{ width: '18rem' }}>
      <Collapsible.Trigger>
        Read details
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.Body>
          Additional account-recovery details stay partly visible.
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const collapsible = useCollapsible();

    return (
      <div class={styles.providerLayout}>
        <output>Current state: {collapsible().open ? 'open' : 'closed'}</output>
        <Collapsible.RootProvider value={collapsible} class={styles.root}>
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
    <Collapsible class={styles.customRoot}>
      <Collapsible.Trigger
        asChild={(props) => <button {...props()} class={styles.customTrigger} />}
      >
        <span class={styles.triggerLabel}>Styled recovery keys</span>
        <Collapsible.Indicator class={styles.customIndicator}>
          <ChevronDownIcon />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content class={styles.customContent}>
        <Collapsible.Body class={styles.customContentBody}>
          <RecoveryKeys />
        </Collapsible.Body>
      </Collapsible.Content>
    </Collapsible>
  ),
};