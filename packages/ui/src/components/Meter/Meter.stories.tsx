import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from './Meter';
import styles from './Meter.stories.module.css';

const meta = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
  args: {
    value: 24,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Meter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Meter {...args}>
        <MeterLabel>Storage Used</MeterLabel>
        <MeterValue />
      </Meter>
    );
  },
};

export const MinMaxRange: Story = {
  render: () => {
    return (
      <Meter value={420} min={200} max={800}>
        <MeterLabel>Requests per minute</MeterLabel>
        <MeterValue />
      </Meter>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(45);

    return (
      <div className={styles.stack}>
        <Meter value={value}>
          <MeterLabel>Capacity</MeterLabel>
          <MeterValue />
        </Meter>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => {
            setValue(Number(event.target.value));
          }}
        />
      </div>
    );
  },
};

export const PercentFormat: Story = {
  render: () => {
    return (
      <Meter value={0.64} min={0} max={1} format={{ style: 'percent', maximumFractionDigits: 0 }}>
        <MeterLabel>Usage</MeterLabel>
        <MeterValue>{(formattedValue) => `${formattedValue} used`}</MeterValue>
      </Meter>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <Meter
        value={72}
        className={styles.customMeter}
        classNames={{ track: styles.customTrack, indicator: styles.customIndicator }}
      >
        <MeterLabel>Monthly quota</MeterLabel>
        <MeterValue />
      </Meter>
    );
  },
};

export const Composition: Story = {
  render: () => {
    return (
      <Meter value={58} withTrack={false} className={styles.composedMeter}>
        <MeterLabel>Team capacity</MeterLabel>
        <MeterValue>{(formattedValue) => `${formattedValue} available`}</MeterValue>
        <MeterTrack className={styles.composedTrack}>
          <MeterIndicator className={styles.composedIndicator} />
        </MeterTrack>
      </Meter>
    );
  },
};