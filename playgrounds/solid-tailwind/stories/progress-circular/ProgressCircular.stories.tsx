import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  ProgressCircular,
  ProgressCircularCircle,
  ProgressCircularCircleRange,
  ProgressCircularCircleTrack,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularRootProvider,
  ProgressCircularValueText,
  useProgress,
} from '@/components/progress-circular/ProgressCircular';
import { Slider } from '@/components/slider/Slider';
import { cn } from '@/lib/moduix/cn';

const meta = {
  title: 'Components/ProgressCircular',
  component: ProgressCircular,
  args: {
    defaultValue: 42,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProgressCircular>;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClass = 'grid justify-items-center gap-4';
const sliderClass = 'w-48';
const circleContainerClass = 'relative inline-grid place-items-center';
const overlayClass = 'col-start-1 row-start-1';

function CircularParts(props: {
  ariaLabel: string;
  circleClass?: string;
  rangeClass?: string;
  trackClass?: string;
}) {
  const circle =
    props.rangeClass || props.trackClass ? (
      <ProgressCircularCircle
        class={cn(overlayClass, props.circleClass)}
        aria-label={props.ariaLabel}
      >
        <ProgressCircularCircleTrack class={props.trackClass} />
        <ProgressCircularCircleRange class={props.rangeClass} />
      </ProgressCircularCircle>
    ) : (
      <ProgressCircularRing
        aria-label={props.ariaLabel}
        class={cn(overlayClass, props.circleClass)}
      />
    );

  return (
    <div class={circleContainerClass}>
      {circle}
      <ProgressCircularValueText class={overlayClass} />
    </div>
  );
}

export const Basic: Story = {
  render: (args) => (
    <ProgressCircular {...args}>
      <ProgressCircularLabel>Export data</ProgressCircularLabel>
      <CircularParts ariaLabel="Export data" />
    </ProgressCircular>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<number | null>(42);

    return (
      <div class={stackClass}>
        <ProgressCircular value={value()} onValueChange={(details) => setValue(details.value)}>
          <ProgressCircularLabel>Upload status</ProgressCircularLabel>
          <CircularParts ariaLabel="Upload status" />
        </ProgressCircular>
        <Slider
          class={sliderClass}
          min={0}
          max={100}
          value={[value() ?? 0]}
          onValueChange={(details) => setValue(details.value[0] ?? 0)}
        >
          <Slider.Label>Progress value</Slider.Label>
          <Slider.ValueText />
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} aria-label="Progress value">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider>
      </div>
    );
  },
};

export const InitialValue: Story = {
  render: () => (
    <ProgressCircular defaultValue={70}>
      <ProgressCircularLabel>Import data</ProgressCircularLabel>
      <CircularParts ariaLabel="Import data" />
    </ProgressCircular>
  ),
};

export const MinMaxRange: Story = {
  render: () => (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircularLabel>Requests per minute</ProgressCircularLabel>
      <CircularParts ariaLabel="Requests per minute" />
    </ProgressCircular>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <ProgressCircular defaultValue={null}>
      <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
      <CircularParts
        ariaLabel="Preparing report"
        rangeClass="data-[state=indeterminate]:stroke-chart-4"
      />
    </ProgressCircular>
  ),
};

export const ValueText: Story = {
  render: () => (
    <ProgressCircular
      translations={{
        value: ({ value, max }) => {
          if (value === null) return 'Migration: loading';
          return `Migration: ${value} of ${max}`;
        },
      }}
    >
      <ProgressCircularLabel>Migration</ProgressCircularLabel>
      <ProgressCircularRing />
      <ProgressCircularContext>
        {(progress) => (
          <ProgressCircularValueText>{progress().valueAsString}</ProgressCircularValueText>
        )}
      </ProgressCircularContext>
    </ProgressCircular>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const progress = useProgress({ defaultValue: 58 });

    return (
      <ProgressCircularRootProvider value={progress}>
        <ProgressCircularLabel>Team rollout</ProgressCircularLabel>
        <CircularParts ariaLabel="Team rollout" />
      </ProgressCircularRootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => (
    <ProgressCircular defaultValue={72}>
      <ProgressCircularLabel>Monthly quota</ProgressCircularLabel>
      <CircularParts
        ariaLabel="Monthly quota"
        circleClass="[--size:4rem] [--thickness:0.4rem]"
        trackClass="stroke-primary/25"
        rangeClass="stroke-chart-2 drop-shadow-[0_0_0.25rem_color-mix(in_oklab,var(--color-chart-2),transparent_45%)]"
      />
    </ProgressCircular>
  ),
};
