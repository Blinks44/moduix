import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrColorPicker from './fixtures/SsrColorPicker.vue';

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

test('submits through explicit Ark hidden inputs', async () => {
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
  const channel = page.getByRole('textbox').nth(0);
  await channel.fill('#16a34a');
  await channel.press('Enter');
  expect(new FormData(container.querySelector('form')!).get('accent')).toBe('rgba(22, 163, 74, 1)');
});

test('keeps an asChild host, ref, and explicit hidden input intact', async () => {
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
  await expect
    .element(page.getByTestId('color-picker-root'))
    .toHaveAttribute('data-slot', 'color-picker-root');
  expect(root.querySelector('input[name="accent"]')).not.toBeNull();
  expect(new FormData(root.closest('form')!).get('accent')).toBe('rgba(235, 94, 65, 1)');
});

test('preserves Vue component refs through ordinary color picker parts', async () => {
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

  expect(rootRef.value!.$el.getAttribute('data-slot')).toBe('color-picker-root');
  expect(controlRef.value!.$el.getAttribute('data-slot')).toBe('color-picker-control');
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

  expect(
    document.querySelector(
      '[data-slot="color-picker-trigger"] [data-slot="color-picker-value-swatch"]',
    ),
  ).not.toBeNull();

  await page.getByRole('button', { name: 'Color', exact: true }).click();
  await expect.poll(() => openStates).toEqual([true]);
  await expect.element(page.getByText('Content')).toBeFocused();
  await page.getByText('Content').press('Escape');
  await expect.poll(() => openStates).toEqual([true, false]);
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
  await expect.element(page.getByText('Closed')).toBeAttached();

  await page.getByRole('button', { name: 'Open color picker', exact: true }).click();
  await expect.element(page.getByText('Open')).toBeAttached();
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
  await expect.element(page.getByText('rgba(22, 163, 74, 1)')).toBeAttached();

  await page.getByRole('button', { name: 'Change color', exact: true }).click();

  await expect.element(page.getByText('rgba(147, 51, 234, 1)')).toBeAttached();
  await expect.poll(() => values).toEqual(['rgba(147, 51, 234, 1)']);
});

test('hydrates color-picker without replacing server hosts or IDs and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrColorPicker));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverParts = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverParts.length).toBeGreaterThan(0);
  expect(serverIds.length).toBeGreaterThan(0);
  expect(serverIds.every(Boolean)).toBe(true);
  const app = createSSRApp(SsrColorPicker);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const hydratedParts = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedParts).toHaveLength(serverParts.length);
    hydratedParts.forEach((part, index) => expect(part).toBe(serverParts[index]));
    await page.locator('[data-slot="color-picker-content"]').press('Escape');
    await expect.element(page.locator('[data-slot="color-picker-content"]')).toHaveCount(0);
  } finally {
    app.unmount();
    host.remove();
  }
});

test('applies consumer classes alongside component defaults', async () => {
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