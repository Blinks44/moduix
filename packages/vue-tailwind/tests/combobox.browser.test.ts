import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref, nextTick } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
} from '../src';
import SsrCombobox from './fixtures/SsrCombobox.vue';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

const comboboxComponents = {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
} as unknown as Record<string, Component>;

const TestCombobox = defineComponent({
  components: comboboxComponents,
  setup() {
    return { collection: fruits, items: fruits.items };
  },
  template:
    '<form><Combobox :collection="collection" default-open :portalled="false" name="fruit"><ComboboxLabel>Fruit</ComboboxLabel><ComboboxControl><ComboboxInput /><ComboboxClearTrigger /><ComboboxTrigger aria-label="Open fruits" /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxStatus>Status</ComboboxStatus><ComboboxEmpty>No fruit</ComboboxEmpty><ComboboxList><ComboboxOption v-for="item in items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox></form>',
});

test('keeps Ark semantics and form values', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, item: fruits.items[0], rootRef };
    },
    template:
      '<form><Combobox ref="rootRef" :collection="collection" default-open :default-value="[&quot;apple&quot;]" name="fruit"><ComboboxLabel>Fruit</ComboboxLabel><ComboboxControl><ComboboxInput /><ComboboxTrigger aria-label="Open fruits" /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption :item="item">Apple</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox></form>',
  });

  const { container } = render(Harness);

  const item = screen.getByRole('option', { name: 'Apple' });
  expect(rootRef.value!.$el.getAttribute('data-slot')).toBe('combobox-root');
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveValue('Apple');
  expect(
    item.querySelector('[data-slot="combobox-item-indicator"]')!.getAttribute('data-state'),
  ).toBe('checked');
  expect(
    Boolean(item.querySelector('[data-slot="combobox-item-indicator"] svg')?.isConnected),
  ).toBe(true);
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('selects with the keyboard and clears through the accessible action', async () => {
  render(TestCombobox);

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  await combobox.press('ArrowDown');
  await combobox.press('Enter');
  await expect.element(combobox).toHaveValue('Apple');
  await page.getByRole('button', { name: 'Clear selection', exact: true }).click();
  await expect.element(combobox).toHaveValue('');
});

test('supports controlled input v-model updates', async () => {
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      const inputValue = ref('mango');
      return { collection: fruits, inputValue };
    },
    template:
      '<div><button type="button" @click="inputValue = &quot;apple&quot;">Set apple</button><Combobox :collection="collection" v-model:input-value="inputValue" :portalled="false"><ComboboxLabel>Controlled fruit</ComboboxLabel><ComboboxControl><ComboboxInput /><ComboboxClearTrigger /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox></div>',
  });

  render(Harness);

  await expect
    .element(page.getByRole('combobox', { name: 'Controlled fruit', exact: true }))
    .toHaveValue('mango');
  await page.getByRole('button', { name: 'Set apple', exact: true }).click();
  await expect
    .element(page.getByRole('combobox', { name: 'Controlled fruit', exact: true }))
    .toHaveValue('apple');
});

test('keeps provider and scoped context slots connected', async () => {
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return {
        collection: fruits,
        combobox: useCombobox({ collection: fruits, defaultOpen: true }),
        itemContext: useComboboxItemContext,
        rootContext: useComboboxContext,
      };
    },
    template:
      '<ComboboxRootProvider :value="combobox" :portalled="false"><ComboboxContext v-slot="context"><output>{{ context.open ? "Open slot" : "Closed slot" }}</output></ComboboxContext><ComboboxLabel>Provider fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxItem :item="collection.items[0]"><ComboboxItemText>Apple</ComboboxItemText><ComboboxItemContext v-slot="context"><span>{{ context.highlighted ? "Highlighted" : "Not highlighted" }}</span></ComboboxItemContext></ComboboxItem></ComboboxList></ComboboxContent></ComboboxPositioner></ComboboxRootProvider>',
  });

  render(Harness);
  await expect.element(page.getByText('Open slot', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Not highlighted', { exact: true })).toBeAttached();
});

test('preserves semantic hosts with asChild and consumer utility classes', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, rootRef };
    },
    template:
      '<Combobox ref="rootRef" as-child class="consumer-root w-80" :collection="collection"><section aria-label="Fruit selection"><ComboboxLabel class="consumer-label">Fruit</ComboboxLabel><ComboboxControl class="consumer-control"><ComboboxInput class="consumer-input" /></ComboboxControl></section></Combobox>',
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Fruit selection' });
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  expect(root.tagName).toBe('SECTION');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect(rootRef.value?.$el).toBe(root);
  expect([...screen.getByText('Fruit')!.classList]).toEqual(
    expect.arrayContaining(['consumer-label']),
  );
  expect([...input.parentElement!.classList]).toEqual(expect.arrayContaining(['consumer-control']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['consumer-input']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['h-control-md']));
  await expect.element(page.locator('[data-slot="combobox-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="combobox-input"]')).toHaveCSS('height', '36px');
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrCombobox));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const root = host.querySelector('[data-slot="combobox-root"]');
  const serverNodes = [...host.querySelectorAll('*')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(root).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);

  const app = createSSRApp(SsrCombobox);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="combobox-root"]')).toBe(root);
    expect([...host.querySelectorAll('*')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('option', { name: 'Apple', exact: true }).click();
    await expect
      .element(page.getByRole('combobox', { name: 'Server fruit', exact: true }))
      .toHaveValue('Apple');
  } finally {
    app.unmount();
    host.remove();
  }
});