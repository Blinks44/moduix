import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderMarks,
  AngleSliderRootProvider,
  AngleSliderThumb,
  AngleSliderValueText,
  useAngleSlider,
} from '@/components/angle-slider/AngleSlider';

const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);

const meta = {
  title: 'Components/AngleSlider',
  component: AngleSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AngleSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoRootClassName = '[&_[data-slot=angle-slider-control]]:w-36';
const stressRootClassName = 'max-w-48 [&_[data-slot=angle-slider-control]]:w-36';
const customControlClassName =
  'w-40 bg-[color-mix(in_oklab,var(--color-chart-4)_16%,var(--color-muted))] after:inset-4 after:bg-[color-mix(in_oklab,var(--color-chart-4)_10%,var(--color-card))]';
const customThumbClassName =
  'before:top-4 before:size-[1.125rem] before:border-background before:bg-chart-4 after:top-[2.375rem] after:h-[calc(50%-2.5rem)] after:from-chart-4';
const customMarkerClassName =
  'before:top-4.5 before:bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-border))] data-[state=under-value]:before:bg-[color-mix(in_oklab,var(--color-chart-4)_65%,var(--color-foreground))]';
const providerLayoutClassName = 'flex items-center gap-8';
const providerButtonClassName =
  'min-h-10 cursor-pointer rounded-md border border-border bg-background px-4 text-foreground [font:inherit] hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
const formClassName = 'grid justify-items-center gap-3';
const formActionsClassName = 'flex flex-wrap items-center justify-center gap-2';

function AngleSliderMarkedParts() {
  return (
    <>
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <AngleSlider defaultValue={135} aria-label="Rotation" className={demoRootClassName}>
      <AngleSliderDial />
      <AngleSliderHiddenInput />
    </AngleSlider>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AngleSlider asChild defaultValue={135} aria-label="Rotation">
      <div className={demoRootClassName}>
        <AngleSliderDial />
        <AngleSliderHiddenInput />
      </div>
    </AngleSlider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(210);

    return (
      <AngleSlider
        value={value}
        aria-label="Heading"
        className={demoRootClassName}
        onValueChange={(details) => setValue(details.value)}
      >
        <AngleSliderLabel>Heading</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <AngleSlider
      defaultValue={45}
      disabled
      aria-label="Disabled rotation"
      className={demoRootClassName}
    >
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

function FormStory() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(`${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`);
  };

  return (
    <form
      className={formClassName}
      onReset={() => setSubmitted('Nothing submitted')}
      onSubmit={handleSubmit}
    >
      <AngleSlider
        defaultValue={135}
        aria-label="Rotation"
        name="rotation"
        className={demoRootClassName}
      >
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
      <div className={formActionsClassName}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <output>Submitted: {submitted}</output>
      </div>
    </form>
  );
}

export const Form: Story = {
  render: () => <FormStory />,
};

export const Invalid: Story = {
  render: () => (
    <AngleSlider
      defaultValue={315}
      invalid
      aria-label="Invalid heading"
      className={demoRootClassName}
    >
      <AngleSliderLabel>Heading</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <AngleSlider
      defaultValue={300}
      readOnly
      aria-label="Locked angle"
      className={demoRootClassName}
    >
      <AngleSliderLabel>Locked angle</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

function RootProviderStory() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <div className={providerLayoutClassName}>
      <AngleSliderRootProvider value={angleSlider} className={demoRootClassName}>
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSliderRootProvider>
      <button
        type="button"
        className={providerButtonClassName}
        onClick={() => angleSlider.setValue(90)}
      >
        Set to 90°
      </button>
    </div>
  );
}

export const RootProvider: Story = {
  render: () => <RootProviderStory />,
};

export const Steps: Story = {
  render: () => (
    <AngleSlider defaultValue={60} step={15} aria-label="Snap angle" className={demoRootClassName}>
      <AngleSliderLabel>Snap angle</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <AngleSlider defaultValue={135} aria-label="Rotation" className={demoRootClassName}>
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const ContentStress: Story = {
  render: () => (
    <AngleSlider
      defaultValue={225}
      aria-label="Direction of the primary studio spotlight"
      className={stressRootClassName}
    >
      <AngleSliderLabel>Direction of the primary studio spotlight</AngleSliderLabel>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <AngleSlider defaultValue={45} aria-label="Compass heading">
      <AngleSliderLabel>Compass</AngleSliderLabel>
      <AngleSliderControl className={customControlClassName}>
        <AngleSliderValueText />
        <AngleSliderMarkerGroup>
          {markerValues.map((value) => (
            <AngleSliderMarker key={value} value={value} className={customMarkerClassName} />
          ))}
        </AngleSliderMarkerGroup>
        <AngleSliderThumb className={customThumbClassName} />
      </AngleSliderControl>
      <AngleSliderHiddenInput />
    </AngleSlider>
  ),
};