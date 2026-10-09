import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
} from '@/components/collapsible/Collapsible';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
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
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className={styles.root}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
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
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody>
            <RecoveryKeys />
          </CollapsibleBody>
        </CollapsibleContent>
        <div className={styles.status}>Current state: {open ? 'open' : 'closed'}</div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className={styles.root}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const LazyMount: Story = {
  render: () => (
    <Collapsible lazyMount unmountOnExit className={styles.root}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const PartialCollapse: Story = {
  render: () => (
    <Collapsible collapsedHeight="3rem" className={styles.root}>
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const PartialWidth: Story = {
  render: () => (
    <Collapsible collapsedWidth="8rem" className={styles.root} style={{ width: '18rem' }}>
      <CollapsibleTrigger>
        Read details
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>Additional account-recovery details stay partly visible.</CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const collapsible = useCollapsible();

    return (
      <div className={styles.providerLayout}>
        <output>Current state: {collapsible.open ? 'open' : 'closed'}</output>
        <CollapsibleRootProvider value={collapsible} className={styles.root}>
          <CollapsibleTrigger>
            Recovery keys
            <CollapsibleIndicator />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CollapsibleBody>
              <RecoveryKeys />
            </CollapsibleBody>
          </CollapsibleContent>
        </CollapsibleRootProvider>
      </div>
    );
  },
};

export const CustomComposition: Story = {
  render: () => (
    <Collapsible className={styles.customRoot}>
      <CollapsibleTrigger asChild>
        <button type="button" className={styles.customTrigger}>
          <span className={styles.triggerLabel}>Styled recovery keys</span>
          <CollapsibleIndicator className={styles.customIndicator}>
            <ChevronDownIcon />
          </CollapsibleIndicator>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.customContent}>
        <CollapsibleBody className={styles.customContentBody}>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};