import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  useCollapsible,
} from '@/components/collapsible/Collapsible';
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
    <Collapsible defaultOpen class={styles.root}>
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
    const [open, setOpen] = createSignal(false);

    return (
      <Collapsible
        open={open()}
        onOpenChange={(details) => setOpen(details.open)}
        class={styles.root}
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
        <div class={styles.status}>Current state: {open() ? 'open' : 'closed'}</div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled class={styles.root}>
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
    <Collapsible lazyMount unmountOnExit class={styles.root}>
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
    <Collapsible collapsedHeight="3rem" class={styles.root}>
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
    <Collapsible collapsedWidth="8rem" class={styles.root} style={{ width: '18rem' }}>
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
      <div class={styles.providerLayout}>
        <output>Current state: {collapsible().open ? 'open' : 'closed'}</output>
        <CollapsibleRootProvider value={collapsible} class={styles.root}>
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
    <Collapsible class={styles.customRoot}>
      <CollapsibleTrigger
        asChild={(props) => <button {...props()} type="button" class={styles.customTrigger} />}
      >
        <span class={styles.triggerLabel}>Styled recovery keys</span>
        <CollapsibleIndicator class={styles.customIndicator}>
          <ChevronDownIcon />
        </CollapsibleIndicator>
      </CollapsibleTrigger>
      <CollapsibleContent class={styles.customContent}>
        <CollapsibleBody class={styles.customContentBody}>
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};