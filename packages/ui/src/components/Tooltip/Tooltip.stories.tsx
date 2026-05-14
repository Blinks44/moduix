import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { BellIcon, InfoIcon, PlusIcon, ShareIcon } from '@/primitives/Icons';
import type { TooltipContentProps } from './Tooltip';
import {
  Tooltip,
  TooltipProvider,
  createTooltipHandle,
  TooltipContent,
  TooltipTrigger,
} from './Tooltip';
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
type TooltipSide = NonNullable<TooltipContentProps['side']>;

const SIDES: TooltipSide[] = ['top', 'right', 'bottom', 'left'];

export const Basic: Story = {
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Notifications" data-variant="ghost">
          <BellIcon className={storyStyles.icon} />
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>
    );
  },
};

export const WithoutArrow: Story = {
  name: 'Without Arrow',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Tooltip without arrow">Hover or focus</TooltipTrigger>
        <TooltipContent showArrow={false}>Tooltip without arrow</TooltipContent>
      </Tooltip>
    );
  },
};

export const Toolbar: Story = {
  render: () => {
    return (
      <TooltipProvider delay={300}>
        <div className={storyStyles.toolbar}>
          <Tooltip>
            <TooltipTrigger aria-label="Add item" data-variant="ghost">
              <PlusIcon className={storyStyles.icon} />
            </TooltipTrigger>
            <TooltipContent sideOffset={16}>Add item</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger aria-label="Share" data-variant="ghost">
              <ShareIcon className={storyStyles.icon} />
            </TooltipTrigger>
            <TooltipContent sideOffset={16}>Share</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger aria-label="Details" data-variant="ghost">
              <InfoIcon className={storyStyles.icon} />
            </TooltipTrigger>
            <TooltipContent sideOffset={16}>Details</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  },
};

export const DetachedTrigger: Story = {
  name: 'Detached Trigger',
  render: () => {
    const tooltipHandle = React.useMemo(() => createTooltipHandle(), []);

    return (
      <div className={storyStyles.row}>
        <TooltipTrigger aria-label="Detached tooltip" handle={tooltipHandle}>
          Detached trigger
        </TooltipTrigger>
        <Tooltip handle={tooltipHandle}>
          <TooltipContent>Linked with handle.</TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

export const SideControl: Story = {
  name: 'Side Control',
  render: () => {
    const [side, setSide] = React.useState<TooltipSide>('top');

    return (
      <div className={storyStyles.stack}>
        <div className={storyStyles.sideButtons}>
          {SIDES.map((item) => (
            <button
              key={item}
              type="button"
              className={storyStyles.sideButton}
              data-active={item === side ? '' : undefined}
              onClick={() => setSide(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <Tooltip>
          <TooltipTrigger aria-label={`Tooltip side: ${side}`}>Hover or focus</TooltipTrigger>
          <TooltipContent side={side}>Side: {side}</TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const tooltipHandle = React.useMemo(() => createTooltipHandle<{ text: string }>(), []);

    return (
      <TooltipProvider delay={250}>
        <div className={storyStyles.row}>
          <TooltipTrigger
            aria-label="Create"
            handle={tooltipHandle}
            payload={{ text: 'Create' }}
            data-variant="ghost"
          >
            <PlusIcon className={storyStyles.icon} />
          </TooltipTrigger>
          <TooltipTrigger
            aria-label="Share"
            handle={tooltipHandle}
            payload={{ text: 'Share' }}
            data-variant="ghost"
          >
            <ShareIcon className={storyStyles.icon} />
          </TooltipTrigger>
          <TooltipTrigger
            aria-label="Details"
            handle={tooltipHandle}
            payload={{ text: 'Details' }}
            data-variant="ghost"
          >
            <InfoIcon className={storyStyles.icon} />
          </TooltipTrigger>

          <Tooltip handle={tooltipHandle}>
            {({ payload }) => <TooltipContent>{payload?.text}</TooltipContent>}
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  },
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Custom styled tooltip" className={storyStyles.customTrigger}>
          Custom style
        </TooltipTrigger>
        <TooltipContent
          className={storyStyles.customPopup}
          classNames={{
            portal: storyStyles.customPortal,
            positioner: storyStyles.customPositioner,
            arrow: storyStyles.customArrow,
            viewport: storyStyles.customViewport,
          }}
        >
          Styled through className
        </TooltipContent>
      </Tooltip>
    );
  },
};