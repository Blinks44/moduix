import {
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/vue/slider';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  useProgress,
} from '@/components/progress-linear';

const meta = {
  title: 'Components/ProgressLinear',
  component: ProgressLinear,
  tags: ['autodocs'],
  args: {
    defaultValue: 24,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressLinear>;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClass = 'grid gap-4';
const sliderClass = 'w-48';
const verticalProgressClass = 'data-[orientation=vertical]:h-40';
const rootProviderTrackClass = 'h-4 rounded-md bg-background ring-1 ring-chart-3/55 ring-inset';
const rootProviderRangeClass = 'rounded-[inherit] bg-linear-to-r from-chart-3 to-primary';
const customProgressClass = 'w-64';
const customTrackClass = 'h-3 bg-accent ring-2 ring-primary/25 ring-inset';
const customRangeClass = 'bg-linear-to-r from-primary to-chart-2';

const storyComponents = {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  ProgressLinearTrack,
  ProgressLinearValueText,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          customProgressClass,
          customRangeClass,
          customTrackClass,
          rootProviderRangeClass,
          rootProviderTrackClass,
          sliderClass,
          stackClass,
          verticalProgressClass,
          ...setup?.(),
        };
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
        <ProgressLinear v-bind="args">
          <ProgressLinearLabel>Export data</ProgressLinearLabel>
          <ProgressLinearValueText />
          <ProgressLinearTrack aria-label="Export data">
            <ProgressLinearRange />
          </ProgressLinearTrack>
        </ProgressLinear>
      `,
    }),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <ProgressLinear v-model="value">
          <ProgressLinearLabel>Upload status</ProgressLinearLabel>
          <ProgressLinearValueText />
          <ProgressLinearTrack aria-label="Upload status">
            <ProgressLinearRange />
          </ProgressLinearTrack>
        </ProgressLinear>
        <SliderRoot
          :class="sliderClass"
          :model-value="[value ?? 0]"
          :min="0"
          :max="100"
          @value-change="handleSliderValueChange"
        >
          <SliderLabel>Progress value</SliderLabel>
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
    () => {
      const value = ref<number | null>(45);
      const handleSliderValueChange = (details: { value: number[] }) => {
        value.value = details.value[0] ?? 0;
      };
      return { handleSliderValueChange, value };
    },
  ),
};

export const InitialValue: Story = {
  render: renderStory(`
    <ProgressLinear :default-value="70">
      <ProgressLinearLabel>Import data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Import data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  `),
};

export const MinMaxRange: Story = {
  render: renderStory(`
    <ProgressLinear :default-value="420" :min="200" :max="800">
      <ProgressLinearLabel>Requests per minute</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Requests per minute">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  `),
};

export const Indeterminate: Story = {
  render: renderStory(`
    <ProgressLinear :default-value="null">
      <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Preparing report">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  `),
};

export const Vertical: Story = {
  render: renderStory(`
    <ProgressLinear :default-value="42" orientation="vertical" :class="verticalProgressClass">
      <ProgressLinearLabel>Indexing files</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Indexing files">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  `),
};

export const ValueText: Story = {
  render: renderStory(
    `
      <ProgressLinear :translations="translations">
        <ProgressLinearLabel>Migration</ProgressLinearLabel>
        <ProgressLinearContext v-slot="state">
          <ProgressLinearValueText>{{ state.valueAsString }}</ProgressLinearValueText>
        </ProgressLinearContext>
        <ProgressLinearTrack aria-label="Migration">
          <ProgressLinearRange />
        </ProgressLinearTrack>
      </ProgressLinear>
    `,
    () => ({
      translations: {
        value: ({ value, max }: { value: number | null; max: number }) =>
          value === null ? 'Loading...' : `${value} of ${max} items loaded`,
      },
    }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <ProgressLinearRootProvider :value="progress">
        <ProgressLinearLabel>Team rollout</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack :class="rootProviderTrackClass" aria-label="Team rollout">
          <ProgressLinearRange :class="rootProviderRangeClass" />
        </ProgressLinearTrack>
      </ProgressLinearRootProvider>
    `,
    () => ({ progress: useProgress({ defaultValue: 58 }) }),
  ),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <ProgressLinear :default-value="72" :class="customProgressClass">
      <ProgressLinearLabel>Monthly quota</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack :class="customTrackClass" aria-label="Monthly quota">
        <ProgressLinearRange :class="customRangeClass" />
      </ProgressLinearTrack>
    </ProgressLinear>
  `),
};