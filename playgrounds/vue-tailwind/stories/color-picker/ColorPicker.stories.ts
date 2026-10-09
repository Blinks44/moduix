import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
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
} from '@/components/color-picker';

const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316', '#dc2626', '#9333ea'];

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const colorPickerComponents = {
  ColorPicker,
  ColorPickerRootProvider,
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
  ColorPickerHiddenInput,
} as unknown as Record<string, Component>;

const ColorPickerField = defineComponent({
  components: colorPickerComponents,
  props: {
    swatchList: { type: Array, default: () => swatches },
    triggerClassName: { type: String, default: undefined },
    actionClassName: { type: String, default: undefined },
  },
  template: `
    <ColorPickerLabel>Color</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger
        aria-label="Open color picker"
        :class="triggerClassName"
      />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
        <div class="flex items-center gap-3">
          <ColorPickerEyeDropperTrigger
            aria-label="Pick color from screen"
            :class="actionClassName"
          />
          <ColorPickerSliders />
        </div>
        <ColorPickerSwatchGroup>
          <ColorPickerSwatchTrigger
            v-for="color in swatchList"
            :key="color"
            :value="color"
          />
        </ColorPickerSwatchGroup>
      </ColorPickerContent>
    </ColorPickerPositioner>
    <ColorPickerHiddenInput />
  `,
});

const InlinePicker = defineComponent({
  components: colorPickerComponents,
  template: `
    <ColorPicker class="w-[17rem]" inline :default-value="parseColor('#2563eb')">
      <div class="flex items-center justify-between gap-3">
        <ColorPickerLabel>Inline color</ColorPickerLabel>
        <ColorPickerValueText format="hex" />
      </div>
      <ColorPickerArea />
      <div class="flex items-center gap-3">
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </div>
      <ColorPickerView format="rgba">
        <div class="flex min-w-0 gap-2">
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerChannelInput channel="alpha" />
        </div>
      </ColorPickerView>
    </ColorPicker>
  `,
  setup() {
    return { parseColor };
  },
});

const CompactTriggerPicker = defineComponent({
  components: colorPickerComponents,
  template: `
    <ColorPicker class="w-72" :default-value="parseColor('#eb5e41')">
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
          <span class="inline-flex items-center gap-2">
            <span class="relative grid size-4 shrink-0 overflow-hidden rounded-sm border border-border">
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
          <div class="flex items-center gap-3">
            <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
            <ColorPickerSliders />
          </div>
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  `,
  setup() {
    return { parseColor };
  },
});

const storyComponents = {
  ...colorPickerComponents,
  ColorPickerField,
  InlinePicker,
  CompactTriggerPicker,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { parseColor, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <ColorPicker class="w-72" :default-value="parseColor('#eb5e41')">
      <ColorPickerField />
    </ColorPicker>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <ColorPicker
        class="w-72"
        :value="value"
        @value-change="(details) => (value = details.value)"
      >
        <ColorPickerField />
      </ColorPicker>
    `,
    () => ({ value: ref(parseColor('#16a34a')) }),
  ),
};

export const Inline: Story = {
  render: renderStory(`<InlinePicker />`),
};

export const CompactTrigger: Story = {
  render: renderStory(`<CompactTriggerPicker />`),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <ColorPickerRootProvider class="w-72" :value="colorPicker">
        <div class="flex items-center justify-between gap-3">
          <ColorPickerLabel>Provider color</ColorPickerLabel>
          <ColorPickerValueText format="hex" />
        </div>
        <ColorPickerField />
      </ColorPickerRootProvider>
    `,
    () => ({ colorPicker: useColorPicker({ defaultValue: parseColor('#9333ea') }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <ColorPicker class="w-72" :default-value="parseColor('#0ea5e9')">
      <ColorPickerField
        action-class-name="hover:text-chart-4"
        :swatch-list="['#0ea5e9', '#14b8a6', '#84cc16', '#f59e0b']"
        trigger-class-name="focus-visible:border-chart-4 focus-visible:outline-chart-4 data-[state=open]:border-chart-4 data-[state=open]:outline-chart-4"
      />
    </ColorPicker>
  `),
};