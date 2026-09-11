import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Button } from '@/components/button';
import { Popover, usePopover, usePopoverContext } from '@/components/popover/Popover';

const stackClass = 'grid justify-items-center gap-3';
const triggerGroupClass = 'flex flex-wrap justify-center gap-2';
const triggerContentClass = 'inline-flex items-center gap-2';
const iconClass = 'size-4';
const fieldClass = 'mt-3 grid gap-2 text-sm';
const inputClass =
  'min-h-control-lg min-w-64 rounded-md border border-border bg-background px-3 text-foreground';
const wideTriggerClass = 'w-80';
const nestedBodyClass = 'mt-3';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

function BellIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 1a1 1 0 0 0-1 1v1.14A4 4 0 0 0 4 7v3.98s-.02.28-.15.54C3.72 11.78 3.56 12 3 12v1h10v-1c-.6 0-.75-.22-.87-.47-.13-.25-.13-.52-.13-.53V7a4 4 0 0 0-3-3.86V2a1 1 0 0 0-1-1Zm0 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

const popoverActions = [
  {
    id: 'share',
    label: 'Share',
    detail: 'Share this item with others by link or email.',
  },
  {
    id: 'export',
    label: 'Export',
    detail: 'Export this item as PDF, CSV, or JSON.',
  },
  {
    id: 'archive',
    label: 'Archive',
    detail: 'Move this item to the archive for later reference.',
  },
];

function PopoverSurface({
  title,
  description,
  arrow = false,
}: {
  title: string;
  description: string;
  arrow?: boolean;
}) {
  return (
    <Popover.Positioner>
      <Popover.Content>
        {arrow ? <Popover.Arrow /> : null}
        <Popover.Header>
          <Popover.Title>{title}</Popover.Title>
          <Popover.Description>{description}</Popover.Description>
        </Popover.Header>
        <Popover.Footer>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Footer>
      </Popover.Content>
    </Popover.Positioner>
  );
}

export const Basic: Story = {
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>
          <span className={triggerContentClass}>
            <BellIcon className={iconClass} />
            Notifications
          </span>
        </Button>
      </Popover.Trigger>
      <PopoverSurface title="Notifications" description="You are all caught up. Good job!" />
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className={stackClass}>
        <span>Popover is {open ? 'open' : 'closed'}</span>
        <Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
          <Popover.Trigger asChild>
            <Button>Open controlled popover</Button>
          </Popover.Trigger>
          <PopoverSurface
            title="Publish changes?"
            description="This action will make your latest updates visible to all users."
          />
        </Popover>
      </div>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });

    return (
      <div className={stackClass}>
        <span>Popover is {popover.open ? 'open' : 'closed'}</span>
        <Button variant="outline" onClick={() => popover.setOpen(!popover.open)}>
          Toggle externally
        </Button>
        <Popover.RootProvider value={popover}>
          <Popover.Trigger asChild>
            <Button>Open from trigger</Button>
          </Popover.Trigger>
          <PopoverSurface
            title="External state"
            description="The usePopover hook owns this popover state."
          />
        </Popover.RootProvider>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => {
    function PopoverState() {
      const popover = usePopoverContext();
      return <output>Popover is {popover.open ? 'open' : 'closed'}</output>;
    }

    return (
      <Popover positioning={{ gutter: 8 }}>
        <Popover.Trigger asChild>
          <Button>Open context example</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>Context state</Popover.Title>
              <Popover.Description>
                Read the popover state from a descendant without prop drilling.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <PopoverState />
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open with arrow</Button>
      </Popover.Trigger>
      <PopoverSurface
        arrow
        title="With arrow"
        description="Arrow and ArrowTip use Ark positioning variables."
      />
    </Popover>
  ),
};

export const Positioning: Story = {
  render: () => (
    <Popover positioning={{ placement: 'left', gutter: 12 }}>
      <Popover.Trigger asChild>
        <Button>Open on the left</Button>
      </Popover.Trigger>
      <PopoverSurface
        title="Left placement"
        description="Placement and offsets belong to Root.positioning."
      />
    </Popover>
  ),
};

export const LazyMount: Story = {
  name: 'Lazy Mount',
  render: () => (
    <Popover lazyMount unmountOnExit positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open lazy popover</Button>
      </Popover.Trigger>
      <PopoverSurface
        title="Lazy mounted"
        description="This content mounts on open and unmounts after exit."
      />
    </Popover>
  ),
};

export const CloseBehavior: Story = {
  name: 'Close Behavior',
  render: () => (
    <Popover closeOnEscape={false} closeOnInteractOutside={false}>
      <Popover.Trigger asChild>
        <Button>Open persistent popover</Button>
      </Popover.Trigger>
      <PopoverSurface
        title="Explicit close"
        description="Escape and outside interactions do not dismiss this popover."
      />
    </Popover>
  ),
};

export const Modal: Story = {
  render: () => (
    <Popover modal initialFocusEl={() => document.querySelector('#popover-email')}>
      <Popover.Trigger asChild>
        <Button>Invite teammates</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseIcon />
          <Popover.Header>
            <Popover.Title>Invite teammates</Popover.Title>
            <Popover.Description>
              Focus is trapped inside this modal popover until dismissed.
            </Popover.Description>
          </Popover.Header>
          <Popover.Body>
            <label className={fieldClass}>
              <span>Email</span>
              <input id="popover-email" className={inputClass} />
            </label>
          </Popover.Body>
          <Popover.Footer>
            <Popover.CloseTrigger>Done</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ),
};

export const Anchor: Story = {
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <div className={stackClass}>
        <Popover.Anchor asChild>
          <input className={inputClass} placeholder="Popover anchor" />
        </Popover.Anchor>
        <Popover.Trigger asChild>
          <Button>Open below the input</Button>
        </Popover.Trigger>
      </div>
      <PopoverSurface
        title="Custom anchor"
        description="The popup is positioned relative to the input instead of the trigger."
      />
    </Popover>
  ),
};

export const SameWidth: Story = {
  name: 'Same Width',
  render: () => (
    <Popover positioning={{ sameWidth: true, gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button className={wideTriggerClass}>Match this trigger width</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Matched width</Popover.Title>
          <Popover.Description>
            The content uses Ark&apos;s reference width measurement.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ),
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const [activeItem, setActiveItem] = React.useState<(typeof popoverActions)[number] | null>(
      null,
    );

    return (
      <Popover
        onTriggerValueChange={(details) => {
          setActiveItem(popoverActions.find((item) => item.id === details.value) ?? null);
        }}
        positioning={{ gutter: 8 }}
      >
        <div className={triggerGroupClass}>
          {popoverActions.map((item) => (
            <Popover.Trigger key={item.id} value={item.id}>
              {item.label}
            </Popover.Trigger>
          ))}
        </div>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>{activeItem?.label ?? 'Select an action'}</Popover.Title>
            <Popover.Description>
              {activeItem?.detail ?? 'Choose one of the actions.'}
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    );
  },
};

export const Nested: Story = {
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open settings</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Settings</Popover.Title>
            <Popover.Description>Nested popovers keep independent state.</Popover.Description>
          </Popover.Header>
          <Popover.Body className={nestedBodyClass}>
            <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
              <Popover.Trigger asChild>
                <Button variant="outline">Advanced</Button>
              </Popover.Trigger>
              <PopoverSurface
                title="Advanced settings"
                description="This content belongs to the nested popover."
              />
            </Popover>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  ),
};