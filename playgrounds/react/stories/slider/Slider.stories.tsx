import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button';
import {
  Slider,
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRootProvider,
  SliderThumb,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
  useSliderContext,
} from '@/components/slider/Slider';
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
      <Slider defaultValue={[40]}>
        <div className={styles.header}>
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([24]);

    return (
      <Slider value={value} onValueChange={(details) => setValue(details.value)}>
        <div className={styles.header}>
          <SliderLabel>Brightness</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Brightness">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([20, 70]);

    return (
      <Slider value={value} min={0} max={100} onValueChange={(details) => setValue(details.value)}>
        <SliderLabel>Price range</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Minimum price">
            <SliderHiddenInput />
          </SliderThumb>
          <SliderThumb index={1} aria-label="Maximum price">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
        <SliderValueText />
      </Slider>
    );
  },
};

export const StepsAndConstraints: Story = {
  render: () => {
    return (
      <Slider
        defaultValue={[250, 750]}
        min={0}
        max={1000}
        step={50}
        minStepsBetweenThumbs={2}
        thumbCollisionBehavior="push"
        getAriaValueText={(details) => `$${details.value}`}
      >
        <div className={styles.header}>
          <SliderLabel>Budget</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Minimum budget">
            <SliderHiddenInput />
          </SliderThumb>
          <SliderThumb index={1} aria-label="Maximum budget">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};

export const Marks: Story = {
  render: () => {
    return (
      <Slider defaultValue={[50]}>
        <div className={styles.header}>
          <SliderLabel>Progress</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Progress">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
        <SliderMarkerGroup>
          {[0, 25, 50, 75, 100].map((value) => (
            <SliderMarker key={value} value={value}>
              {value}
            </SliderMarker>
          ))}
        </SliderMarkerGroup>
      </Slider>
    );
  },
};

export const DraggingIndicator: Story = {
  render: () => {
    return (
      <Slider defaultValue={[40]}>
        <SliderLabel>Gain</SliderLabel>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Gain">
            <SliderDraggingIndicator />
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className={styles.verticalContainer}>
        <Slider orientation="vertical" defaultValue={[60]} className={styles.verticalSlider}>
          <SliderLabel>Output</SliderLabel>
          <SliderValueText />
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0} aria-label="Output">
              <SliderHiddenInput />
            </SliderThumb>
          </SliderControl>
        </Slider>
      </div>
    );
  },
};

export const VerticalWithMarks: Story = {
  render: () => {
    return (
      <Slider orientation="vertical" defaultValue={[50]} className={styles.verticalSlider}>
        <SliderLabel>Output</SliderLabel>
        <SliderValueText />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
        <SliderMarkerGroup>
          {[0, 25, 50, 75, 100].map((value) => (
            <SliderMarker key={value} value={value}>
              {value}
            </SliderMarker>
          ))}
        </SliderMarkerGroup>
      </Slider>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Slider defaultValue={[32]} disabled>
        <div className={styles.header}>
          <SliderLabel>Notifications</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Notifications">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <Slider defaultValue={[32]} invalid>
        <div className={styles.header}>
          <SliderLabel>Invalid volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
        <SliderMarkerGroup>
          {[0, 50, 100].map((value) => (
            <SliderMarker key={value} value={value}>
              {value}
            </SliderMarker>
          ))}
        </SliderMarkerGroup>
      </Slider>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <Slider defaultValue={[32]} readOnly>
        <div className={styles.header}>
          <SliderLabel>Read-only volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Slider defaultValue={[40]}>
        <SliderContextStatus />
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Context value">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};

function SliderContextStatus() {
  const slider = useSliderContext();

  return (
    <div className={styles.header}>
      <SliderLabel>Dragging: {String(slider.dragging)}</SliderLabel>
      <span className={styles.value}>{slider.value.join(', ')}</span>
    </div>
  );
}

export const RootProvider: Story = {
  render: () => {
    const slider = useSlider({ defaultValue: [40] });

    return (
      <div className={styles.stack}>
        <Button onClick={() => slider.focus()}>Focus</Button>
        <SliderRootProvider value={slider}>
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0} aria-label="Volume">
              <SliderHiddenInput />
            </SliderThumb>
          </SliderControl>
        </SliderRootProvider>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Slider asChild defaultValue={[40]}>
        <section>
          <div className={styles.header}>
            <SliderLabel>Volume</SliderLabel>
            <SliderValueText />
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb asChild index={0} aria-label="Volume">
              <span>
                <SliderHiddenInput />
              </span>
            </SliderThumb>
          </SliderControl>
        </section>
      </Slider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Slider defaultValue={[56]} className={styles.customSlider}>
        <SliderLabel>Temperature</SliderLabel>
        <SliderValueText />
        <SliderControl className={styles.customControl}>
          <SliderTrack className={styles.customTrack}>
            <SliderRange className={styles.customRange} />
          </SliderTrack>
          <SliderThumb index={0} aria-label="Temperature" className={styles.customThumb}>
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>
    );
  },
};