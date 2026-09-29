import {
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@ark-ui/vue/slider';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  ProgressCircular,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  useProgress,
} from '@/components/progress-circular';
import styles from './ProgressCircular.stories.module.css';

const meta = {
  title: 'Components/ProgressCircular',
  component: ProgressCircular,
  tags: ['autodocs'],
  args: {
    defaultValue: 42,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressCircular>;

export default meta;

type Story = StoryObj<typeof meta>;

const CircularParts = defineComponent({
  components: { ProgressCircularRing, ProgressCircularValueText },
  props: {
    ariaLabel: { type: String, required: true },
  },
  setup() {
    return { styles };
  },
  template: `
    <div :class="styles.circleContainer">
      <ProgressCircularRing :aria-label="ariaLabel" />
      <ProgressCircularValueText />
    </div>
  `,
});

const storyComponents = {
  CircularParts,
  ProgressCircular,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValueText,
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
  render: renderStory(`
    <ProgressCircular :default-value="42">
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
      <CircularParts aria-label="Export data" />
    </ProgressCircular>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <ProgressCircular v-model="value">
          <ProgressCircularLabel>Upload status</ProgressCircularLabel>
          <CircularParts aria-label="Upload status" />
        </ProgressCircular>
        <SliderRoot :class="styles.slider" :value="[value ?? 0]" :min="0" :max="100" @value-change="value = $event.value[0] ?? 0">
          <SliderLabel>Progress value</SliderLabel>
          <SliderValueText />
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb :index="0" aria-label="Progress value">
              <SliderHiddenInput />
            </SliderThumb>
          </SliderControl>
        </SliderRoot>
      </div>
    `,
    () => ({ value: ref<number | null>(42) }),
  ),
};

export const InitialValue: Story = {
  render: renderStory(`
    <ProgressCircular :default-value="70">
      <ProgressCircularLabel>Import data</ProgressCircularLabel>
      <CircularParts aria-label="Import data" />
    </ProgressCircular>
  `),
};

export const MinMaxRange: Story = {
  render: renderStory(`
    <ProgressCircular :default-value="420" :min="200" :max="800">
      <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
      <CircularParts aria-label="Requests per minute" />
    </ProgressCircular>
  `),
};

export const Indeterminate: Story = {
  render: renderStory(`
    <ProgressCircular :class="styles.indeterminateProgress" :default-value="null">
      <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
      <CircularParts aria-label="Preparing report" />
    </ProgressCircular>
  `),
};

export const ValueText: Story = {
  render: renderStory(`
    <ProgressCircular :translations="{ value: ({ value, max }) => value === null ? 'Migration: loading' : \`Migration: \${value} of \${max}\` }">
      <ProgressCircularLabel>Migration</ProgressCircularLabel>
      <ProgressCircularRing />
      <ProgressCircularContext v-slot="progress">
        <ProgressCircularValueText>{{ progress.valueAsString }}</ProgressCircularValueText>
      </ProgressCircularContext>
    </ProgressCircular>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <ProgressCircularRootProvider :value="progress">
        <ProgressCircularLabel>Team rollout</ProgressCircularLabel>
        <CircularParts aria-label="Team rollout" />
      </ProgressCircularRootProvider>
    `,
    () => ({ progress: useProgress({ defaultValue: 58 }) }),
  ),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <ProgressCircular :default-value="72" :class="styles.customProgress">
      <ProgressCircularLabel>Monthly quota</ProgressCircularLabel>
      <CircularParts aria-label="Monthly quota" />
    </ProgressCircular>
  `),
};