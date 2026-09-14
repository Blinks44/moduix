import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Tooltip, useTooltip, useTooltipContext } from '@/components/tooltip/Tooltip';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { InfoIcon } from '../../icons/demo';
import storyStyles from './Tooltip.stories.module.css';

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
        <Tooltip.Trigger asChild aria-label="Notifications">
          <Button>
            <span className={storyStyles.triggerContent}>
              <BellIcon className={storyStyles.icon} />
              Notifications
            </span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Body>Notifications</Tooltip.Body>
      </Tooltip>
    );
  },
};

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    return (
      <Tooltip>
        <Tooltip.Trigger aria-label="Tooltip with arrow">Hover or focus</Tooltip.Trigger>
        <Tooltip.Body>
          <Tooltip.Arrow />
          Tooltip with arrow
        </Tooltip.Body>
      </Tooltip>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <Tooltip closeDelay={0} openDelay={0}>
        <Tooltip.Trigger>Immediate tooltip</Tooltip.Trigger>
        <Tooltip.Body>No open or close delay</Tooltip.Body>
      </Tooltip>
    );
  },
};

export const DisabledTrigger: Story = {
  name: 'Disabled Trigger',
  render: () => {
    return (
      <Tooltip>
        <Tooltip.DisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </Tooltip.DisabledTrigger>
        <Tooltip.Body>Projects are unavailable while offline.</Tooltip.Body>
      </Tooltip>
    );
  },
};

export const Positioning: Story = {
  render: () => {
    const [placement, setPlacement] = useState<TooltipPlacement>('top');

    return (
      <div className={storyStyles.stack}>
        <div className={storyStyles.sideButtons}>
          {tooltipPlacements.map((item) => (
            <button
              key={item}
              type="button"
              className={storyStyles.sideButton}
              data-active={item === placement ? '' : undefined}
              onClick={() => setPlacement(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <Tooltip positioning={{ placement, offset: { mainAxis: 12 } }}>
          <Tooltip.Trigger asChild aria-label={`Tooltip placement: ${placement}`}>
            <Button>Hover or focus</Button>
          </Tooltip.Trigger>
          <Tooltip.Body>Placement: {placement}</Tooltip.Body>
        </Tooltip>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className={storyStyles.stack}>
        <Button variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
        <Tooltip open={open} onOpenChange={(details) => setOpen(details.open)}>
          <Tooltip.Trigger>Controlled tooltip</Tooltip.Trigger>
          <Tooltip.Body>Open: {String(open)}</Tooltip.Body>
        </Tooltip>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Tooltip>
        <Tooltip.Trigger>Context tooltip</Tooltip.Trigger>
        <Tooltip.Positioner>
          <TooltipStateContent />
        </Tooltip.Positioner>
      </Tooltip>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const tooltip = useTooltip();

    return (
      <div className={storyStyles.stack}>
        <output className={storyStyles.output}>Open: {String(tooltip.open)}</output>
        <Tooltip.RootProvider value={tooltip}>
          <Tooltip.Trigger>RootProvider tooltip</Tooltip.Trigger>
          <Tooltip.Body>State is owned outside the tree.</Tooltip.Body>
        </Tooltip.RootProvider>
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
        <div className={storyStyles.toolbar}>
          {tooltipTools.map((tool) => (
            <Tooltip.Trigger key={tool.id} value={tool.id} asChild aria-label={tool.label}>
              <Button variant="ghost" size="icon-md">
                <tool.icon className={storyStyles.icon} />
              </Button>
            </Tooltip.Trigger>
          ))}
        </div>
        <Tooltip.Body>
          {activeTool ? (
            <>
              {activeTool.label} <span className={storyStyles.shortcut}>{activeTool.shortcut}</span>
            </>
          ) : null}
        </Tooltip.Body>
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
      <div className={storyStyles.fixedContainer}>
        <Tooltip positioning={{ strategy: 'fixed' }}>
          <Tooltip.Trigger>Fixed strategy</Tooltip.Trigger>
          <Tooltip.Body>Positioned from a fixed container.</Tooltip.Body>
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
        <Tooltip.Trigger aria-label="Custom styled tooltip" className={storyStyles.customTrigger}>
          Custom style
        </Tooltip.Trigger>
        <Tooltip.Positioner className={storyStyles.customPositioner}>
          <Tooltip.Content className={storyStyles.customContent}>
            Styled through explicit Ark parts
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip>
    );
  },
};
function TooltipStateContent() {
  const tooltip = useTooltipContext();

  return <Tooltip.Content>Open from context: {tooltip.open.toString()}</Tooltip.Content>;
}