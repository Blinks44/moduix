import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ProgressLinear } from '@/components/progress-linear/ProgressLinear';
import { Slider } from '@/components/slider/Slider';

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
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Export data">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<number | null>(45);

    return (
      <div class="grid gap-4">
        <ProgressLinear value={value()} onValueChange={(details) => setValue(details.value)}>
          <ProgressLinear.Label>Upload status</ProgressLinear.Label>
          <ProgressLinear.ValueText />
          <ProgressLinear.Track aria-label="Upload status">
            <ProgressLinear.Range />
          </ProgressLinear.Track>
        </ProgressLinear>
        <Slider
          class="w-48"
          min={0}
          max={100}
          value={[value() ?? 0]}
          onValueChange={(details) => setValue(details.value[0] ?? 0)}
        >
          <Slider.Label>Progress value</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Progress value">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider>
      </div>
    );
  },
};

export const InitialValue: Story = {
  render: () => (
    <ProgressLinear defaultValue={70}>
      <ProgressLinear.Label>Import data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Import data">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  ),
};

export const MinMaxRange: Story = {
  render: () => (
    <ProgressLinear defaultValue={420} min={200} max={800}>
      <ProgressLinear.Label>Requests per minute</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Requests per minute">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressLinear defaultValue={null}>
      <ProgressLinear.Label>Preparing report</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Preparing report">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
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
      <ProgressLinear.Label>Indexing files</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Indexing files">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
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
      <ProgressLinear.Label>Migration</ProgressLinear.Label>
      <ProgressLinear.Context>
        {(state) => <ProgressLinear.ValueText>{state().valueAsString}</ProgressLinear.ValueText>}
      </ProgressLinear.Context>
      <ProgressLinear.Track aria-label="Migration">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const progress = ProgressLinear.useProgress({ defaultValue: 58 });

    return (
      <ProgressLinear.RootProvider value={progress}>
        <ProgressLinear.Label>Team rollout</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track
          class="h-4 rounded-md bg-background outline-1 -outline-offset-1 outline-chart-3/55"
          aria-label="Team rollout"
        >
          <ProgressLinear.Range class="rounded-[inherit] bg-linear-to-r from-chart-3 to-primary" />
        </ProgressLinear.Track>
      </ProgressLinear.RootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <ProgressLinear defaultValue={72} class="w-64">
      <ProgressLinear.Label>Monthly quota</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track
        class="h-3 bg-accent outline-2 -outline-offset-1 outline-primary/25"
        aria-label="Monthly quota"
      >
        <ProgressLinear.Range class="bg-linear-to-r from-primary to-chart-2" />
      </ProgressLinear.Track>
    </ProgressLinear>
  ),
};