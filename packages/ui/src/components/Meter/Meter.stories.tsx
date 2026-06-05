import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Meter, MeterIndicator, MeterLabel, MeterRoot, MeterTrack, MeterValue } from './Meter';
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
    const [value, setValue] = useState(45);

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

export const LocaleAndFormat: Story = {
  render: () => {
    return (
      <Meter
        value={0.64}
        min={0}
        max={1}
        locale="de-DE"
        format={{ style: 'percent', maximumFractionDigits: 0 }}
      >
        <MeterLabel>Storage usage</MeterLabel>
        <MeterValue>{(formattedValue) => `${formattedValue} belegt`}</MeterValue>
      </Meter>
    );
  },
};

export const AriaValueText: Story = {
  render: () => {
    return (
      <Meter value={3} min={0} max={5} aria-valuetext="3 of 5 service checks are healthy">
        <MeterLabel>Service health</MeterLabel>
        <MeterValue>{() => '3 of 5 healthy'}</MeterValue>
      </Meter>
    );
  },
};

export const CustomValueText: Story = {
  render: () => {
    return (
      <Meter
        value={68}
        getAriaValueText={(formattedValue, value) =>
          `${formattedValue} percent of storage used (${value} of 100)`
        }
      >
        <MeterLabel>Storage usage</MeterLabel>
        <MeterValue>{(formattedValue) => `${formattedValue}% used`}</MeterValue>
      </Meter>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Meter value={72} className={styles.customMeter}>
        <MeterLabel>Monthly quota</MeterLabel>
        <MeterValue />
      </Meter>
    );
  },
};

export const Composition: Story = {
  render: () => {
    return (
      <MeterRoot value={58} className={styles.composedMeter}>
        <MeterLabel>Team capacity</MeterLabel>
        <MeterValue>{(formattedValue) => `${formattedValue} available`}</MeterValue>
        <MeterTrack className={styles.composedTrack}>
          <MeterIndicator className={styles.composedIndicator} />
        </MeterTrack>
      </MeterRoot>
    );
  },
};