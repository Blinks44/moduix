import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Button } from '@/components/button';
import {
  Tooltip,
  useTooltip,
  useTooltipContext,
  TooltipArrow,
  TooltipBody,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import { PlusIcon } from '@/lib/moduix/icons/ui';

const meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;
type IconProps = ComponentProps<'svg'>;

function ShareIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 2v13" />
      <path d="m16 6-4-4-4 4" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    </svg>
  );
}

function BellIcon(props: IconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 1a1 1 0 0 0-1 1v1.14A4 4 0 0 0 4 7v3.98s-.02.28-.15.54C3.72 11.78 3.56 12 3 12v1h10v-1c-.6 0-.75-.22-.87-.47-.13-.25-.13-.52-.13-.53V7a4 4 0 0 0-3-3.86V2a1 1 0 0 0-1-1Zm0 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tooltipPlacements = ['top', 'right', 'bottom', 'left'] as const;
type TooltipPlacement = (typeof tooltipPlacements)[number];

const tooltipTools = [
  { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: PlusIcon },
  { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: ShareIcon },
  { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: InfoIcon },
];

export const Default: Story = {
  name: 'Default',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger asChild aria-label="Notifications">
          <Button>
            <span className="inline-flex items-center gap-2">
              <BellIcon className="size-4" />
              Notifications
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipBody>Notifications</TooltipBody>
      </Tooltip>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Tooltip with arrow">Hover or focus</TooltipTrigger>
        <TooltipBody>
          <TooltipArrow />
          Tooltip with arrow
        </TooltipBody>
      </Tooltip>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <Tooltip closeDelay={0} openDelay={0}>
        <TooltipTrigger>Immediate tooltip</TooltipTrigger>
        <TooltipBody>No open or close delay</TooltipBody>
      </Tooltip>
    );
  },
};

export const DisabledTrigger: Story = {
  name: 'Disabled Trigger',
  render: () => {
    return (
      <Tooltip>
        <TooltipDisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>
    );
  },
};

export const Positioning: Story = {
  render: () => {
    const [placement, setPlacement] = useState<TooltipPlacement>('top');

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex flex-wrap items-center gap-1 rounded-md border border-border bg-muted p-1">
          {tooltipPlacements.map((item) => (
            <button
              key={item}
              type="button"
              className="min-h-8 min-w-19 cursor-pointer rounded-sm border border-border bg-background px-3 text-sm leading-5 font-medium text-foreground capitalize transition-[background-color,color] duration-200 hover:bg-accent data-[active]:bg-primary data-[active]:text-primary-foreground"
              data-active={item === placement ? '' : undefined}
              onClick={() => setPlacement(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <Tooltip positioning={{ placement, offset: { mainAxis: 12 } }}>
          <TooltipTrigger asChild aria-label={`Tooltip placement: ${placement}`}>
            <Button>Hover or focus</Button>
          </TooltipTrigger>
          <TooltipBody>Placement: {placement}</TooltipBody>
        </Tooltip>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-3">
        <Button variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
        <Tooltip open={open} onOpenChange={(details) => setOpen(details.open)}>
          <TooltipTrigger>Controlled tooltip</TooltipTrigger>
          <TooltipBody>Open: {String(open)}</TooltipBody>
        </Tooltip>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger>Context tooltip</TooltipTrigger>
        <TooltipPositioner>
          <TooltipStateContent />
        </TooltipPositioner>
      </Tooltip>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const tooltip = useTooltip();

    return (
      <div className="flex flex-col items-center gap-3">
        <output className="text-sm leading-5 text-muted-foreground">
          Open: {String(tooltip.open)}
        </output>
        <TooltipRootProvider value={tooltip}>
          <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
          <TooltipBody>State is owned outside the tree.</TooltipBody>
        </TooltipRootProvider>
      </div>
    );
  },
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const [activeTool, setActiveTool] = useState<(typeof tooltipTools)[number] | null>(null);

    return (
      <Tooltip
        onTriggerValueChange={(details) => {
          setActiveTool(tooltipTools.find((tool) => tool.id === details.value) ?? null);
        }}
      >
        <div className="inline-flex items-center gap-px rounded-lg border border-border bg-muted p-1">
          {tooltipTools.map((tool) => (
            <TooltipTrigger key={tool.id} value={tool.id} asChild aria-label={tool.label}>
              <Button variant="ghost" size="icon-md">
                <tool.icon className="size-4" />
              </Button>
            </TooltipTrigger>
          ))}
        </div>
        <TooltipBody>
          {activeTool ? (
            <>
              {activeTool.label}{' '}
              <span className="text-xs leading-4 text-muted-foreground">{activeTool.shortcut}</span>
            </>
          ) : null}
        </TooltipBody>
      </Tooltip>
    );
  },
};

export const WithinFixedContainer: Story = {
  name: 'Within Fixed Container',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className="fixed top-10 left-10 grid min-h-32 min-w-64 place-items-center rounded-lg border border-border bg-muted">
        <Tooltip positioning={{ strategy: 'fixed' }}>
          <TooltipTrigger>Fixed strategy</TooltipTrigger>
          <TooltipBody>Positioned from a fixed container.</TooltipBody>
        </Tooltip>
      </div>
    );
  },
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger
          aria-label="Custom styled tooltip"
          className="border-primary bg-primary text-primary-foreground [@media(hover:hover)]:hover:bg-primary/90"
        >
          Custom style
        </TooltipTrigger>
        <TooltipPositioner className="drop-shadow-[0_0.5rem_1rem_rgb(0_0_0_/_14%)]">
          <TooltipContent className="min-w-40 border-primary bg-primary px-3 py-2 text-left text-primary-foreground">
            Styled through explicit Ark parts
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    );
  },
};

function TooltipStateContent() {
  const tooltip = useTooltipContext();

  return <TooltipContent>Open from context: {tooltip.open.toString()}</TooltipContent>;
}
