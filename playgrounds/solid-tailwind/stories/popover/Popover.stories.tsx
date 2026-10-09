import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
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

const stackClass = 'grid justify-items-center gap-3';
const triggerGroupClass = 'flex flex-wrap justify-center gap-2';
const triggerContentClass = 'inline-flex items-center gap-2';
const iconClass = 'size-4';
const fieldClass = 'mt-3 grid gap-2 text-sm';
const inputClass =
  'min-h-control-lg min-w-64 rounded-md border border-border bg-background px-3 text-foreground';
const wideTriggerClass = 'w-80';
const nestedBodyClass = 'mt-3';

const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

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

function BellIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" {...accessibilityProps} {...props}>
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

function PopoverSurface(props: { title: string; description: string; arrow?: boolean }) {
  return (
    <PopoverPositioner>
      <PopoverContent>
        {props.arrow ? <PopoverArrow /> : null}
        <PopoverHeader>
          <PopoverTitle>{props.title}</PopoverTitle>
          <PopoverDescription>{props.description}</PopoverDescription>
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
      <PopoverTrigger
        asChild={(triggerProps) => (
          <Button {...triggerProps()}>
            <span class={triggerContentClass}>
              <BellIcon class={iconClass} />
              Notifications
            </span>
          </Button>
        )}
      />
      <PopoverSurface title="Notifications" description="You are all caught up. Good job!" />
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = createSignal(false);

    return (
      <div class={stackClass}>
        <span>Popover is {open() ? 'open' : 'closed'}</span>
        <Popover open={open()} onOpenChange={(details) => setOpen(details.open)}>
          <PopoverTrigger
            asChild={(triggerProps) => <Button {...triggerProps()}>Open controlled popover</Button>}
          />
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
      <div class={stackClass}>
        <span>Popover is {popover().open ? 'open' : 'closed'}</span>
        <Button variant="outline" onClick={() => popover().setOpen(!popover().open)}>
          Toggle externally
        </Button>
        <PopoverRootProvider value={popover}>
          <PopoverTrigger
            asChild={(triggerProps) => <Button {...triggerProps()}>Open from trigger</Button>}
          />
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
      return <output>Popover is {popover().open ? 'open' : 'closed'}</output>;
    }

    return (
      <Popover positioning={{ gutter: 8 }}>
        <PopoverTrigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open context example</Button>}
        />
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
      <PopoverTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open with arrow</Button>}
      />
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
      <PopoverTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open on the left</Button>}
      />
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
      <PopoverTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open lazy popover</Button>}
      />
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
      <PopoverTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open persistent popover</Button>}
      />
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
      <PopoverTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Invite teammates</Button>}
      />
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
            <label class={fieldClass}>
              <span>Email</span>
              <input id="popover-email" class={inputClass} />
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
      <div class={stackClass}>
        <PopoverAnchor
          asChild={(props) => (
            <input {...props()} class={inputClass} placeholder="Popover anchor" />
          )}
        />
        <PopoverTrigger
          asChild={(triggerProps) => <Button {...triggerProps()}>Open below the input</Button>}
        />
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
      <PopoverTrigger
        class={wideTriggerClass}
        asChild={(triggerProps) => <Button {...triggerProps()}>Match this trigger width</Button>}
      />
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
    const [activeItem, setActiveItem] = createSignal<(typeof popoverActions)[number] | null>(null);

    return (
      <Popover
        onTriggerValueChange={(details) => {
          setActiveItem(popoverActions.find((item) => item.id === details.value) ?? null);
        }}
        positioning={{ gutter: 8 }}
      >
        <div class={triggerGroupClass}>
          {popoverActions.map((item) => (
            <PopoverTrigger value={item.id}>{item.label}</PopoverTrigger>
          ))}
        </div>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverTitle>{activeItem()?.label ?? 'Select an action'}</PopoverTitle>
            <PopoverDescription>
              {activeItem()?.detail ?? 'Choose one of the actions.'}
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
      <PopoverTrigger
        asChild={(triggerProps) => <Button {...triggerProps()}>Open settings</Button>}
      />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Settings</PopoverTitle>
            <PopoverDescription>Nested popovers keep independent state.</PopoverDescription>
          </PopoverHeader>
          <PopoverBody class={nestedBodyClass}>
            <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
              <PopoverTrigger
                asChild={(triggerProps) => (
                  <Button {...triggerProps()} variant="outline">
                    Advanced
                  </Button>
                )}
              />
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