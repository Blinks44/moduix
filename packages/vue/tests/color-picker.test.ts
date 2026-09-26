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
  ColorPickerChannelInput,
  ColorPickerContext,
} from '../src';

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

test('preserves Vue component refs through ordinary color picker parts', () => {
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

test('supports controlled open state and forwards each open change once', async () => {
  const openChanges: boolean[] = [];
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      const open = ref(false);
      return {
        open,
        onOpenChange: (details: { open: boolean }) => openChanges.push(details.open),
        defaultColor: parseColor('#eb5e41'),
      };
    },
    template: `
      <div>
        <output>{{ open ? "Open" : "Closed" }}</output>
        <ColorPicker v-model:open="open" :portalled="false" :default-value="defaultColor" @open-change="onOpenChange">
          <ColorPickerControl>
            <ColorPickerTrigger aria-label="Open color picker" />
          </ColorPickerControl>
          <ColorPickerPositioner>
            <ColorPickerContent>Content</ColorPickerContent>
          </ColorPickerPositioner>
        </ColorPicker>
      </div>
    `,
  });

  render(Harness);
  expect(screen.getByText('Closed')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Open color picker' }));
  await waitFor(() => expect(screen.getByText('Open')).toBeInTheDocument());
  expect(openChanges).toEqual([true]);
});

test('keeps controlled value changes Ark-shaped through the context api', async () => {
  const values: string[] = [];
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      const value = ref(parseColor('#16a34a'));
      return {
        value,
        onValueChange: (details: { value: { toString: () => string } }) =>
          values.push(details.value.toString()),
      };
    },
    template: `
      <div>
        <ColorPicker v-model="value" :portalled="false" @value-change="onValueChange">
          <ColorPickerControl>
            <ColorPickerChannelInput channel="hex" />
          </ColorPickerControl>
          <ColorPickerContext v-slot="colorPicker">
            <button type="button" @click="colorPicker.setValue('#9333ea')">
              Change color
            </button>
          </ColorPickerContext>
        </ColorPicker>
        <output>{{ value }}</output>
      </div>
    `,
  });

  render(Harness);
  expect(screen.getByText('rgba(22, 163, 74, 1)')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Change color' }));

  await waitFor(() => expect(screen.getByText('rgba(147, 51, 234, 1)')).toBeInTheDocument());
  await waitFor(() => expect(values).toEqual(['rgba(147, 51, 234, 1)']));
});

test('renders and hydrates the color picker through Vue SSR', async () => {
  const SsrPicker = defineComponent({
    components: colorPickerComponents,
    setup() {
      return { defaultColor: parseColor('#eb5e41') };
    },
    template: `
      <ColorPicker :default-value="defaultColor" :portalled="false" default-open>
        <ColorPickerLabel>Color</ColorPickerLabel>
        <ColorPickerControl>
          <ColorPickerChannelInput channel="hex" />
          <ColorPickerTrigger aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerPositioner>
          <ColorPickerContent>Content</ColorPickerContent>
        </ColorPickerPositioner>
        <ColorPickerHiddenInput />
      </ColorPicker>
    `,
  });

  const markup = await renderToString(createSSRApp(SsrPicker));
  expect(markup).toContain('data-slot="color-picker-trigger"');
  expect(markup).toContain('data-slot="color-picker-content"');

  const container = document.createElement('div');
  container.innerHTML = markup;
  document.body.append(container);
  const serverIds = [...container.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrPicker);
  app.mount(container);

  expect(container.querySelector('[data-slot="color-picker-root"]')).toBeInTheDocument();
  expect(container.querySelector('[data-slot="color-picker-content"]')).toBeInTheDocument();
  expect([...container.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  container.remove();
});

test('applies consumer classes alongside component defaults', () => {
  const Harness = defineComponent({
    components: colorPickerComponents,
    setup() {
      return { defaultColor: parseColor('#eb5e41') };
    },
    template: `
      <ColorPicker :portalled="false" class="consumer-root" :default-value="defaultColor">
        <ColorPickerLabel class="consumer-label">Color</ColorPickerLabel>
        <ColorPickerControl class="consumer-control">
          <ColorPickerTrigger class="consumer-trigger" aria-label="Open color picker" />
        </ColorPickerControl>
        <ColorPickerPositioner class="consumer-positioner">
          <ColorPickerContent class="consumer-content">Content</ColorPickerContent>
        </ColorPickerPositioner>
      </ColorPicker>
    `,
  });

  const { container } = render(Harness);
  const root = container.querySelector('[data-slot="color-picker-root"]');
  const control = container.querySelector('[data-slot="color-picker-control"]');
  const trigger = container.querySelector('[data-slot="color-picker-trigger"]');

  expect(root?.className.endsWith('consumer-root')).toBe(true);
  expect(control?.className.endsWith('consumer-control')).toBe(true);
  expect(trigger?.className.endsWith('consumer-trigger')).toBe(true);
});