import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  ProgressCircular,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  useProgress,
} from '@/components/progress-circular/ProgressCircular';
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@/components/slider/Slider';
import styles from './ProgressCircular.stories.module.css';

const meta = {
  title: 'Components/ProgressCircular',
  component: ProgressCircular,
  args: {
    defaultValue: 42,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressCircular>;

export default meta;

type Story = StoryObj<typeof meta>;

function CircularParts(props: { ariaLabel: string }) {
  return (
    <div class={styles.circleContainer}>
      <ProgressCircularRing aria-label={props.ariaLabel} />
      <ProgressCircularValueText />
    </div>
  );
}

export const Basic: Story = {
  render: (args) => (
    <ProgressCircular {...args}>
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
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
          <ProgressCircularLabel>Upload status</ProgressCircularLabel>
          <CircularParts ariaLabel="Upload status" />
        </ProgressCircular>
        <Slider
          class={styles.slider}
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
    <ProgressCircular defaultValue={70}>
      <ProgressCircularLabel>Import data</ProgressCircularLabel>
      <CircularParts ariaLabel="Import data" />
    </ProgressCircular>
  ),
};

export const MinMaxRange: Story = {
  render: () => (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
      <CircularParts ariaLabel="Requests per minute" />
    </ProgressCircular>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressCircular class={styles.indeterminateProgress} defaultValue={null}>
      <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
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
      <ProgressCircularLabel>Migration</ProgressCircularLabel>
      <ProgressCircularRing />
      <ProgressCircularContext>
        {(progress) => (
          <ProgressCircularValueText>{progress().valueAsString}</ProgressCircularValueText>
        )}
      </ProgressCircularContext>
    </ProgressCircular>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const progress = useProgress({ defaultValue: 58 });

    return (
      <ProgressCircularRootProvider value={progress}>
        <ProgressCircularLabel>Team rollout</ProgressCircularLabel>
        <CircularParts ariaLabel="Team rollout" />
      </ProgressCircularRootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <ProgressCircular defaultValue={72} class={styles.customProgress}>
      <ProgressCircularLabel>Monthly quota</ProgressCircularLabel>
      <CircularParts ariaLabel="Monthly quota" />
    </ProgressCircular>
  ),
};