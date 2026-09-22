import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Slider, SliderControl, SliderDraggingIndicator, SliderHiddenInput, SliderLabel, SliderMarker, SliderMarkerGroup, SliderRange, SliderRootProvider, SliderThumb, SliderThumbs, SliderTrack, SliderValueText, useSlider, useSliderContext } from '@/components/slider/Slider';

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

const stackClassName = 'grid gap-4';
const headerClassName = 'flex items-center justify-between gap-3';
const valueClassName = 'text-sm leading-5 text-muted-foreground';
const verticalContainerClassName = 'flex h-56';
const verticalSliderClassName = 'h-48 w-auto';
const customSliderClassName = 'w-64';
const customControlClassName = 'min-h-6';
const customTrackClassName =
  'h-2.5 bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-muted))] ring-0';
const customRangeClassName = 'bg-chart-4';
const customThumbClassName = 'size-5 border-background bg-chart-4';

export const Basic: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <div className={headerClassName}>
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
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([24]);

    return (
      <Slider value={value} onValueChange={(details) => setValue(details.value)}>
        <div className={headerClassName}>
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
  render: () => (
    <Slider
      defaultValue={[250, 750]}
      min={0}
      max={1000}
      step={50}
      minStepsBetweenThumbs={2}
      thumbCollisionBehavior="push"
      getAriaValueText={(details) => `$${details.value}`}
    >
      <div className={headerClassName}>
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
  ),
};

export const Marks: Story = {
  render: () => (
    <Slider defaultValue={[50]}>
      <div className={headerClassName}>
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
  ),
};

export const DraggingIndicator: Story = {
  render: () => (
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
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className={verticalContainerClassName}>
      <Slider orientation="vertical" defaultValue={[60]} className={verticalSliderClassName}>
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
  ),
};

export const VerticalWithMarks: Story = {
  render: () => (
    <Slider orientation="vertical" defaultValue={[50]} className={verticalSliderClassName}>
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
  ),
};

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[32]} disabled>
      <div className={headerClassName}>
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
  ),
};

export const Invalid: Story = {
  render: () => (
    <Slider defaultValue={[32]} invalid>
      <div className={headerClassName}>
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
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Slider defaultValue={[32]} readOnly>
      <div className={headerClassName}>
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
  ),
};

export const Context: Story = {
  render: () => (
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
  ),
};

function SliderContextStatus() {
  const slider = useSliderContext();

  return (
    <div className={headerClassName}>
      <SliderLabel>Dragging: {String(slider.dragging)}</SliderLabel>
      <span className={valueClassName}>{slider.value.join(', ')}</span>
    </div>
  );
}

export const RootProvider: Story = {
  render: () => {
    const slider = useSlider({ defaultValue: [40] });

    return (
      <div className={stackClassName}>
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
  render: () => (
    <Slider asChild defaultValue={[40]}>
      <section>
        <div className={headerClassName}>
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
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Slider defaultValue={[56]} className={customSliderClassName}>
      <SliderLabel>Temperature</SliderLabel>
      <SliderValueText />
      <SliderControl className={customControlClassName}>
        <SliderTrack className={customTrackClassName}>
          <SliderRange className={customRangeClassName} />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Temperature" className={customThumbClassName}>
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  ),
};