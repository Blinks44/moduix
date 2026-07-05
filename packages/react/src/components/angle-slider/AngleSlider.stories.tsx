import type { Meta, StoryObj } from '@storybook/react-vite';
import { useAngleSlider } from '@ark-ui/react/angle-slider';
import { useState } from 'react';
import { AngleSlider } from './AngleSlider';
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

function MarkerRing() {
  return (
    <AngleSlider.MarkerGroup>
      {markerValues.map((value) => (
        <AngleSlider.Marker key={value} value={value} />
      ))}
    </AngleSlider.MarkerGroup>
  );
}

function AngleSliderParts() {
  return (
    <>
      <AngleSlider.Control>
        <MarkerRing />
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </>
  );
}

export const Basic: Story = {
  render: () => {
    return (
      <AngleSlider.Root defaultValue={135} aria-label="Rotation" className={styles.demoRoot}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(210);

    return (
      <AngleSlider.Root
        value={value}
        aria-label="Heading"
        className={styles.demoRoot}
        onValueChange={(details) => setValue(details.value)}
      >
        <AngleSlider.Label>Heading</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    );
  },
};

export const Steps: Story = {
  render: () => {
    return (
      <AngleSlider.Root
        defaultValue={60}
        step={15}
        aria-label="Snap angle"
        className={styles.demoRoot}
      >
        <AngleSlider.Label>Snap angle</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <AngleSlider.Root
        defaultValue={300}
        readOnly
        aria-label="Locked angle"
        className={styles.demoRoot}
      >
        <AngleSlider.Label>Locked angle</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <AngleSlider.Root
        defaultValue={45}
        disabled
        aria-label="Disabled rotation"
        className={styles.demoRoot}
      >
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    );
  },
};

function RootProviderStory() {
  const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });

  return (
    <div className={styles.providerLayout}>
      <AngleSlider.RootProvider value={angleSlider} className={styles.demoRoot}>
        <AngleSlider.Label>Rotation</AngleSlider.Label>
        <AngleSliderParts />
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

export const CustomStyling: Story = {
  render: () => {
    return (
      <AngleSlider.Root
        defaultValue={45}
        aria-label="Compass heading"
        className={styles.customRoot}
      >
        <AngleSlider.Label>Compass</AngleSlider.Label>
        <AngleSliderParts />
      </AngleSlider.Root>
    );
  },
};