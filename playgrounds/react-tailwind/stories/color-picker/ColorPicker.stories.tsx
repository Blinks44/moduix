import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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

function ColorPickerField({
  swatchList = swatches,
  triggerClassName,
  actionClassName,
}: {
  swatchList?: string[];
  triggerClassName?: string;
  actionClassName?: string;
}) {
  return (
    <>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" className={triggerClassName} />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <div className="flex items-center gap-3">
            <ColorPickerEyeDropperTrigger
              aria-label="Pick color from screen"
              className={actionClassName}
            />
            <ColorPickerSliders />
          </div>
          <ColorPickerSwatchGroup>
            {swatchList.map((color) => (
              <ColorPickerSwatchTrigger key={color} value={color} />
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
    <ColorPicker className="w-[17rem]" inline defaultValue={parseColor('#2563eb')}>
      <div className="flex items-center justify-between gap-3">
        <ColorPickerLabel>Inline color</ColorPickerLabel>
        <ColorPickerValueText format="hex" />
      </div>
      <ColorPickerArea />
      <div className="flex items-center gap-3">
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </div>
      <ColorPickerView format="rgba">
        <div className="flex min-w-0 gap-2">
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </div>
      </ColorPickerView>
    </ColorPicker>
  );
}

function CompactTriggerPicker() {
  return (
    <ColorPicker className="w-72" defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
          <span className="inline-flex items-center gap-2">
            <span className="relative grid size-4 shrink-0 overflow-hidden rounded-sm border border-border">
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
          <div className="flex items-center gap-3">
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
    <ColorPicker className="w-72" defaultValue={parseColor('#eb5e41')}>
      <ColorPickerField />
    </ColorPicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(parseColor('#16a34a'));

    return (
      <ColorPicker
        className="w-72"
        value={value}
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
      <ColorPickerRootProvider className="w-72" value={colorPicker}>
        <div className="flex items-center justify-between gap-3">
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
    <ColorPicker className="w-72" defaultValue={parseColor('#0ea5e9')}>
      <ColorPickerField
        actionClassName="hover:text-chart-4"
        swatchList={['#0ea5e9', '#14b8a6', '#84cc16', '#f59e0b']}
        triggerClassName="focus-visible:border-chart-4 focus-visible:outline-chart-4 data-[state=open]:border-chart-4 data-[state=open]:outline-chart-4"
      />
    </ColorPicker>
  ),
};