import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Timer, useTimer } from '@/components/timer/Timer';
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui';

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
  itemClassName,
  label,
  type,
}: {
  itemClassName?: string;
  label: string;
  type: ComponentProps<typeof Timer.Item>['type'];
}) {
  return (
    <span className="inline-grid justify-items-center gap-1">
      <Timer.Item className={itemClassName} type={type} />
      <span className="text-xs leading-4 font-normal text-muted-foreground">{label}</span>
    </span>
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

function TimerControls({ actionClassName }: { actionClassName?: string }) {
  return (
    <Timer.Control>
      <Timer.ActionTrigger action="start" className={actionClassName}>
        <PlayIcon /> Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="resume" className={actionClassName}>
        <PlayIcon /> Resume
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="pause" className={actionClassName}>
        <PauseIcon /> Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger action="reset" className={actionClassName}>
        <RotateCcwIcon /> Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  );
}

export const Basic: Story = {
  render: (args) => (
    <Timer.Root {...args}>
      <Timer.Segments />
      <TimerControls />
    </Timer.Root>
  ),
};

export const Countdown: Story = {
  render: () => (
    <Timer.Root countdown startMs={10 * 60 * 1000}>
      <ShortTimerValue />
      <TimerControls />
    </Timer.Root>
  ),
};

export const Interval: Story = {
  render: () => (
    <Timer.Root interval={100} targetMs={60 * 1000}>
      <Timer.Area>
        <TimerItemGroup type="seconds" label="seconds" />
        <Timer.Separator>.</Timer.Separator>
        <TimerItemGroup type="milliseconds" label="ms" />
      </Timer.Area>
      <TimerControls />
    </Timer.Root>
  ),
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
        <p className="m-0 text-sm leading-5 text-muted-foreground">
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
        <p className="m-0 text-sm leading-5 text-muted-foreground">
          {mode === 'work' ? 'Focus session' : 'Break session'}
        </p>
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
        <Timer.Context>
          {(api) => (
            <p className="m-0 text-sm leading-5 text-muted-foreground">
              Progress: {api.progressPercent.toFixed(0)}%
            </p>
          )}
        </Timer.Context>
        <ShortTimerValue />
        <TimerControls />
      </Timer.RootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Timer.Root targetMs={15 * 60 * 1000}>
      <Timer.Area className="text-3xl">
        <Timer.Item className="text-primary" type="minutes" />
        <Timer.Separator className="text-chart-2">·</Timer.Separator>
        <Timer.Item className="text-primary" type="seconds" />
      </Timer.Area>
      <TimerControls actionClassName="border-transparent bg-muted" />
    </Timer.Root>
  ),
};