import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Slider, useSlider, useSliderContext } from '@/components/slider/Slider';

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
        <Slider.Label>Volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([24]);

    return (
      <Slider value={value} onValueChange={(details) => setValue(details.value)}>
        <div className={headerClassName}>
          <Slider.Label>Brightness</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Brightness">
            <Slider.HiddenInput />
          </Slider.Thumb>
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
          <Slider.Thumb index={0} aria-label="Minimum price">
            <Slider.HiddenInput />
          </Slider.Thumb>
          <Slider.Thumb index={1} aria-label="Maximum price">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
        <Slider.ValueText />
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
        <Slider.Label>Budget</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Minimum budget">
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1} aria-label="Maximum budget">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};

export const Marks: Story = {
  render: () => (
    <Slider defaultValue={[50]}>
      <div className={headerClassName}>
        <Slider.Label>Progress</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Progress">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 25, 50, 75, 100].map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  ),
};

export const DraggingIndicator: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <Slider.Label>Gain</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Gain">
          <Slider.DraggingIndicator />
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className={verticalContainerClassName}>
      <Slider orientation="vertical" defaultValue={[60]} className={verticalSliderClassName}>
        <Slider.Label>Output</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} aria-label="Output">
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider>
    </div>
  ),
};

export const VerticalWithMarks: Story = {
  render: () => (
    <Slider orientation="vertical" defaultValue={[50]} className={verticalSliderClassName}>
      <Slider.Label>Output</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 25, 50, 75, 100].map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[32]} disabled>
      <div className={headerClassName}>
        <Slider.Label>Notifications</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Notifications">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Slider defaultValue={[32]} invalid>
      <div className={headerClassName}>
        <Slider.Label>Invalid volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
      <Slider.MarkerGroup>
        {[0, 50, 100].map((value) => (
          <Slider.Marker key={value} value={value}>
            {value}
          </Slider.Marker>
        ))}
      </Slider.MarkerGroup>
    </Slider>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Slider defaultValue={[32]} readOnly>
      <div className={headerClassName}>
        <Slider.Label>Read-only volume</Slider.Label>
        <Slider.ValueText />
      </div>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  ),
};

export const Context: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <SliderContextStatus />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Context value">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};

function SliderContextStatus() {
  const slider = useSliderContext();

  return (
    <div className={headerClassName}>
      <Slider.Label>Dragging: {String(slider.dragging)}</Slider.Label>
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
        <Slider.RootProvider value={slider}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Volume">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.RootProvider>
      </div>
    );
  },
};

export const AsChild: Story = {
  render: () => (
    <Slider asChild defaultValue={[40]}>
      <section>
        <div className={headerClassName}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb asChild index={0} aria-label="Volume">
            <span>
              <Slider.HiddenInput />
            </span>
          </Slider.Thumb>
        </Slider.Control>
      </section>
    </Slider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Slider defaultValue={[56]} className={customSliderClassName}>
      <Slider.Label>Temperature</Slider.Label>
      <Slider.ValueText />
      <Slider.Control className={customControlClassName}>
        <Slider.Track className={customTrackClassName}>
          <Slider.Range className={customRangeClassName} />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Temperature" className={customThumbClassName}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  ),
};