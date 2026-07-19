import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { BellIcon } from '@/icons/demo';
import { Button } from '../button';
import { Popover, usePopover } from './Popover';
import storyStyles from './Popover.stories.module.css';

const meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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
          <span className={storyStyles.triggerContent}>
            <BellIcon className={storyStyles.icon} />
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
      <div className={storyStyles.stack}>
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
      <div className={storyStyles.stack}>
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
            <label className={storyStyles.field}>
              <span>Email</span>
              <input id="popover-email" className={storyStyles.input} />
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
      <div className={storyStyles.stack}>
        <Popover.Anchor asChild>
          <input className={storyStyles.input} placeholder="Popover anchor" />
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
        <Button className={storyStyles.wideTrigger}>Match this trigger width</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className={storyStyles.sameWidthContent}>
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
        <div className={storyStyles.triggerGroup}>
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
          <Popover.Body className={storyStyles.nestedBody}>
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