import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  ColorPicker,
  parseColor,
  useColorPicker,
  ColorPickerRootProvider,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerView,
  ColorPickerSliders,
} from '@/components/color-picker/ColorPicker';
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

function ColorPickerField(props: { swatchList?: string[] }) {
  const swatchList = () => props.swatchList ?? swatches;

  return (
    <>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <div class={styles.sliderGroup}>
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPickerSliders />
          </div>
          <ColorPickerSwatchGroup>
            {swatchList().map((color) => (
              <ColorPickerSwatchTrigger value={color} />
            ))}
          </ColorPickerSwatchGroup>
        </ColorPickerContent>
      </ColorPickerPositioner>
      <ColorPickerHiddenInput />
    </>
  );
}

function InlinePicker() {
  return (
    <ColorPicker class={styles.inlineRoot} inline defaultValue={parseColor('#2563eb')}>
      <div class={styles.valueRow}>
        <ColorPickerLabel>Inline color</ColorPickerLabel>
        <ColorPickerValueText format="hex" />
      </div>
      <ColorPickerArea />
      <div class={styles.sliderGroup}>
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </div>
      <ColorPickerView format="rgba">
        <div class={styles.inputRow}>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </div>
      </ColorPickerView>
    </ColorPicker>
  );
}

function CompactTriggerPicker() {
  return (
    <ColorPicker class={styles.demoRoot} defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
          <span class={styles.triggerValue}>
            <span class={styles.triggerValueSwatch}>
              <ColorPickerTransparencyGrid />
              <ColorPickerValueSwatch />
            </span>
            <ColorPickerValueText format="hex" />
          </span>
        </ColorPickerTrigger>
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <div class={styles.sliderGroup}>
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPickerSliders />
          </div>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}

export const Basic: Story = {
  render: () => (
    <ColorPicker class={styles.demoRoot} defaultValue={parseColor('#eb5e41')}>
      <ColorPickerField />
    </ColorPicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal(parseColor('#16a34a'));

    return (
      <ColorPicker
        class={styles.demoRoot}
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <ColorPickerField />
      </ColorPicker>
    );
  },
};

export const Inline: Story = {
  render: () => <InlinePicker />,
};

export const CompactTrigger: Story = {
  render: () => <CompactTriggerPicker />,
};

export const RootProvider: Story = {
  render: () => {
    const colorPicker = useColorPicker({ defaultValue: parseColor('#9333ea') });

    return (
      <ColorPickerRootProvider class={styles.demoRoot} value={colorPicker}>
        <div class={styles.valueRow}>
          <ColorPickerLabel>Provider color</ColorPickerLabel>
          <ColorPickerValueText format="hex" />
        </div>
        <ColorPickerField />
      </ColorPickerRootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <ColorPicker class={styles.customRoot} defaultValue={parseColor('#0ea5e9')}>
      <ColorPickerField swatchList={['#0ea5e9', '#14b8a6', '#84cc16', '#f59e0b']} />
    </ColorPicker>
  ),
};