import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { BellIcon } from '@/primitives/Icons';
import type { PopoverContentProps } from './Popover';
import { Button } from '../Button';
import {
  Popover,
  createPopoverHandle,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
} from './Popover';
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

const SIDES: PopoverSide[] = ['top', 'right', 'bottom', 'left'];

export const Basic: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger render={<Button />}>
          <span className={storyStyles.triggerContent}>
            <BellIcon className={storyStyles.icon} />
            Notifications
          </span>
        </PopoverTrigger>
        <PopoverContent showArrow>
          <PopoverHeader className={storyStyles.contentGrid}>
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );
  },
};

export const WithCloseAction: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger render={<Button />}>Project status</PopoverTrigger>
        <PopoverContent showArrow>
          <PopoverHeader className={storyStyles.contentGrid}>
            <PopoverTitle>Sprint 19</PopoverTitle>
            <PopoverDescription>
              9 tasks completed, 2 in progress. Everything is on schedule.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverClose>Close</PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  },
};

export const WithBackdrop: Story = {
  name: 'With Backdrop',
  render: () => {
    return (
      <Popover>
        <PopoverTrigger render={<Button />}>Open with backdrop</PopoverTrigger>
        <PopoverContent
          showArrow={false}
          withBackdrop
          classNames={{ backdrop: storyStyles.backdrop }}
        >
          <PopoverHeader className={storyStyles.contentGrid}>
            <PopoverTitle>Backdrop</PopoverTitle>
            <PopoverDescription>
              The backdrop is rendered automatically and styled through classNames.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );
  },
};

export const OpenOnHover: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger openOnHover delay={150} closeDelay={120} render={<Button />}>
          Open on hover
        </PopoverTrigger>
        <PopoverContent showArrow>
          <PopoverHeader className={storyStyles.contentGrid}>
            <PopoverTitle>Hover mode</PopoverTitle>
            <PopoverDescription>
              This popover uses delayed hover opening for quick preview interactions.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className={storyStyles.stack}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button />}>Open controlled popover</PopoverTrigger>
          <PopoverContent showArrow>
            <PopoverHeader className={storyStyles.contentGrid}>
              <PopoverTitle>Publish changes?</PopoverTitle>
              <PopoverDescription>
                This action will make your latest updates visible to all users.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverClose>Back to editing</PopoverClose>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const DetachedTrigger: Story = {
  name: 'Detached Trigger',
  render: () => {
    const popoverHandle = React.useMemo(() => createPopoverHandle(), []);

    return (
      <div className={storyStyles.row}>
        <PopoverTrigger handle={popoverHandle} render={<Button />}>
          Open details
        </PopoverTrigger>
        <Popover handle={popoverHandle}>
          <PopoverContent showArrow>
            <PopoverHeader className={storyStyles.contentGrid}>
              <PopoverTitle>Detached trigger</PopoverTitle>
              <PopoverDescription>
                Trigger and popup are linked with createPopoverHandle().
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const SideControl: Story = {
  name: 'Side Control',
  render: () => {
    const [side, setSide] = React.useState<PopoverSide>('bottom');

    return (
      <div className={storyStyles.stack}>
        <div className={storyStyles.sideButtons}>
          {SIDES.map((item) => (
            <button
              key={item}
              type="button"
              className={storyStyles.sideButton}
              data-active={item === side || undefined}
              onClick={() => setSide(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <Popover>
          <PopoverTrigger render={<Button />}>Open with side: {side}</PopoverTrigger>
          <PopoverContent side={side} showArrow className={storyStyles.popupNarrow}>
            <PopoverHeader className={storyStyles.contentGrid}>
              <PopoverTitle>Placement</PopoverTitle>
              <PopoverDescription>
                Current side is <strong>{side}</strong>. You can switch it with the buttons above.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const ImageOnlyContent: Story = {
  name: 'Image Only Content',
  render: () => {
    return (
      <Popover>
        <PopoverTrigger render={<Button />}>Open image popover</PopoverTrigger>
        <PopoverContent showArrow className={storyStyles.imagePopup}>
          <PopoverBody>
            <img
              className={storyStyles.image}
              alt="Abstract geometric composition"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 420'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%230b1220' offset='0'/%3E%3Cstop stop-color='%231d3557' offset='0.52'/%3E%3Cstop stop-color='%23004e64' offset='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='accent1' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop stop-color='%23ffd166'/%3E%3Cstop stop-color='%23fca311'/%3E%3C/linearGradient%3E%3ClinearGradient id='accent2' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop stop-color='%2306d6a0'/%3E%3Cstop stop-color='%23118ab2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='420' fill='url(%23bg)'/%3E%3Ccircle cx='120' cy='90' r='70' fill='%23ffffff22'/%3E%3Ccircle cx='620' cy='330' r='120' fill='%23ffffff18'/%3E%3Crect x='70' y='240' width='320' height='110' rx='22' fill='url(%23accent1)' opacity='0.88' transform='rotate(-8 230 295)'/%3E%3Crect x='320' y='90' width='300' height='120' rx='24' fill='url(%23accent2)' opacity='0.92' transform='rotate(10 470 150)'/%3E%3Cpath d='M40 370 C160 260, 270 360, 390 280 C510 200, 610 280, 720 210 L720 420 L40 420 Z' fill='%23ffffff22'/%3E%3C/svg%3E"
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  },
};

type PopoverSide = Exclude<PopoverContentProps['side'], undefined>;