import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from './Slider';
import styles from './Slider.stories.module.css';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Slider defaultValue={40}>
        <SliderLabel>Volume</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderThumb aria-label="Volume" />
      </Slider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(24);

    return (
      <Slider value={value} onValueChange={setValue}>
        <SliderLabel>Brightness</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderThumb aria-label="Brightness" />
      </Slider>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = React.useState<readonly number[]>([20, 70]);

    return (
      <Slider value={value} min={0} max={100} onValueChange={setValue}>
        <SliderLabel>Price range</SliderLabel>
        <SliderValue>{([minValue, maxValue]) => `${minValue} - ${maxValue}`}</SliderValue>
        <SliderThumb index={0} aria-label="Minimum price" />
        <SliderThumb index={1} aria-label="Maximum price" />
      </Slider>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className={styles.stack}>
        <div className={styles.verticalContainer}>
          <Slider orientation="vertical" defaultValue={60} className={styles.verticalSlider}>
            <SliderLabel>Output</SliderLabel>
            <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
            <SliderThumb aria-label="Output" />
          </Slider>
        </div>
      </div>
    );
  },
};

export const EdgeThumbAlignment: Story = {
  render: () => {
    return (
      <Slider defaultValue={0} thumbAlignment="edge">
        <SliderLabel>Zoom</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderThumb aria-label="Zoom" />
      </Slider>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Slider defaultValue={32} disabled>
        <SliderLabel>Notifications</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderThumb aria-label="Notifications" />
      </Slider>
    );
  },
};

export const CustomComposition: Story = {
  render: () => {
    return (
      <SliderRoot defaultValue={56}>
        <SliderLabel>Temperature</SliderLabel>
        <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
        <SliderControl className={styles.customControl}>
          <SliderTrack className={styles.customTrack}>
            <SliderIndicator className={styles.customIndicator} />
            <SliderThumb aria-label="Temperature" className={styles.customThumb} />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>
    );
  },
};