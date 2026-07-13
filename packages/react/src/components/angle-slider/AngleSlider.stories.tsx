import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AngleSlider, useAngleSlider } from './AngleSlider';
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
      <AngleSlider.ValueText />
    </>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.demoRoot}>
        <AngleSlider.Dial />
      </AngleSlider>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <AngleSlider asChild defaultValue={135} aria-label="Rotation">
        <div className={styles.demoRoot}>
          <AngleSlider.Dial />
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
        <AngleSlider.Label>Heading</AngleSlider.Label>
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
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const Form: Story = {
  render: () => {
    return (
      <AngleSlider
        defaultValue={135}
        aria-label="Rotation"
        name="rotation"
        className={styles.demoRoot}
      >
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
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
        <AngleSlider.Label>Heading</AngleSlider.Label>
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
        <AngleSlider.Label>Locked angle</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

function RootProviderStory() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <div className={styles.providerLayout}>
      <AngleSlider.RootProvider value={angleSlider} className={styles.demoRoot}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider.RootProvider>
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
        <AngleSlider.Label>Snap angle</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const WithMarks: Story = {
  render: () => {
    return (
      <AngleSlider defaultValue={135} aria-label="Rotation" className={styles.demoRoot}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <AngleSlider defaultValue={45} aria-label="Compass heading" className={styles.customRoot}>
        <AngleSlider.Label>Compass</AngleSlider.Label>
        <AngleSliderMarkedParts />
      </AngleSlider>
    );
  },
};