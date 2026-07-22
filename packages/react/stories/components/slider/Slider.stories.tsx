import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../src/components/button';
import { Slider, useSlider, useSliderContext } from '../../../src/components/slider/Slider';
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
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
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
          <Slider.Label>Brightness</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Brightness"></Slider.Thumb>
        </Slider.Control>
      </Slider>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState([20, 70]);

    return (
      <Slider value={value} min={0} max={100} onValueChange={(details) => setValue(details.value)}>
        <Slider.Label>Price range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Minimum price"></Slider.Thumb>
          <Slider.Thumb index={1} aria-label="Maximum price"></Slider.Thumb>
        </Slider.Control>
        <Slider.ValueText />
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
          <Slider.Label>Budget</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Minimum budget"></Slider.Thumb>
          <Slider.Thumb index={1} aria-label="Maximum budget"></Slider.Thumb>
        </Slider.Control>
      </Slider>
    );
  },
};

export const Marks: Story = {
  render: () => {
    return (
      <Slider defaultValue={[50]}>
        <div className={styles.header}>
          <Slider.Label>Progress</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Progress"></Slider.Thumb>
        </Slider.Control>
        <Slider.MarkerGroup>
          {[0, 25, 50, 75, 100].map((value) => (
            <Slider.Marker key={value} value={value}>
              {value}
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      </Slider>
    );
  },
};

export const DraggingIndicator: Story = {
  render: () => {
    return (
      <Slider defaultValue={[40]}>
        <Slider.Label>Gain</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Gain">
            <Slider.DraggingIndicator />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className={styles.verticalContainer}>
        <Slider orientation="vertical" defaultValue={[60]} className={styles.verticalSlider}>
          <Slider.Label>Output</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Output"></Slider.Thumb>
          </Slider.Control>
        </Slider>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Slider defaultValue={[32]} disabled>
        <div className={styles.header}>
          <Slider.Label>Notifications</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Notifications"></Slider.Thumb>
        </Slider.Control>
      </Slider>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Slider defaultValue={[40]}>
        <SliderContextStatus />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Context value"></Slider.Thumb>
        </Slider.Control>
      </Slider>
    );
  },
};

function SliderContextStatus() {
  const slider = useSliderContext();

  return (
    <div className={styles.header}>
      <Slider.Label>Dragging: {String(slider.dragging)}</Slider.Label>
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
        <Slider.RootProvider value={slider}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Volume"></Slider.Thumb>
          </Slider.Control>
        </Slider.RootProvider>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <Slider defaultValue={[56]} className={styles.customSlider}>
        <Slider.Label>Temperature</Slider.Label>
        <Slider.ValueText />
        <Slider.Control className={styles.customControl}>
          <Slider.Track className={styles.customTrack}>
            <Slider.Range className={styles.customRange} />
          </Slider.Track>
          <Slider.Thumb
            index={0}
            aria-label="Temperature"
            className={styles.customThumb}
          ></Slider.Thumb>
        </Slider.Control>
      </Slider>
    );
  },
};