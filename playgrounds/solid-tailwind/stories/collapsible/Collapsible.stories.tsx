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
    <ul class="m-0 flex flex-col gap-1 ps-0">
      {recoveryKeys.map((key) => (
        <li>{key}</li>
      ))}
    </ul>
  );
}

export const Basic: Story = {
  render: () => (
    <Collapsible class="w-64">
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
    <Collapsible defaultOpen class="w-64">
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
      <Collapsible open={open()} onOpenChange={(details) => setOpen(details.open)} class="w-64">
        <CollapsibleTrigger>
          Recovery keys
          <CollapsibleIndicator />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollapsibleBody>
            <RecoveryKeys />
          </CollapsibleBody>
        </CollapsibleContent>
        <div class="mt-2 text-xs text-muted-foreground">
          Current state: {open() ? 'open' : 'closed'}
        </div>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled class="w-64">
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
    <Collapsible lazyMount unmountOnExit class="w-64">
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
    <Collapsible collapsedHeight="3rem" class="w-64">
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
    <Collapsible collapsedWidth="8rem" class="w-64" style={{ width: '18rem' }}>
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
      <div class="flex flex-col gap-2">
        <output>Current state: {collapsible().open ? 'open' : 'closed'}</output>
        <CollapsibleRootProvider value={collapsible} class="w-64">
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
    <Collapsible class="w-64 text-foreground">
      <CollapsibleTrigger
        asChild={(props) => (
          <button
            {...props()}
            type="button"
            class="flex w-full items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 text-foreground [@media(hover:hover)]:hover:bg-accent"
          />
        )}
      >
        <span class="min-w-0">Styled recovery keys</span>
        <CollapsibleIndicator class="text-primary">
          <ChevronDownIcon />
        </CollapsibleIndicator>
      </CollapsibleTrigger>
      <CollapsibleContent class="text-muted-foreground">
        <CollapsibleBody class="mt-1 rounded-md bg-muted px-3 py-2">
          <RecoveryKeys />
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
  ),
};