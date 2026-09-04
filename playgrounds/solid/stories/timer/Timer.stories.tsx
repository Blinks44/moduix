import { createSignal, Show } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Timer, useTimer } from '@/components/timer/Timer';
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';
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

function TimerItemGroup(props: { label: string; type: ComponentProps<typeof Timer.Item>['type'] }) {
  return (
    <span class={styles.itemGroup}>
      <Timer.Item type={props.type} />
      <span class={styles.itemLabel}>{props.label}</span>
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
    const [ticks, setTicks] = createSignal(0);
    const [complete, setComplete] = createSignal(false);

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
        <p class={styles.status}>
          Ticks: {ticks()} / {complete() ? 'Complete' : 'Running target'}
        </p>
      </Timer.Root>
    );
  },
};

export const Pomodoro: Story = {
  render: () => {
    const [mode, setMode] = createSignal<'work' | 'break'>('work');

    return (
      <Show when={mode()} keyed>
        {(currentMode) => {
          const targetMs = currentMode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;

          return (
            <Timer.Root
              countdown
              startMs={targetMs}
              onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
            >
              <p class={styles.status}>
                {currentMode === 'work' ? 'Focus session' : 'Break session'}
              </p>
              <ShortTimerValue />
              <TimerControls />
            </Timer.Root>
          );
        }}
      </Show>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const timer = useTimer({ targetMs: 60 * 60 * 1000 });

    return (
      <Timer.RootProvider value={timer}>
        <Timer.Context>
          {(api) => <p class={styles.status}>Progress: {api().progressPercent.toFixed(0)}%</p>}
        </Timer.Context>
        <ShortTimerValue />
        <TimerControls />
      </Timer.RootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Timer.Root class={styles.customTimer} targetMs={15 * 60 * 1000}>
      <Timer.Segments separator="·" types={['minutes', 'seconds']} />
      <TimerControls />
    </Timer.Root>
  ),
};