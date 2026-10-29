import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { computed, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
  useSplitter,
  useSplitterContext,
} from '@/index';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];

const splitterComponents = {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  SplitterRootProvider,
};

test('preserves anatomy, fallthrough attrs, and refs for every styled part', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const panelRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { indicatorRef, panelRef, rootRef, triggerRef, panels };
    },
    template: `
      <Splitter ref="rootRef" :panels="panels" :default-size="[40, 60]" data-probe="root">
        <SplitterPanel ref="panelRef" id="a">A</SplitterPanel>
        <SplitterResizeTrigger ref="triggerRef" id="a:b" aria-label="Resize panels">
          <SplitterResizeTriggerIndicator ref="indicatorRef" />
        </SplitterResizeTrigger>
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const root = container.querySelector<HTMLElement>('[data-slot="splitter-root"]')!;
  const panel = container.querySelector('[data-slot="splitter-panel"]')!;
  const trigger = container.querySelector('[data-slot="splitter-resize-trigger"]')!;
  const indicator = container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')!;

  expect(root.getAttribute('data-scope')).toBe('splitter');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(rootRef.value?.$el).toBe(root);
  expect(panelRef.value?.$el).toBe(panel);
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(indicatorRef.value?.$el).toBe(indicator);
});

test('keeps the provider and context connected to the Vue splitter store', async () => {
  const ContextControls = defineComponent({
    setup() {
      const splitter = useSplitterContext();
      const resizeFirstPanel = () => splitter.value.setSizes([25, 75]);
      return { resizeFirstPanel };
    },
    template: '<button type="button" @click="resizeFirstPanel">Set A to 25%</button>',
  });
  render({
    components: { ...splitterComponents, ContextControls },
    setup() {
      const splitter = useSplitter({ panels, defaultSize: [50, 50] });
      const sizes = computed(() => splitter.value.getSizes().join(' / '));
      return { sizes, splitter };
    },
    template: `
      <SplitterRootProvider :value="splitter">
        <ContextControls />
        <SplitterPanel id="a">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
        <SplitterPanel id="b">B</SplitterPanel>
      </SplitterRootProvider>
      <output>Sizes: {{ sizes }}</output>
    `,
  });

  await expect.element(page.getByText('Sizes: 50 / 50')).toBeVisible();
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveAttribute('data-slot', 'splitter-resize-trigger');
  await page.getByRole('button', { name: 'Set A to 25%' }).click();
  await expect.element(page.getByText('Sizes: 25 / 75')).toBeVisible();
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveAttribute('aria-valuenow', '25');
});

test('sizes the root with a class, centers the indicator, and never submits a form', async () => {
  let submits = 0;
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels, onSubmit: () => (submits += 1) };
    },
    template: `
      <form @submit.prevent="onSubmit">
        <Splitter :panels="panels" :default-size="[40, 60]" class="h-50">
          <SplitterPanel id="a">A</SplitterPanel>
          <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
          <SplitterPanel id="b">B</SplitterPanel>
        </Splitter>
      </form>
    `,
  });

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;
  const indicator = container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')!;
  const triggerBox = trigger.getBoundingClientRect();
  const indicatorBox = indicator.getBoundingClientRect();

  expect(
    Math.abs(triggerBox.left + triggerBox.width / 2 - (indicatorBox.left + indicatorBox.width / 2)),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(triggerBox.top + triggerBox.height / 2 - (indicatorBox.top + indicatorBox.height / 2)),
  ).toBeLessThanOrEqual(1);
  expect(trigger.getAttribute('type')).toBe('button');
  await page.getByRole('separator', { name: 'Resize panels' }).click();
  expect(submits).toBe(0);
});

test('lets consumer utilities replace fixed defaults', async () => {
  const { container } = render({
    components: splitterComponents,
    setup() {
      return { panels };
    },
    template: `
      <Splitter class="h-64 w-96 border-2 bg-muted" :panels="panels" :default-size="[40, 60]">
        <SplitterPanel id="a" class="min-h-0 p-6">A</SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" class="w-2 min-w-2" />
        <SplitterPanel id="b">B</SplitterPanel>
      </Splitter>
    `,
  });

  const root = container.querySelector('[data-slot="splitter-root"]')!;
  const panel = container.querySelector('[data-slot="splitter-panel"]')!;
  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  expect([...root.classList]).toEqual(
    expect.arrayContaining(['h-64', 'w-96', 'border-2', 'bg-muted']),
  );
  expect([...panel.classList]).toEqual(expect.arrayContaining(['min-h-0', 'p-6']));
  expect([...trigger.classList]).toEqual(expect.arrayContaining(['w-2', 'min-w-2']));
  await expect.element(page.locator('[data-slot="splitter-root"]')).toHaveCSS('height', '256px');
  await expect.element(page.locator('[data-slot="splitter-root"]')).toHaveCSS('width', '384px');
  await expect
    .element(page.locator('[data-slot="splitter-panel"]').first())
    .toHaveCSS('padding', '24px');
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveCSS('width', '8px');
});