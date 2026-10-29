import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  ColorPicker,
  parseColor,
  ColorPickerRootProvider,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelSlider,
  ColorPickerChannelInput,
  ColorPickerSwatchTrigger,
  ColorPickerContext,
} from '@/index';

const colorPickerComponents = {
  ColorPicker,
  ColorPickerChannelInput,
  ColorPickerContent,
  ColorPickerContext,
  ColorPickerControl,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerRootProvider,
  ColorPickerTrigger,
  ColorPickerArea,
  ColorPickerChannelSlider,
  ColorPickerSwatchTrigger,
} as unknown as Record<string, Component>;

test('lets consumer utilities replace component defaults', async () => {
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return { defaultColor: parseColor('#eb5e41') };
    },
    template: `
      <ColorPicker class="w-80" :default-value="defaultColor">
        <ColorPickerControl>
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
      </ColorPicker>
    `,
  });

  const { container } = render(Harness);
  const root = container.querySelector('[data-slot="color-picker-root"]')!;

  expect(root!.classList.contains('w-80')).toBe(true);
});