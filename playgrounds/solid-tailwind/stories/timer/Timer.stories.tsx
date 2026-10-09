import { createSignal, Show } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';

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

function TimerItemGroup(props: {
  itemClass?: string;
  label: string;
  type: ComponentProps<typeof TimerItem>['type'];
}) {
  return (
    <span class="inline-grid justify-items-center gap-1">
      <TimerItem class={props.itemClass} type={props.type} />
      <span class="text-xs leading-4 font-normal text-muted-foreground">{props.label}</span>
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

function TimerControls(props: { actionClass?: string }) {
  return (
    <TimerControl>
      <TimerActionTrigger action="start" class={props.actionClass}>
        <PlayIcon /> Start
      </TimerActionTrigger>
      <TimerActionTrigger action="resume" class={props.actionClass}>
        <PlayIcon /> Resume
      </TimerActionTrigger>
      <TimerActionTrigger action="pause" class={props.actionClass}>
        <PauseIcon /> Pause
      </TimerActionTrigger>
      <TimerActionTrigger action="reset" class={props.actionClass}>
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
    const [ticks, setTicks] = createSignal(0);
    const [complete, setComplete] = createSignal(false);

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
        <p class="m-0 text-sm leading-5 text-muted-foreground">
          Ticks: {ticks()} / {complete() ? 'Complete' : 'Running target'}
        </p>
      </Timer>
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
            <Timer
              countdown
              startMs={targetMs}
              onComplete={() => setMode((value) => (value === 'work' ? 'break' : 'work'))}
            >
              <p class="m-0 text-sm leading-5 text-muted-foreground">
                {currentMode === 'work' ? 'Focus session' : 'Break session'}
              </p>
              <ShortTimerValue />
              <TimerControls />
            </Timer>
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
      <TimerRootProvider value={timer}>
        <TimerContext>
          {(api) => (
            <p class="m-0 text-sm leading-5 text-muted-foreground">
              Progress: {(api().progressPercent * 100).toFixed(0)}%
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
      <TimerArea class="text-3xl">
        <TimerItem class="text-primary" type="minutes" />
        <TimerSeparator class="text-chart-2">·</TimerSeparator>
        <TimerItem class="text-primary" type="seconds" />
      </TimerArea>
      <TimerControls actionClass="border-transparent bg-muted" />
    </Timer>
  ),
};