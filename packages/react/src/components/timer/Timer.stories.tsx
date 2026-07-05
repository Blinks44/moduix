import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timer as TimerPrimitive, useTimer } from '@ark-ui/react/timer';
import { useState, type ComponentProps } from 'react';
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui';
import { Timer } from './Timer';
import styles from './Timer.stories.module.css';

const meta = {
  title: 'Components/Timer',
  component: Timer.Root,
  tags: ['autodocs'],
  args: {
    targetMs: 60 * 60 * 1000,
    startMs: 40 * 60 * 1000,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Timer.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

function TimerItemGroup({
  label,
  type,
}: {
  label: string;
  type: ComponentProps<typeof Timer.Item>['type'];
}) {
  return (
    <span className={styles.itemGroup}>
      <Timer.Item type={type} />
      <span className={styles.itemLabel}>{label}</span>
    </span>
  );
}

function TimerValue() {
  return (
    <Timer.Area>
      <TimerItemGroup type="days" label="days" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="hours" label="hours" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="minutes" label="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="seconds" label="seconds" />
    </Timer.Area>
  );
}

function ShortTimerValue() {
  return (
    <Timer.Area>
      <TimerItemGroup type="minutes" label="minutes" />
      <Timer.Separator>:</Timer.Separator>
      <TimerItemGroup type="seconds" label="seconds" />
    </Timer.Area>
  );
}

function TimerControls() {
  return (
    <Timer.Control>
      <Timer.ActionTrigger action="start">
        <PlayIcon /> Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="resume">
        <PlayIcon /> Resume
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause">
        <PauseIcon /> Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset">
        <RotateCcwIcon /> Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  );
}

export const Basic: Story = {
  render: (args) => {
    return (
      <Timer.Root {...args}>
        <TimerValue />
        <TimerControls />
      </Timer.Root>
    );
  },
};

export const Countdown: Story = {
  render: () => {
    return (
      <Timer.Root countdown startMs={10 * 60 * 1000}>
        <ShortTimerValue />
        <TimerControls />
      </Timer.Root>
    );
  },
};

export const Interval: Story = {
  render: () => {
    return (
      <Timer.Root interval={100} targetMs={60 * 1000}>
        <Timer.Area>
          <TimerItemGroup type="seconds" label="seconds" />
          <Timer.Separator>.</Timer.Separator>
          <TimerItemGroup type="milliseconds" label="ms" />
        </Timer.Area>
        <TimerControls />
      </Timer.Root>
    );
  },
};

export const Events: Story = {
  render: () => {
    const [ticks, setTicks] = useState(0);
    const [complete, setComplete] = useState(false);

    return (
      <Timer.Root
        targetMs={10 * 1000}
        onTick={() => setTicks((value) => value + 1)}
        onComplete={() => setComplete(true)}
      >
        <Timer.Area>
          <TimerItemGroup type="seconds" label="seconds" />
        </Timer.Area>
        <TimerControls />
        <p className={styles.status}>
          Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}
        </p>
      </Timer.Root>
    );
  },
};

export const Pomodoro: Story = {
  render: () => {
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const targetMs = mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;

    return (
      <Timer.Root
        key={mode}
        countdown
        startMs={targetMs}
        onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
      >
        <p className={styles.status}>{mode === 'work' ? 'Focus session' : 'Break session'}</p>
        <ShortTimerValue />
        <TimerControls />
      </Timer.Root>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const timer = useTimer({ targetMs: 60 * 60 * 1000 });

    return (
      <Timer.RootProvider value={timer}>
        <TimerPrimitive.Context>
          {(api) => <p className={styles.status}>Progress: {api.progressPercent.toFixed(0)}%</p>}
        </TimerPrimitive.Context>
        <ShortTimerValue />
        <TimerControls />
      </Timer.RootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Timer.Root className={styles.customTimer} targetMs={15 * 60 * 1000}>
        <ShortTimerValue />
        <TimerControls />
      </Timer.Root>
    );
  },
};