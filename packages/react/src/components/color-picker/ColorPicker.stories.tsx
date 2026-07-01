import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ColorPicker, parseColor, useColorPicker } from './ColorPicker';
import styles from './ColorPicker.stories.module.css';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316', '#dc2626', '#9333ea'];

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

function ColorPickerField({ swatchList = swatches }: { swatchList?: string[] }) {
  return (
    <>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.ChannelInput channel="alpha" />
        <ColorPicker.Trigger aria-label="Open color picker">
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ValueSwatch />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <div className={styles.sliderGroup}>
            <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
            <div className={styles.channelSliders}>
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
              <ColorPicker.ChannelSlider channel="alpha">
                <ColorPicker.TransparencyGrid />
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
            </div>
          </div>
          <ColorPicker.SwatchGroup>
            {swatchList.map((color) => (
              <ColorPicker.SwatchTrigger key={color} value={color}>
                <ColorPicker.Swatch value={color}>
                  <ColorPicker.SwatchIndicator />
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            ))}
          </ColorPicker.SwatchGroup>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </>
  );
}

function InlinePicker() {
  return (
    <ColorPicker.Root className={styles.inlineRoot} inline defaultValue={parseColor('#2563eb')}>
      <div className={styles.valueRow}>
        <ColorPicker.Label>Inline color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <div className={styles.sliderGroup}>
        <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
        <div className={styles.channelSliders}>
          <ColorPicker.ChannelSlider channel="hue">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
          <ColorPicker.ChannelSlider channel="alpha">
            <ColorPicker.TransparencyGrid />
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
        </div>
      </div>
      <ColorPicker.View format="rgba">
        <div className={styles.inputRow}>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}

export const Basic: Story = {
  render: () => (
    <ColorPicker.Root className={styles.demoRoot} defaultValue={parseColor('#eb5e41')}>
      <ColorPickerField />
    </ColorPicker.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(() => parseColor('#16a34a'));

    return (
      <ColorPicker.Root
        className={styles.demoRoot}
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <ColorPickerField />
      </ColorPicker.Root>
    );
  },
};

export const Inline: Story = {
  render: () => <InlinePicker />,
};

export const RootProvider: Story = {
  render: () => {
    const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });

    return (
      <ColorPicker.RootProvider className={styles.demoRoot} value={colorPicker}>
        <div className={styles.valueRow}>
          <ColorPicker.Label>Provider color</ColorPicker.Label>
          <ColorPicker.ValueText format="hex" />
        </div>
        <ColorPickerField />
      </ColorPicker.RootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <ColorPicker.Root className={styles.customRoot} defaultValue={parseColor('#0ea5e9')}>
      <ColorPickerField swatchList={['#0ea5e9', '#14b8a6', '#84cc16', '#f59e0b']} />
    </ColorPicker.Root>
  ),
};