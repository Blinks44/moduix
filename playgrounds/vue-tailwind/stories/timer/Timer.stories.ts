import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component, PropType } from 'vue';
import {
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerItem,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
  useTimer,
} from '@/components/timer';
import type { TimerItemProps } from '@/components/timer';
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

const TimerItemGroup = defineComponent({
  components: { TimerItem },
  props: {
    label: { type: String, required: true },
    type: { type: String as PropType<TimerItemProps['type']>, required: true },
  },
  template: `
    <span class="inline-grid justify-items-center gap-1">
      <TimerItem :type="type" />
      <span class="text-xs leading-4 font-normal text-muted-foreground">{{ label }}</span>
    </span>
  `,
});

const ShortTimerValue = defineComponent({
  components: { TimerArea, TimerItemGroup, TimerSeparator },
  template: `
    <TimerArea>
      <TimerItemGroup type="minutes" label="minutes" />
      <TimerSeparator>:</TimerSeparator>
      <TimerItemGroup type="seconds" label="seconds" />
    </TimerArea>
  `,
});

const TimerControls = defineComponent({
  components: { PauseIcon, PlayIcon, RotateCcwIcon, TimerActionTrigger, TimerControl },
  props: {
    actionClassName: { type: String, default: undefined },
  },
  template: `
    <TimerControl>
      <TimerActionTrigger action="start" :class="actionClassName"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="resume" :class="actionClassName"><PlayIcon /> Resume</TimerActionTrigger>
      <TimerActionTrigger action="pause" :class="actionClassName"><PauseIcon /> Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset" :class="actionClassName"><RotateCcwIcon /> Reset</TimerActionTrigger>
    </TimerControl>
  `,
});

const storyComponents = {
  ShortTimerValue,
  Timer,
  TimerActionTrigger,
  TimerArea,
  TimerContext,
  TimerControl,
  TimerControls,
  TimerItem,
  TimerItemGroup,
  TimerRootProvider,
  TimerSegments,
  TimerSeparator,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return setup?.() ?? {};
      },
      template,
    });
}

export const Basic: Story = {
  render: (args) =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { args };
      },
      template: `
        <Timer v-bind="args">
          <TimerSegments />
          <TimerControls />
        </Timer>
      `,
    }),
};

export const Countdown: Story = {
  render: renderStory(`
    <Timer countdown :start-ms="10 * 60 * 1000">
      <ShortTimerValue />
      <TimerControls />
    </Timer>
  `),
};

export const Interval: Story = {
  render: renderStory(`
    <Timer :interval="100" :target-ms="60 * 1000">
      <TimerArea>
        <TimerItemGroup type="seconds" label="seconds" />
        <TimerSeparator>.</TimerSeparator>
        <TimerItemGroup type="milliseconds" label="ms" />
      </TimerArea>
      <TimerControls />
    </Timer>
  `),
};

export const Events: Story = {
  render: renderStory(
    `
      <Timer :target-ms="10 * 1000" @tick="onTick" @complete="onComplete">
        <TimerArea>
          <TimerItemGroup type="seconds" label="seconds" />
        </TimerArea>
        <TimerControls />
        <p class="m-0 text-sm leading-5 text-muted-foreground">
          Ticks: {{ ticks }} / {{ complete ? 'Complete' : 'Running target' }}
        </p>
      </Timer>
    `,
    () => {
      const ticks = ref(0);
      const complete = ref(false);
      return {
        complete,
        onComplete: () => {
          complete.value = true;
        },
        onTick: () => {
          ticks.value += 1;
        },
        ticks,
      };
    },
  ),
};

export const Pomodoro: Story = {
  render: renderStory(
    `
      <Timer
        :key="mode"
        countdown
        :start-ms="mode === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000"
        @complete="toggleMode"
      >
        <p class="m-0 text-sm leading-5 text-muted-foreground">
          {{ mode === 'work' ? 'Focus session' : 'Break session' }}
        </p>
        <ShortTimerValue />
        <TimerControls />
      </Timer>
    `,
    () => {
      const mode = ref<'work' | 'break'>('work');
      return {
        mode,
        toggleMode: () => {
          mode.value = mode.value === 'work' ? 'break' : 'work';
        },
      };
    },
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <TimerRootProvider :value="timer">
        <TimerContext v-slot="context">
          <p class="m-0 text-sm leading-5 text-muted-foreground">
            Progress: {{ (context.progressPercent * 100).toFixed(0) }}%
          </p>
        </TimerContext>
        <ShortTimerValue />
        <TimerControls />
      </TimerRootProvider>
    `,
    () => ({ timer: useTimer({ targetMs: 60 * 60 * 1000 }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Timer :target-ms="15 * 60 * 1000">
      <TimerArea class="text-3xl">
        <TimerItem class="text-primary" type="minutes" />
        <TimerSeparator class="text-chart-2">·</TimerSeparator>
        <TimerItem class="text-primary" type="seconds" />
      </TimerArea>
      <TimerControls action-class-name="border-transparent bg-muted" />
    </Timer>
  `),
};