import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
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

const stackClass = 'grid gap-4';
const headerClass = 'flex items-center justify-between gap-3';
const valueClass = 'text-sm leading-5 text-muted-foreground';
const verticalContainerClass = 'flex h-56';
const verticalSliderClass = 'h-48 w-auto';
const customSliderClass = 'w-64';
const customControlClass = 'min-h-6';
const customTrackClass =
  'h-2.5 bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-muted))] ring-0';
const customRangeClass = 'bg-chart-4';
const customThumbClass = 'size-5 border-background bg-chart-4';

export const Basic: Story = {
  render: () => (
    <Slider defaultValue={[40]}>
      <div class={headerClass}>
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
    const [value, setValue] = createSignal([24]);

    return (
      <Slider value={value()} onValueChange={(details) => setValue(details.value)}>
        <div class={headerClass}>
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
    const [value, setValue] = createSignal([20, 70]);

    return (
      <Slider
        value={value()}
        min={0}
        max={100}
        onValueChange={(details) => setValue(details.value)}
      >
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
      <div class={headerClass}>
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
      <div class={headerClass}>
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
          <SliderMarker value={value}>{value}</SliderMarker>
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
    <div class={verticalContainerClass}>
      <Slider orientation="vertical" defaultValue={[60]} class={verticalSliderClass}>
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
    <Slider orientation="vertical" defaultValue={[50]} class={verticalSliderClass}>
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
          <SliderMarker value={value}>{value}</SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[32]} disabled>
      <div class={headerClass}>
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
      <div class={headerClass}>
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
          <SliderMarker value={value}>{value}</SliderMarker>
        ))}
      </SliderMarkerGroup>
    </Slider>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Slider defaultValue={[32]} readOnly>
      <div class={headerClass}>
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
    <div class={headerClass}>
      <SliderLabel>Dragging: {String(slider().dragging)}</SliderLabel>
      <span class={valueClass}>{slider().value.join(', ')}</span>
    </div>
  );
}

export const RootProvider: Story = {
  render: () => {
    const slider = useSlider({ defaultValue: [40] });

    return (
      <div class={stackClass}>
        <Button onClick={() => slider().focus()}>Focus</Button>
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
    <Slider asChild={(props) => <section {...props()} />} defaultValue={[40]}>
      <div>
        <div class={headerClass}>
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb asChild={(props) => <span {...props()} />} index={0} aria-label="Volume">
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </div>
    </Slider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Slider defaultValue={[56]} class={customSliderClass}>
      <SliderLabel>Temperature</SliderLabel>
      <SliderValueText />
      <SliderControl class={customControlClass}>
        <SliderTrack class={customTrackClass}>
          <SliderRange class={customRangeClass} />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Temperature" class={customThumbClass}>
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  ),
};