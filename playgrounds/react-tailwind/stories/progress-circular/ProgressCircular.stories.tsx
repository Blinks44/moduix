import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ProgressCircular } from '@/components/progress-circular/ProgressCircular';
import { Slider } from '@/components/slider';
import { cn } from '@/lib/moduix/cn';

const meta = {
  title: 'Components/ProgressCircular',
  component: ProgressCircular,
  tags: ['autodocs'],
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

function CircularParts({
  ariaLabel,
  circleClass,
  rangeClass,
  trackClass,
}: {
  ariaLabel: string;
  circleClass?: string;
  rangeClass?: string;
  trackClass?: string;
}) {
  const circle =
    rangeClass || trackClass ? (
      <ProgressCircular.Circle className={cn(overlayClass, circleClass)} aria-label={ariaLabel}>
        <ProgressCircular.CircleTrack className={trackClass} />
        <ProgressCircular.CircleRange className={rangeClass} />
      </ProgressCircular.Circle>
    ) : (
      <ProgressCircular.Ring aria-label={ariaLabel} className={cn(overlayClass, circleClass)} />
    );

  return (
    <div className={circleContainerClass}>
      {circle}
      <ProgressCircular.ValueText className={overlayClass} />
    </div>
  );
}

export const Basic: Story = {
  render: (args) => {
    return (
      <ProgressCircular {...args}>
        <ProgressCircular.Label>Export data</ProgressCircular.Label>
        <CircularParts ariaLabel="Export data" />
      </ProgressCircular>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(42);

    return (
      <div className={stackClass}>
        <ProgressCircular value={value} onValueChange={(details) => setValue(details.value)}>
          <ProgressCircular.Label>Upload status</ProgressCircular.Label>
          <CircularParts ariaLabel="Upload status" />
        </ProgressCircular>
        <Slider
          className={sliderClass}
          min={0}
          max={100}
          value={[value ?? 0]}
          onValueChange={(details) => {
            setValue(details.value[0] ?? 0);
          }}
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
  render: () => {
    return (
      <ProgressCircular defaultValue={70}>
        <ProgressCircular.Label>Import data</ProgressCircular.Label>
        <CircularParts ariaLabel="Import data" />
      </ProgressCircular>
    );
  },
};

export const MinMaxRange: Story = {
  render: () => {
    return (
      <ProgressCircular defaultValue={420} min={200} max={800}>
        <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
        <CircularParts ariaLabel="Requests per minute" />
      </ProgressCircular>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    return (
      <ProgressCircular defaultValue={null}>
        <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
        <CircularParts
          ariaLabel="Preparing report"
          rangeClass="data-[state=indeterminate]:stroke-chart-4"
        />
      </ProgressCircular>
    );
  },
};

export const ValueText: Story = {
  render: () => {
    return (
      <ProgressCircular
        translations={{
          value({ value, max }) {
            if (value === null) return 'Migration: loading';
            return `Migration: ${value} of ${max}`;
          },
        }}
      >
        <ProgressCircular.Label>Migration</ProgressCircular.Label>
        <ProgressCircular.Ring />
        <ProgressCircular.Context>
          {(progress) => (
            <ProgressCircular.ValueText>{progress.valueAsString}</ProgressCircular.ValueText>
          )}
        </ProgressCircular.Context>
      </ProgressCircular>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const progress = ProgressCircular.useProgress({ defaultValue: 58 });

    return (
      <ProgressCircular.RootProvider value={progress}>
        <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
        <CircularParts ariaLabel="Team rollout" />
      </ProgressCircular.RootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <ProgressCircular defaultValue={72}>
        <ProgressCircular.Label>Monthly quota</ProgressCircular.Label>
        <CircularParts
          ariaLabel="Monthly quota"
          circleClass="[--size:4rem] [--thickness:0.4rem]"
          trackClass="stroke-primary/25"
          rangeClass="stroke-chart-2 drop-shadow-[0_0_0.25rem_color-mix(in_oklab,var(--color-chart-2),transparent_45%)]"
        />
      </ProgressCircular>
    );
  },
};