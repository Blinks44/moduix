import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@/components/angle-slider/AngleSlider';
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
      <AngleSliderDial>
        <AngleSliderMarks values={markerValues} />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.demoRoot}>
        <AngleSliderDial />
        <AngleSliderHiddenInput />
      </AngleSlider>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <AngleSlider asChild defaultValue={135} aria-label="Rotation">
        <div className={styles.demoRoot}>
          <AngleSliderDial />
          <AngleSliderHiddenInput />
        </div>
      </AngleSlider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(210);

    return (
      <AngleSlider
        value={value}
        aria-label="Heading"
        className={styles.demoRoot}
        onValueChange={(details) => setValue(details.value)}
      >
        <AngleSliderLabel>Heading</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <AngleSlider
        defaultValue={45}
        disabled
        aria-label="Disabled rotation"
        className={styles.demoRoot}
      >
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

function FormStory() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(`${String(new FormData(event.currentTarget).get('rotation') ?? '')}°`);
  };

  return (
    <form
      className={styles.form}
      onReset={() => setSubmitted('Nothing submitted')}
      onSubmit={handleSubmit}
    >
      <AngleSlider
        defaultValue={135}
        aria-label="Rotation"
        name="rotation"
        className={styles.demoRoot}
      >
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
      <div className={styles.formActions}>
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
  render: () => {
    return (
      <AngleSlider
        defaultValue={315}
        invalid
        aria-label="Invalid heading"
        className={styles.demoRoot}
      >
        <AngleSliderLabel>Heading</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <AngleSlider
        defaultValue={300}
        readOnly
        aria-label="Locked angle"
        className={styles.demoRoot}
      >
        <AngleSliderLabel>Locked angle</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

function RootProviderStory() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <div className={styles.providerLayout}>
      <AngleSliderRootProvider value={angleSlider} className={styles.demoRoot}>
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSliderRootProvider>
      <button
        type="button"
        className={styles.providerButton}
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
  render: () => {
    return (
      <AngleSlider defaultValue={60} step={15} aria-label="Snap angle" className={styles.demoRoot}>
        <AngleSliderLabel>Snap angle</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const WithMarks: Story = {
  render: () => {
    return (
      <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.demoRoot}>
        <AngleSliderLabel>Rotation</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const ContentStress: Story = {
  render: () => {
    return (
      <AngleSlider
        defaultValue={225}
        aria-label="Direction of the primary studio spotlight"
        className={styles.stressRoot}
      >
        <AngleSliderLabel>Direction of the primary studio spotlight</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <AngleSlider defaultValue={45} aria-label="Compass heading" className={styles.customRoot}>
        <AngleSliderLabel>Compass</AngleSliderLabel>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};