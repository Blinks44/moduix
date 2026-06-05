import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from './Progress';
import styles from './Progress.stories.module.css';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 24,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    return (
      <Progress {...args}>
        <ProgressLabel>Export data</ProgressLabel>
        <ProgressValue />
      </Progress>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(45);

    return (
      <div className={styles.stack}>
        <Progress value={value}>
          <ProgressLabel>Upload status</ProgressLabel>
          <ProgressValue />
        </Progress>
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

export const MinMaxRange: Story = {
  render: () => {
    return (
      <Progress value={420} min={200} max={800}>
        <ProgressLabel>Requests per minute</ProgressLabel>
        <ProgressValue />
      </Progress>
    );
  },
};

export const LocaleAndFormat: Story = {
  render: () => {
    return (
      <Progress
        value={0.64}
        min={0}
        max={1}
        locale="de-DE"
        format={{ style: 'percent', maximumFractionDigits: 0 }}
      >
        <ProgressLabel>Storage usage</ProgressLabel>
        <ProgressValue>{(formattedValue) => `${formattedValue} belegt`}</ProgressValue>
      </Progress>
    );
  },
};

export const Indeterminate: Story = {
  args: {
    value: null,
  },
  render: (args) => {
    return (
      <Progress {...args}>
        <ProgressLabel>Preparing report</ProgressLabel>
        <ProgressValue>{() => 'In progress'}</ProgressValue>
      </Progress>
    );
  },
};

export const AriaValueText: Story = {
  render: () => {
    return (
      <Progress value={3} min={0} max={5} aria-valuetext="3 of 5 onboarding steps completed">
        <ProgressLabel>Onboarding</ProgressLabel>
        <ProgressValue>{() => '3 of 5 complete'}</ProgressValue>
      </Progress>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <Progress value={72} className={styles.customProgress}>
        <ProgressLabel>Monthly quota</ProgressLabel>
        <ProgressValue />
      </Progress>
    );
  },
};

export const CustomValueText: Story = {
  render: () => {
    return (
      <Progress
        value={68}
        getAriaValueText={(formattedValue) => `${formattedValue} of task completed`}
      >
        <ProgressLabel>Migration</ProgressLabel>
        <ProgressValue>{(formattedValue) => `${formattedValue} done`}</ProgressValue>
      </Progress>
    );
  },
};

export const Composition: Story = {
  render: () => {
    return (
      <ProgressRoot value={58} className={styles.composedProgress}>
        <ProgressLabel>Team rollout</ProgressLabel>
        <ProgressValue>{(formattedValue) => `${formattedValue} shipped`}</ProgressValue>
        <ProgressTrack className={styles.composedTrack}>
          <ProgressIndicator className={styles.composedIndicator} />
        </ProgressTrack>
      </ProgressRoot>
    );
  },
};