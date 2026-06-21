import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { ProgressLinear, useProgressLinear } from './ProgressLinear';
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

function getProgressDemoRangeStyle(value: number | null, min = 0, max = 100): CSSProperties {
  const safeValue = value ?? min;
  const percent = ((safeValue - min) / (max - min)) * 100;

  return {
    '--progress-demo-range-percent': `${Math.max(0, Math.min(100, percent))}%`,
  } as CSSProperties;
}

export const Basic: Story = {
  render: (args) => {
    return (
      <ProgressLinear {...args}>
        <ProgressLinear.Label>Export data</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track>
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
          <ProgressLinear.Track>
            <ProgressLinear.Range />
          </ProgressLinear.Track>
        </ProgressLinear>
        <input
          className={styles.rangeControl}
          type="range"
          min={0}
          max={100}
          value={value ?? 0}
          style={getProgressDemoRangeStyle(value)}
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
        <ProgressLinear.Track>
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
        <ProgressLinear.Track>
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
        <ProgressLinear.Track>
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
        <ProgressLinear.ValueText />
        <ProgressLinear.Track>
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const progress = useProgressLinear({ defaultValue: 58 });

    return (
      <ProgressLinear.RootProvider value={progress}>
        <ProgressLinear.Label>Team rollout</ProgressLinear.Label>
        <ProgressLinear.ValueText />
        <ProgressLinear.Track className={styles.composedTrack}>
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
        <ProgressLinear.Track>
          <ProgressLinear.Range />
        </ProgressLinear.Track>
      </ProgressLinear>
    );
  },
};