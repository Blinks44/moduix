import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
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
  ColorPickerChannelSlider,
  ColorPickerChannelInput,
  ColorPickerSwatchTrigger,
} from '../src';

const colorPickerComponents = {
  ColorPicker,
  ColorPickerArea,
  ColorPickerChannelInput,
  ColorPickerChannelSlider,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerRootProvider,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
} as unknown as Record<string, Component>;

test('submits through explicit Ark hidden inputs', () => {
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return {
        defaultColor: parseColor('#eb5e41'),
        colorPicker: useColorPicker({
          defaultValue: parseColor('#2563eb'),
          name: 'provider-accent',
        }),
      };
    },
    template: `
      <form>
        <ColorPicker :default-value="defaultColor" name="accent">
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerHiddenInput />
        </ColorPicker>
        <ColorPickerRootProvider :value="colorPicker">
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerHiddenInput />
        </ColorPickerRootProvider>
      </form>
    `,
  });

  const { container } = render(Harness);
  const inputs = container.querySelectorAll<HTMLInputElement>('input[tabindex="-1"]');

  expect(inputs).toHaveLength(2);
  expect(Array.from(new FormData(container.querySelector('form')!).entries())).toEqual([
    ['accent', 'rgba(235, 94, 65, 1)'],
    ['provider-accent', 'rgba(37, 99, 235, 1)'],
  ]);
});

test('keeps an asChild host, ref, and explicit hidden input intact', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return {
        rootRef,
        defaultColor: parseColor('#eb5e41'),
      };
    },
    template: `
      <form>
        <ColorPicker ref="rootRef" as-child :default-value="defaultColor" name="accent">
          <div data-testid="color-picker-root">
            <ColorPickerChannelInput channel="hex" />
            <ColorPickerHiddenInput />
          </div>
        </ColorPicker>
      </form>
    `,
  });

  render(Harness);
  const root = screen.getByTestId('color-picker-root');

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'color-picker-root');
  expect(root.querySelector('input[name="accent"]')).not.toBeNull();
  expect(new FormData(root.closest('form')!).get('accent')).toBe('rgba(235, 94, 65, 1)');
});

test('forwards refs through ordinary Ark Vue part paths', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const controlRef = ref<ComponentPublicInstance | null>(null);
  const triggerRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return { rootRef, controlRef, triggerRef, defaultColor: parseColor('#eb5e41') };
    },
    template: `
      <ColorPicker ref="rootRef" :default-value="defaultColor">
        <ColorPickerControl ref="controlRef">
          <ColorPickerTrigger ref="triggerRef" aria-label="Open" />
        </ColorPickerControl>
      </ColorPicker>
    `,
  });

  render(Harness);

  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'color-picker-root');
  expect(controlRef.value?.$el).toHaveAttribute('data-slot', 'color-picker-control');
  expect(triggerRef.value?.$el).toBe(screen.getByRole('button', { name: 'Open' }));
});

test('preserves Ark open-change details and default trigger composition', async () => {
  const openStates: boolean[] = [];
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return {
        onOpenChange: (details: { open: boolean }) => openStates.push(details.open),
        defaultColor: parseColor('#eb5e41'),
      };
    },
    template: `
      <ColorPicker :default-value="defaultColor" @open-change="onOpenChange">
        <ColorPickerLabel>Color</ColorPickerLabel>
        <ColorPickerControl>
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerPositioner>
          <ColorPickerContent>Content</ColorPickerContent>
        </ColorPickerPositioner>
      </ColorPicker>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'Color' });
  expect(
    document.querySelector(
      '[data-slot="color-picker-trigger"] [data-slot="color-picker-value-swatch"]',
    ),
  ).not.toBeNull();

  await fireEvent.click(trigger);
  await waitFor(() => expect(openStates).toEqual([true]));

  trigger.focus();
  await fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
  await waitFor(() => expect(openStates).toEqual([true, false]));
});

test('lets consumer utilities replace component defaults', () => {
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

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-64');
});

test('keeps empty visual parts sized and visible with utilities', () => {
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return { defaultColor: parseColor('#eb5e41') };
    },
    template: `
      <ColorPicker inline :default-value="defaultColor">
        <ColorPickerArea />
        <ColorPickerChannelSlider channel="hue" />
        <ColorPickerSwatchTrigger value="#eb5e41" />
      </ColorPicker>
    `,
  });

  const { container } = render(Harness);

  expect(container.querySelector('[data-slot="color-picker-area"]')).toHaveClass('h-40', 'w-full');
  expect(container.querySelector('[data-slot="color-picker-area-background"]')).toHaveClass(
    'size-full',
  );
  expect(container.querySelector('[data-slot="color-picker-channel-slider-track"]')).toHaveClass(
    'h-3',
    'w-full',
  );
  expect(container.querySelector('[data-slot="color-picker-swatch"]')).toHaveClass(
    'size-control-sm',
  );
});

test('renders and hydrates an open color picker through Vue SSR', async () => {
  const SsrPicker = defineComponent({
    components: colorPickerComponents,
    setup() {
      return { defaultColor: parseColor('#eb5e41') };
    },
    template: `
      <ColorPicker :default-value="defaultColor" :portalled="false" default-open>
        <ColorPickerControl>
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerPositioner>
          <ColorPickerContent>Content</ColorPickerContent>
        </ColorPickerPositioner>
      </ColorPicker>
    `,
  });

  const markup = await renderToString(createSSRApp(SsrPicker));
  expect(markup).toContain('data-slot="color-picker-trigger"');
  expect(markup).toContain('data-slot="color-picker-content"');

  const container = document.createElement('div');
  container.innerHTML = markup;
  document.body.append(container);
  const app = createSSRApp(SsrPicker);
  app.mount(container);

  expect(container.querySelector('[data-slot="color-picker-root"]')).toBeInTheDocument();
  expect(container.querySelector('[data-slot="color-picker-content"]')).toBeInTheDocument();

  app.unmount();
  container.remove();
});