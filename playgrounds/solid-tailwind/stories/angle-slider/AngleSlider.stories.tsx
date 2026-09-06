import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { AngleSlider, useAngleSlider } from '@/components/angle-slider/AngleSlider';

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

const demoRootClass = '[&_[data-slot=angle-slider-control]]:w-36';
const stressRootClass = 'max-w-48 [&_[data-slot=angle-slider-control]]:w-36';
const customControlClass =
  'w-40 bg-[color-mix(in_oklab,var(--color-chart-4)_16%,var(--color-muted))] after:inset-4 after:bg-[color-mix(in_oklab,var(--color-chart-4)_10%,var(--color-card))]';
const customThumbClass =
  'before:top-4 before:size-[1.125rem] before:border-background before:bg-chart-4 after:top-[2.375rem] after:h-[calc(50%-2.5rem)] after:from-chart-4';
const customMarkerClass =
  'before:top-4.5 before:bg-[color-mix(in_oklab,var(--color-chart-4)_18%,var(--color-border))] data-[state=under-value]:before:bg-[color-mix(in_oklab,var(--color-chart-4)_65%,var(--color-foreground))]';
const providerLayoutClass = 'flex items-center gap-8';
const providerButtonClass =
  'min-h-10 cursor-pointer rounded-md border border-border bg-background px-4 text-foreground [font:inherit] hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
const formClass = 'grid justify-items-center gap-3';
const formActionsClass = 'flex flex-wrap items-center justify-center gap-2';

function AngleSliderMarkedParts() {
  return (
    <>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={demoRootClass}>
      <AngleSlider.Dial />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AngleSlider
      asChild={(props) => <div {...props()} class={demoRootClass} />}
      defaultValue={135}
      aria-label="Rotation"
    >
      <AngleSlider.Dial />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal(210);

    return (
      <AngleSlider
        value={value()}
        aria-label="Heading"
        class={demoRootClass}
        onValueChange={(details) => setValue(details.value)}
      >
        <AngleSlider.Label>Heading</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <AngleSlider defaultValue={45} disabled aria-label="Disabled rotation" class={demoRootClass}>
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

function FormStory() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(`${String(new FormData(form).get('rotation') ?? '')}°`);
  };

  return (
    <form
      class={formClass}
      onReset={() => setSubmitted('Nothing submitted')}
      onSubmit={handleSubmit}
    >
      <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation" class={demoRootClass}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
      <div class={formActionsClass}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        <output>Submitted: {submitted()}</output>
      </div>
    </form>
  );
}

export const Form: Story = {
  render: () => <FormStory />,
};

export const Invalid: Story = {
  render: () => (
    <AngleSlider defaultValue={315} invalid aria-label="Invalid heading" class={demoRootClass}>
      <AngleSlider.Label>Heading</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <AngleSlider defaultValue={300} readOnly aria-label="Locked angle" class={demoRootClass}>
      <AngleSlider.Label>Locked angle</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

function RootProviderStory() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <div class={providerLayoutClass}>
      <AngleSlider.RootProvider value={angleSlider} class={demoRootClass}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider.RootProvider>
      <button type="button" class={providerButtonClass} onClick={() => angleSlider().setValue(90)}>
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
    <AngleSlider defaultValue={60} step={15} aria-label="Snap angle" class={demoRootClass}>
      <AngleSlider.Label>Snap angle</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={demoRootClass}>
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const ContentStress: Story = {
  render: () => (
    <AngleSlider
      defaultValue={225}
      aria-label="Direction of the primary studio spotlight"
      class={stressRootClass}
    >
      <AngleSlider.Label>Direction of the primary studio spotlight</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <AngleSlider defaultValue={45} aria-label="Compass heading">
      <AngleSlider.Label>Compass</AngleSlider.Label>
      <AngleSlider.Control class={customControlClass}>
        <AngleSlider.MarkerGroup>
          {markerValues.map((value) => (
            <AngleSlider.Marker value={value} class={customMarkerClass} />
          ))}
        </AngleSlider.MarkerGroup>
        <AngleSlider.Thumb class={customThumbClass} />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  ),
};