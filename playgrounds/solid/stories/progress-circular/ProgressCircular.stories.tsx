import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ProgressCircular } from '@/components/progress-circular/ProgressCircular';
import { Slider } from '@/components/slider/Slider';
import styles from './ProgressCircular.stories.module.css';

const meta = {
  title: 'Components/ProgressCircular',
  component: ProgressCircular,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressCircular>;

export default meta;

type Story = StoryObj<typeof meta>;

function CircularParts(props: { ariaLabel: string }) {
  return (
    <div class={styles.circleContainer}>
      <ProgressCircular.Ring aria-label={props.ariaLabel} />
      <ProgressCircular.ValueText />
    </div>
  );
}

export const Basic: Story = {
  render: (args) => (
    <ProgressCircular {...args}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <CircularParts ariaLabel="Export data" />
    </ProgressCircular>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<number | null>(42);

    return (
      <div class={styles.stack}>
        <ProgressCircular value={value()} onValueChange={(details) => setValue(details.value)}>
          <ProgressCircular.Label>Upload status</ProgressCircular.Label>
          <CircularParts ariaLabel="Upload status" />
        </ProgressCircular>
        <Slider
          class={styles.slider}
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
    <ProgressCircular defaultValue={70}>
      <ProgressCircular.Label>Import data</ProgressCircular.Label>
      <CircularParts ariaLabel="Import data" />
    </ProgressCircular>
  ),
};

export const MinMaxRange: Story = {
  render: () => (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
      <CircularParts ariaLabel="Requests per minute" />
    </ProgressCircular>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressCircular class={styles.indeterminateProgress} defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <CircularParts ariaLabel="Preparing report" />
    </ProgressCircular>
  ),
};

export const ValueText: Story = {
  render: () => (
    <ProgressCircular
      translations={{
        value: ({ value, max }) => {
          if (value === null) return 'Migration: loading';
          return `Migration: ${value} of ${max}`;
        },
      }}
    >
      <ProgressCircular.Label>Migration</ProgressCircular.Label>
      <ProgressCircular.Ring />
      <ProgressCircular.Context>
        {(progress) => (
          <ProgressCircular.ValueText>{progress().valueAsString}</ProgressCircular.ValueText>
        )}
      </ProgressCircular.Context>
    </ProgressCircular>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const progress = ProgressCircular.useProgress({ defaultValue: 58 });

    return (
      <ProgressCircular.RootProvider value={progress}>
        <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
        <CircularParts ariaLabel="Team rollout" />
      </ProgressCircular.RootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <ProgressCircular defaultValue={72} class={styles.customProgress}>
      <ProgressCircular.Label>Monthly quota</ProgressCircular.Label>
      <CircularParts ariaLabel="Monthly quota" />
    </ProgressCircular>
  ),
};