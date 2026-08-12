import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ProgressLinear } from '@/components/progress-linear/ProgressLinear';
import styles from './ProgressLinear.stories.module.css';

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
  render: (args) => {
    return (
      <ProgressLinear {...args}>
        <ProgressLinear.Label>Export data</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Export data">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(45);

    return (
      <div className={styles.stack}>
        <ProgressLinear value={value} onValueChange={(details) => setValue(details.value)}>
          <ProgressLinear.Label>Upload status</ProgressLinear.Label>
          <ProgressLinear.ValueText />
          <ProgressLinear.Track aria-label="Upload status">
            <ProgressLinear.Range />
          </ProgressLinear.Track>
        </ProgressLinear>
        <input
          className={styles.rangeControl}
          type="range"
          min={0}
          max={100}
          value={value ?? 0}
          onChange={(event) => {
            setValue(Number(event.target.value));
          }}
        />
      </div>
    );
  },
};

export const InitialValue: Story = {
  render: () => {
    return (
      <ProgressLinear defaultValue={70}>
        <ProgressLinear.Label>Import data</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Import data">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const MinMaxRange: Story = {
  render: () => {
    return (
      <ProgressLinear defaultValue={420} min={200} max={800}>
        <ProgressLinear.Label>Requests per minute</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Requests per minute">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    return (
      <ProgressLinear defaultValue={null}>
        <ProgressLinear.Label>Preparing report</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Preparing report">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <ProgressLinear defaultValue={42} orientation="vertical" className={styles.verticalProgress}>
        <ProgressLinear.Label>Indexing files</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Indexing files">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const ValueText: Story = {
  render: () => {
    return (
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
          {(state) => <ProgressLinear.ValueText>{state.valueAsString}</ProgressLinear.ValueText>}
        </ProgressLinear.Context>
        <ProgressLinear.Track aria-label="Migration">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const progress = ProgressLinear.useProgress({ defaultValue: 58 });

    return (
      <ProgressLinear.RootProvider value={progress}>
        <ProgressLinear.Label>Team rollout</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track className={styles.composedTrack} aria-label="Team rollout">
          <ProgressLinear.Range className={styles.composedRange} />
        </ProgressLinear.Track>
      </ProgressLinear.RootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <ProgressLinear defaultValue={72} className={styles.customProgress}>
        <ProgressLinear.Label>Monthly quota</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track aria-label="Monthly quota">
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};