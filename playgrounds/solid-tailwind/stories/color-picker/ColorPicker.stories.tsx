import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ColorPicker, parseColor, useColorPicker } from '@/components/color-picker/ColorPicker';

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

function ColorPickerField(props: {
  swatchList?: string[];
  triggerClass?: string;
  actionClass?: string;
}) {
  const swatchList = () => props.swatchList ?? swatches;

  return (
    <>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" class={props.triggerClass} />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <div class="flex items-center gap-3">
            <ColorPicker.EyeDropperTrigger
              aria-label="Pick color from screen"
              class={props.actionClass}
            />
            <ColorPicker.Sliders />
          </div>
          <ColorPicker.SwatchGroup>
            {swatchList().map((color) => (
              <ColorPicker.SwatchTrigger value={color} />
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
    <ColorPicker class="w-[17rem]" inline defaultValue={parseColor('#2563eb')}>
      <div class="flex items-center justify-between gap-3">
        <ColorPicker.Label>Inline color</ColorPicker.Label>
        <ColorPicker.ValueText format="hex" />
      </div>
      <ColorPicker.Area />
      <div class="flex items-center gap-3">
        <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPicker.Sliders />
      </div>
      <ColorPicker.View format="rgba">
        <div class="flex min-w-0 gap-2">
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </div>
      </ColorPicker.View>
    </ColorPicker>
  );
}

function CompactTriggerPicker() {
  return (
    <ColorPicker class="w-72" defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Trigger aria-label="Open color picker" data-fit-content>
          <span class="inline-flex items-center gap-2">
            <span class="relative grid size-4 shrink-0 overflow-hidden rounded-sm border border-border">
              <ColorPicker.TransparencyGrid />
              <ColorPicker.ValueSwatch />
            </span>
            <ColorPicker.ValueText format="hex" />
          </span>
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <div class="flex items-center gap-3">
            <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPicker.Sliders />
          </div>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker>
  );
}

export const Basic: Story = {
  render: () => (
    <ColorPicker class="w-72" defaultValue={parseColor('#eb5e41')}>
      <ColorPickerField />
    </ColorPicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal(parseColor('#16a34a'));

    return (
      <ColorPicker
        class="w-72"
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
      <ColorPicker.RootProvider class="w-72" value={colorPicker}>
        <div class="flex items-center justify-between gap-3">
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
    <ColorPicker class="w-72" defaultValue={parseColor('#0ea5e9')}>
      <ColorPickerField
        actionClass="hover:text-chart-4"
        swatchList={['#0ea5e9', '#14b8a6', '#84cc16', '#f59e0b']}
        triggerClass="focus-visible:border-chart-4 focus-visible:outline-chart-4 data-[state=open]:border-chart-4 data-[state=open]:outline-chart-4"
      />
    </ColorPicker>
  ),
};