import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTooltip, useTooltipContext } from '@ark-ui/react/tooltip';
import { useState } from 'react';
import { BellIcon, InfoIcon, ShareIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { Tooltip } from './Tooltip';
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
        <Tooltip.Positioner>
          <Tooltip.Content>Notifications</Tooltip.Content>
        </Tooltip.Positioner>
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
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Tooltip with arrow
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <Tooltip closeDelay={0} openDelay={0}>
        <Tooltip.Trigger>Immediate tooltip</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>No open or close delay</Tooltip.Content>
        </Tooltip.Positioner>
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
          <Tooltip.Positioner>
            <Tooltip.Content>Placement: {placement}</Tooltip.Content>
          </Tooltip.Positioner>
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
          <Tooltip.Positioner>
            <Tooltip.Content>Open: {String(open)}</Tooltip.Content>
          </Tooltip.Positioner>
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
          <Tooltip.Positioner>
            <Tooltip.Content>State is owned outside the tree.</Tooltip.Content>
          </Tooltip.Positioner>
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
        <Tooltip.Positioner>
          <Tooltip.Content>
            {activeTool ? (
              <>
                {activeTool.label}{' '}
                <span className={storyStyles.shortcut}>{activeTool.shortcut}</span>
              </>
            ) : null}
          </Tooltip.Content>
        </Tooltip.Positioner>
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
          <Tooltip.Positioner>
            <Tooltip.Content>Positioned from a fixed container.</Tooltip.Content>
          </Tooltip.Positioner>
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
            <Tooltip.Arrow className={storyStyles.customArrow} />
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