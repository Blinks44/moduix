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
    <ul className="m-0 flex flex-col gap-1 ps-0">
      {recoveryKeys.map((key) => (
        <li key={key}>{key}</li>
      ))}
    </ul>
  );
}

export const Basic: Story = {
  render: () => (
    <Collapsible className="w-64">
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
    <Collapsible defaultOpen className="w-64">
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
      <Collapsible open={open} onOpenChange={(details) => setOpen(details.open)} className="w-64">
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody>
            <RecoveryKeys />
          </CollapsibleBody>
        </CollapsibleContent>
        <div className="mt-2 text-xs text-muted-foreground">
          Current state: {open ? 'open' : 'closed'}
        </div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="w-64">
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
    <Collapsible lazyMount unmountOnExit className="w-64">
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
    <Collapsible collapsedHeight="3rem" className="w-64">
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
    <Collapsible collapsedWidth="8rem" className="w-64" style={{ width: '18rem' }}>
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
      <div className="flex flex-col gap-2">
        <output>Current state: {collapsible.open ? 'open' : 'closed'}</output>
        <CollapsibleRootProvider value={collapsible} className="w-64">
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
    <Collapsible className="w-64 text-foreground">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 text-foreground [@media(hover:hover)]:hover:bg-accent"
        >
          <span className="min-w-0">Styled recovery keys</span>
          <CollapsibleIndicator className="text-primary">
            <ChevronDownIcon />
          </CollapsibleIndicator>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="text-muted-foreground">
        <CollapsibleBody className="mt-1 rounded-md bg-muted px-3 py-2">
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};