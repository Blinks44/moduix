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
  itemClassName,
  label,
  type,
}: {
  itemClassName?: string;
  label: string;
  type: ComponentProps<typeof TimerItem>['type'];
}) {
  return (
    <span className="inline-grid justify-items-center gap-1">
      <TimerItem className={itemClassName} type={type} />
      <span className="text-xs leading-4 font-normal text-muted-foreground">{label}</span>
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

function TimerControls({ actionClassName }: { actionClassName?: string }) {
  return (
    <TimerControl>
      <TimerActionTrigger action="start" className={actionClassName}>
        <PlayIcon /> Start
      </TimerActionTrigger>
      <TimerActionTrigger action="resume" className={actionClassName}>
        <PlayIcon /> Resume
      </TimerActionTrigger>
      <TimerActionTrigger action="pause" className={actionClassName}>
        <PauseIcon /> Pause
      </TimerActionTrigger>
      <TimerActionTrigger action="reset" className={actionClassName}>
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
        <p className="m-0 text-sm leading-5 text-muted-foreground">
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
        <p className="m-0 text-sm leading-5 text-muted-foreground">
          {mode === 'work' ? 'Focus session' : 'Break session'}
        </p>
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
            <p className="m-0 text-sm leading-5 text-muted-foreground">
              Progress: {(api.progressPercent * 100).toFixed(0)}%
            </p>
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
    <Timer targetMs={15 * 60 * 1000}>
      <TimerArea className="text-3xl">
        <TimerItem className="text-primary" type="minutes" />
        <TimerSeparator className="text-chart-2">·</TimerSeparator>
        <TimerItem className="text-primary" type="seconds" />
      </TimerArea>
      <TimerControls actionClassName="border-transparent bg-muted" />
    </Timer>
  ),
};