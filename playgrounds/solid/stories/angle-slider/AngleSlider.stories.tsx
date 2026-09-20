import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { AngleSlider, useAngleSlider } from '@/components/angle-slider/AngleSlider';
import styles from './AngleSlider.stories.module.css';

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

function AngleSliderMarkedParts() {
  return (
    <>
      <AngleSlider.Dial>
        <AngleSlider.Marks values={markerValues} />
      </AngleSlider.Dial>
      <AngleSlider.HiddenInput />
    </>
  );
}

export const Basic: Story = {
  render: () => (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.demoRoot}>
      <AngleSlider.Dial />
      <AngleSlider.HiddenInput />
    </AngleSlider>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AngleSlider
      asChild={(props) => <div {...props()} class={styles.demoRoot} />}
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
        class={styles.demoRoot}
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
    <AngleSlider defaultValue={45} disabled aria-label="Disabled rotation" class={styles.demoRoot}>
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
      class={styles.form}
      onReset={() => setSubmitted('Nothing submitted')}
      onSubmit={handleSubmit}
    >
      <AngleSlider defaultValue={135} aria-label="Rotation" name="rotation" class={styles.demoRoot}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
      <div class={styles.formActions}>
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
    <AngleSlider defaultValue={315} invalid aria-label="Invalid heading" class={styles.demoRoot}>
      <AngleSlider.Label>Heading</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <AngleSlider defaultValue={300} readOnly aria-label="Locked angle" class={styles.demoRoot}>
      <AngleSlider.Label>Locked angle</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

function RootProviderStory() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <div class={styles.providerLayout}>
      <AngleSlider.RootProvider value={angleSlider} class={styles.demoRoot}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider.RootProvider>
      <button
        type="button"
        class={styles.providerButton}
        onClick={() => angleSlider().setValue(90)}
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
    <AngleSlider defaultValue={60} step={15} aria-label="Snap angle" class={styles.demoRoot}>
      <AngleSlider.Label>Snap angle</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <AngleSlider defaultValue={135} aria-label="Rotation" class={styles.demoRoot}>
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
      class={styles.stressRoot}
    >
      <AngleSlider.Label>Direction of the primary studio spotlight</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <AngleSlider defaultValue={45} aria-label="Compass heading" class={styles.customRoot}>
      <AngleSlider.Label>Compass</AngleSlider.Label>
      <AngleSliderMarkedParts />
    </AngleSlider>
  ),
};