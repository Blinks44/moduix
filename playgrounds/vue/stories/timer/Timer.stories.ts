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
import { PauseIcon, PlayIcon, RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';
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

const TimerItemGroup = defineComponent({
  components: { TimerItem },
  props: {
    label: { type: String, required: true },
    type: { type: String as PropType<TimerItemProps['type']>, required: true },
  },
  setup() {
    return { styles };
  },
  template: `
    <span :class="styles.itemGroup">
      <TimerItem :type="type" />
      <span :class="styles.itemLabel">{{ label }}</span>
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
  template: `
    <TimerControl>
      <TimerActionTrigger action="start"><PlayIcon /> Start</TimerActionTrigger>
      <TimerActionTrigger action="resume"><PlayIcon /> Resume</TimerActionTrigger>
      <TimerActionTrigger action="pause"><PauseIcon /> Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset"><RotateCcwIcon /> Reset</TimerActionTrigger>
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
        return { styles, ...setup?.() };
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
        <p :class="styles.status">
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
        <p :class="styles.status">{{ mode === 'work' ? 'Focus session' : 'Break session' }}</p>
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
          <p :class="styles.status">Progress: {{ (context.progressPercent * 100).toFixed(0) }}%</p>
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
    <Timer :class="styles.customTimer" :target-ms="15 * 60 * 1000">
      <TimerSegments separator="·" :types="['minutes', 'seconds']" />
      <TimerControls />
    </Timer>
  `),
};