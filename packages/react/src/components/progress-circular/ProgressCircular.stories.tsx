import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from '../slider';
import { ProgressCircular, useProgressCircular } from './ProgressCircular';
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

function CircularParts() {
  return (
    <div className={styles.circleContainer}>
      <ProgressCircular.Circle>
        <ProgressCircular.CircleTrack />
        <ProgressCircular.CircleRange />
      </ProgressCircular.Circle>
      <ProgressCircular.ValueText />
    </div>
  );
}

export const Basic: Story = {
  render: (args) => {
    return (
      <ProgressCircular {...args}>
        <ProgressCircular.Label>Export data</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(42);

    return (
      <div className={styles.stack}>
        <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
          <ProgressCircular.Label>Upload status</ProgressCircular.Label>
          <CircularParts />
        </ProgressCircular>
        <Slider
          className={styles.slider}
          min={0}
          max={100}
          value={[value ?? 0]}
          onValueChange={(details) => {
            setValue(details.value[0] ?? 0);
          }}
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
  render: () => {
    return (
      <ProgressCircular defaultValue={70}>
        <ProgressCircular.Label>Import data</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular>
    );
  },
};

export const MinMaxRange: Story = {
  render: () => {
    return (
      <ProgressCircular defaultValue={420} min={200} max={800}>
        <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    return (
      <ProgressCircular defaultValue={null}>
        <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular>
    );
  },
};

export const ValueText: Story = {
  render: () => {
    return (
      <ProgressCircular
        translations={{
          value({ value, max }) {
            if (value === null) return 'Loading...';
            return `${value} of ${max}`;
          },
        }}
      >
        <ProgressCircular.Label>Migration</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const progress = useProgressCircular({ defaultValue: 58 });

    return (
      <ProgressCircular.RootProvider value={progress}>
        <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular.RootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <ProgressCircular defaultValue={72} className={styles.customProgress}>
        <ProgressCircular.Label>Monthly quota</ProgressCircular.Label>
        <CircularParts />
      </ProgressCircular>
    );
  },
};