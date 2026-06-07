import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { BellIcon, InfoIcon, ShareIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import {
  Tooltip,
  TooltipProvider,
  createTooltipHandle,
  TooltipArrow,
  TooltipContent,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
  TooltipViewport,
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
const SIDES = ['top', 'right', 'bottom', 'left'] as const;
type TooltipSide = (typeof SIDES)[number];

export const Default: Story = {
  name: 'Default',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger render={<Button />} aria-label="Notifications">
          <span className={storyStyles.triggerContent}>
            <BellIcon className={storyStyles.icon} />
            Notifications
          </span>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
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
        <TooltipContent showArrow>Tooltip with arrow</TooltipContent>
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
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-md" />}
              aria-label="Add item"
            >
              <PlusIcon className={storyStyles.icon} />
            </TooltipTrigger>
            <TooltipContent showArrow sideOffset={16}>
              Add item
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-md" />} aria-label="Share">
              <ShareIcon className={storyStyles.icon} />
            </TooltipTrigger>
            <TooltipContent showArrow sideOffset={16}>
              Share
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-md" />} aria-label="Details">
              <InfoIcon className={storyStyles.icon} />
            </TooltipTrigger>
            <TooltipContent showArrow sideOffset={16}>
              Details
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  },
};

export const DetachedTrigger: Story = {
  name: 'Detached Trigger',
  render: () => {
    const tooltipHandle = useMemo(() => createTooltipHandle(), []);

    return (
      <div className={storyStyles.row}>
        <TooltipTrigger aria-label="Detached tooltip" handle={tooltipHandle} render={<Button />}>
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
    const [side, setSide] = useState<TooltipSide>('top');

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
          <TooltipTrigger render={<Button />} aria-label={`Tooltip side: ${side}`}>
            Hover or focus
          </TooltipTrigger>
          <TooltipContent side={side}>Side: {side}</TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

export const MultipleTriggers: Story = {
  name: 'Multiple Triggers',
  render: () => {
    const tooltipHandle = useMemo(() => createTooltipHandle<{ text: string }>(), []);

    return (
      <TooltipProvider delay={250}>
        <div className={storyStyles.row}>
          <TooltipTrigger
            aria-label="Create"
            handle={tooltipHandle}
            payload={{ text: 'Create' }}
            render={<Button variant="ghost" size="icon-md" />}
          >
            <PlusIcon className={storyStyles.icon} />
          </TooltipTrigger>
          <TooltipTrigger
            aria-label="Share"
            handle={tooltipHandle}
            payload={{ text: 'Share' }}
            render={<Button variant="ghost" size="icon-md" />}
          >
            <ShareIcon className={storyStyles.icon} />
          </TooltipTrigger>
          <TooltipTrigger
            aria-label="Details"
            handle={tooltipHandle}
            payload={{ text: 'Details' }}
            render={<Button variant="ghost" size="icon-md" />}
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

export const CustomComposition: Story = {
  name: 'Custom Composition',
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger aria-label="Custom styled tooltip" className={storyStyles.customTrigger}>
          Custom style
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner sideOffset={10} className={storyStyles.customPositioner}>
            <TooltipPopup className={storyStyles.customPopup}>
              <TooltipArrow className={storyStyles.customArrow} />
              <TooltipViewport className={storyStyles.customViewport}>
                Styled through explicit parts
              </TooltipViewport>
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    );
  },
};