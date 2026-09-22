import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  useProgress,
} from '@/components/progress-linear/ProgressLinear';
import { Slider, SliderControl, SliderHiddenInput, SliderLabel, SliderRange, SliderThumb, SliderTrack, SliderValueText } from '@/components/slider/Slider';

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

export const Basic: Story = {
  render: (args) => (
    <ProgressLinear {...args}>
      <ProgressLinearLabel>Export data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Export data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<number | null>(45);

    return (
      <div class="grid gap-4">
        <ProgressLinear value={value()} onValueChange={(details) => setValue(details.value)}>
          <ProgressLinearLabel>Upload status</ProgressLinearLabel>
          <ProgressLinearValueText />
          <ProgressLinearTrack aria-label="Upload status">
            <ProgressLinearRange />
          </ProgressLinearTrack>
        </ProgressLinear>
        <Slider
          class="w-48"
          min={0}
          max={100}
          value={[value() ?? 0]}
          onValueChange={(details) => setValue(details.value[0] ?? 0)}
        >
          <SliderLabel>Progress value</SliderLabel>
          <SliderValueText />
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0} aria-label="Progress value">
              <SliderHiddenInput />
            </SliderThumb>
          </SliderControl>
        </Slider>
      </div>
    );
  },
};

export const InitialValue: Story = {
  render: () => (
    <ProgressLinear defaultValue={70}>
      <ProgressLinearLabel>Import data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Import data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};

export const MinMaxRange: Story = {
  render: () => (
    <ProgressLinear defaultValue={420} min={200} max={800}>
      <ProgressLinearLabel>Requests per minute</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Requests per minute">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressLinear defaultValue={null}>
      <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Preparing report">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ProgressLinear
      defaultValue={42}
      orientation="vertical"
      class="data-[orientation=vertical]:h-40"
    >
      <ProgressLinearLabel>Indexing files</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Indexing files">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};

export const ValueText: Story = {
  render: () => (
    <ProgressLinear
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max} items loaded`;
        },
      }}
    >
      <ProgressLinearLabel>Migration</ProgressLinearLabel>
      <ProgressLinearContext>
        {(state) => <ProgressLinearValueText>{state().valueAsString}</ProgressLinearValueText>}
      </ProgressLinearContext>
      <ProgressLinearTrack aria-label="Migration">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const progress = useProgress({ defaultValue: 58 });

    return (
      <ProgressLinearRootProvider value={progress}>
        <ProgressLinearLabel>Team rollout</ProgressLinearLabel>
        <ProgressLinearValueText />
        <ProgressLinearTrack
          class="h-4 rounded-md bg-background ring-1 ring-chart-3/55 ring-inset"
          aria-label="Team rollout"
        >
          <ProgressLinearRange class="rounded-[inherit] bg-linear-to-r from-chart-3 to-primary" />
        </ProgressLinearTrack>
      </ProgressLinearRootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <ProgressLinear defaultValue={72} class="w-64">
      <ProgressLinearLabel>Monthly quota</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack
        class="h-3 bg-accent ring-2 ring-primary/25 ring-inset"
        aria-label="Monthly quota"
      >
        <ProgressLinearRange class="bg-linear-to-r from-primary to-chart-2" />
      </ProgressLinearTrack>
    </ProgressLinear>
  ),
};
