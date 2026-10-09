import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Button } from '@/components/button';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
  usePopover,
  usePopoverContext,
} from '@/components/popover/Popover';
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
    <PopoverPositioner>
      <PopoverContent>
        {arrow ? <PopoverArrow /> : null}
        <PopoverHeader>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <PopoverCloseTrigger>Close</PopoverCloseTrigger>
        </PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  );
}

export const Basic: Story = {
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild>
        <Button>
          <span className={storyStyles.triggerContent}>
            <BellIcon className={storyStyles.icon} />
            Notifications
          </span>
        </Button>
      </PopoverTrigger>
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
          <PopoverTrigger asChild>
            <Button>Open controlled popover</Button>
          </PopoverTrigger>
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
        <PopoverRootProvider value={popover}>
          <PopoverTrigger asChild>
            <Button>Open from trigger</Button>
          </PopoverTrigger>
          <PopoverSurface
            title="External state"
            description="The usePopover hook owns this popover state."
          />
        </PopoverRootProvider>
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
        <PopoverTrigger asChild>
          <Button>Open context example</Button>
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Context state</PopoverTitle>
              <PopoverDescription>
                Read the popover state from a descendant without prop drilling.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverState />
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverFooter>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild>
        <Button>Open with arrow</Button>
      </PopoverTrigger>
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
      <PopoverTrigger asChild>
        <Button>Open on the left</Button>
      </PopoverTrigger>
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
      <PopoverTrigger asChild>
        <Button>Open lazy popover</Button>
      </PopoverTrigger>
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
      <PopoverTrigger asChild>
        <Button>Open persistent popover</Button>
      </PopoverTrigger>
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
      <PopoverTrigger asChild>
        <Button>Invite teammates</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverCloseIcon />
          <PopoverHeader>
            <PopoverTitle>Invite teammates</PopoverTitle>
            <PopoverDescription>
              Focus is trapped inside this modal popover until dismissed.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverBody>
            <label className={storyStyles.field}>
              <span>Email</span>
              <input id="popover-email" className={storyStyles.input} />
            </label>
          </PopoverBody>
          <PopoverFooter>
            <PopoverCloseTrigger>Done</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ),
};

export const Anchor: Story = {
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <div className={storyStyles.stack}>
        <PopoverAnchor asChild>
          <input className={storyStyles.input} placeholder="Popover anchor" />
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <Button>Open below the input</Button>
        </PopoverTrigger>
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
      <PopoverTrigger asChild>
        <Button className={storyStyles.wideTrigger}>Match this trigger width</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Matched width</PopoverTitle>
          <PopoverDescription>
            The content uses Ark&apos;s reference width measurement.
          </PopoverDescription>
        </PopoverContent>
      </PopoverPositioner>
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
            <PopoverTrigger key={item.id} value={item.id}>
              {item.label}
            </PopoverTrigger>
          ))}
        </div>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverTitle>{activeItem?.label ?? 'Select an action'}</PopoverTitle>
            <PopoverDescription>
              {activeItem?.detail ?? 'Choose one of the actions.'}
            </PopoverDescription>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    );
  },
};

export const Nested: Story = {
  render: () => (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild>
        <Button>Open settings</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Settings</PopoverTitle>
            <PopoverDescription>Nested popovers keep independent state.</PopoverDescription>
          </PopoverHeader>
          <PopoverBody className={storyStyles.nestedBody}>
            <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
              <PopoverTrigger asChild>
                <Button variant="outline">Advanced</Button>
              </PopoverTrigger>
              <PopoverSurface
                title="Advanced settings"
                description="This content belongs to the nested popover."
              />
            </Popover>
          </PopoverBody>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  ),
};