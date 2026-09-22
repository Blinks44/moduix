import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import {
  Timer,
  TimerItem,
  TimerArea,
  TimerSeparator,
  TimerControl,
  TimerActionTrigger,
  TimerSegments,
  TimerRootProvider,
  TimerContext,
  useTimer,
} from '@/components/timer/Timer';
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui';
import styles from './Timer.stories.module.css';

const meta = {
  title: 'Components/Timer',
  component: Timer,
  tags: ['autodocs'],
  args: {
    targetMs: 60 * 60 * 1000,
    startMs: 40 * 60 * 1000,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Timer>;

export default meta;

type Story = StoryObj<typeof meta>;

function TimerItemGroup({
  label,
  type,
}: {
  label: string;
  type: ComponentProps<typeof TimerItem>['type'];
}) {
  return (
    <span className={styles.itemGroup}>
      <TimerItem type={type} />
      <span className={styles.itemLabel}>{label}</span>
    </span>
  );
}

function ShortTimerValue() {
  return (
    <TimerArea>
      <TimerItemGroup type="minutes" label="minutes" />
      <TimerSeparator>:</TimerSeparator>
      <TimerItemGroup type="seconds" label="seconds" />
    </TimerArea>
  );
}

function TimerControls() {
  return (
    <TimerControl>
      <TimerActionTrigger action="start">
        <PlayIcon /> Start
      </TimerActionTrigger>
      <TimerActionTrigger action="resume">
        <PlayIcon /> Resume
      </TimerActionTrigger>
      <TimerActionTrigger action="pause">
        <PauseIcon /> Pause
      </TimerActionTrigger>
      <TimerActionTrigger action="reset">
        <RotateCcwIcon /> Reset
      </TimerActionTrigger>
    </TimerControl>
  );
}

export const Basic: Story = {
  render: (args) => (
    <Timer {...args}>
      <TimerSegments />
      <TimerControls />
    </Timer>
  ),
};

export const Countdown: Story = {
  render: () => (
    <Timer countdown startMs={10 * 60 * 1000}>
      <ShortTimerValue />
      <TimerControls />
    </Timer>
  ),
};

export const Interval: Story = {
  render: () => (
    <Timer interval={100} targetMs={60 * 1000}>
      <TimerArea>
        <TimerItemGroup type="seconds" label="seconds" />
        <TimerSeparator>.</TimerSeparator>
        <TimerItemGroup type="milliseconds" label="ms" />
      </TimerArea>
      <TimerControls />
    </Timer>
  ),
};

export const Events: Story = {
  render: () => {
    const [ticks, setTicks] = useState(0);
    const [complete, setComplete] = useState(false);

    return (
      <Timer
        targetMs={10 * 1000}
        onTick={() => setTicks((value) => value + 1)}
        onComplete={() => setComplete(true)}
      >
        <TimerArea>
          <TimerItemGroup type="seconds" label="seconds" />
        </TimerArea>
        <TimerControls />
        <p className={styles.status}>
          Ticks: {ticks} / {complete ? 'Complete' : 'Running target'}
        </p>
      </Timer>
    );
  },
};

export const Pomodoro: Story = {
  render: () => {
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const targetMs = mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;

    return (
      <Timer
        key={mode}
        countdown
        startMs={targetMs}
        onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
      >
        <p className={styles.status}>{mode === 'work' ? 'Focus session' : 'Break session'}</p>
        <ShortTimerValue />
        <TimerControls />
      </Timer>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const timer = useTimer({ targetMs: 60 * 60 * 1000 });

    return (
      <TimerRootProvider value={timer}>
        <TimerContext>
          {(api) => (
            <p className={styles.status}>Progress: {(api.progressPercent * 100).toFixed(0)}%</p>
          )}
        </TimerContext>
        <ShortTimerValue />
        <TimerControls />
      </TimerRootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Timer className={styles.customTimer} targetMs={15 * 60 * 1000}>
      <TimerSegments separator="·" types={['minutes', 'seconds']} />
      <TimerControls />
    </Timer>
  ),
};
