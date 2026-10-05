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
  ComboboxItemIndicator,
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
import styles from '../src/components/combobox/Combobox.module.css';
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
  ComboboxItemIndicator,
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
  props: {
    defaultValue: { type: Array<string>, default: undefined },
    portalled: { type: Boolean, default: false },
  },
  setup() {
    return { collection: fruits, items: fruits.items };
  },
  template:
    '<form><Combobox :collection="collection" :default-value="defaultValue" default-open :portalled="portalled" name="fruit"><ComboboxLabel>Fruit</ComboboxLabel><ComboboxControl><ComboboxInput /><ComboboxClearTrigger /><ComboboxTrigger aria-label="Open fruits" /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxStatus>Status</ComboboxStatus><ComboboxEmpty>No fruit</ComboboxEmpty><ComboboxList><ComboboxOption v-for="item in items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox></form>',
});

test('keeps Ark semantics, form values, anatomy, and flat exports', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const inputRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, item: fruits.items[0], inputRef, itemRef, rootRef };
    },
    template:
      '<form><Combobox ref="rootRef" :collection="collection" default-open :default-value="[&quot;apple&quot;]" name="fruit"><ComboboxLabel>Fruit</ComboboxLabel><ComboboxControl><ComboboxInput ref="inputRef" data-probe="input" /><ComboboxTrigger aria-label="Open fruits" /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption ref="itemRef" :item="item">Apple</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox></form>',
  });

  const { container } = render(Harness);
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  const root = rootRef.value?.$el as HTMLElement;
  const item = screen.getByRole('option', { name: 'Apple' });

  expect('Root' in Combobox).toBe(false);
  expect(root!.getAttribute('data-scope')).toBe('combobox');
  expect(root!.getAttribute('data-slot')).toBe('combobox-root');
  expect(inputRef.value?.$el).toBe(input);
  const inputLocator = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'combobox-input');
  await expect.element(inputLocator).toHaveAttribute('data-probe', 'input');
  await expect.element(inputLocator).toHaveValue('Apple');
  expect(itemRef.value?.$el).toBe(item);
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'combobox-item');
  expect(item.querySelector('[data-slot="combobox-item-text"]')!.textContent).toContain('Apple');
  expect(
    item.querySelector('[data-slot="combobox-item-indicator"]')!.getAttribute('data-state'),
  ).toBe('checked');
  expect(
    Boolean(item.querySelector('[data-slot="combobox-item-indicator"] svg')?.isConnected),
  ).toBe(true);
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('supports controlled input v-model updates', async () => {
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      const inputValue = ref('mango');
      return { collection: fruits, inputValue };
    },
    template:
      '<div><Combobox :collection="collection" v-model:input-value="inputValue" :portalled="false"><ComboboxLabel>Controlled fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl></Combobox><button type="button" @click="inputValue = &quot;apple&quot;">Set apple</button></div>',
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

test('selects with the keyboard and clears through the default accessible action', async () => {
  const { container } = render(TestCombobox);

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  await combobox.press('ArrowDown');
  await combobox.press('Enter');
  await expect.element(combobox).toHaveValue('Apple');

  await page.getByRole('button', { name: 'Clear selection', exact: true }).click();
  await expect.element(combobox).toHaveValue('');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards ordinary refs', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, items: fruits.items, rootRef };
    },
    template:
      '<Combobox ref="rootRef" :collection="collection" default-open><ComboboxLabel>Portalled fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption v-for="item in items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox>',
  });

  const { container } = render(Harness);
  const list = screen.getByRole('listbox');

  expect(rootRef.value!.$el.getAttribute('data-slot')).toBe('combobox-root');
  expect(container.contains(list)).toBe(false);
  expect(document.body!.contains(list)).toBe(true);
});

test('keeps RootProvider, root context, item context, and scoped slots connected', async () => {
  const RootState = defineComponent({
    setup() {
      return { context: useComboboxContext() };
    },
    template: '<output>{{ context.open ? "Open" : "Closed" }}</output>',
  });
  const ItemState = defineComponent({
    setup() {
      return { context: useComboboxItemContext() };
    },
    template: '<span>{{ context.highlighted ? "Highlighted" : "Not highlighted" }}</span>',
  });
  const Harness = defineComponent({
    components: { ...comboboxComponents, ItemState, RootState },
    setup() {
      return {
        collection: fruits,
        combobox: useCombobox({ collection: fruits, defaultOpen: true }),
      };
    },
    template:
      '<ComboboxRootProvider :value="combobox" :portalled="false"><RootState /><ComboboxContext v-slot="context"><output>{{ context.open ? "Open slot" : "Closed slot" }}</output></ComboboxContext><ComboboxLabel>Provider fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxItem :item="collection.items[0]"><ComboboxItemText>Apple <ItemState /></ComboboxItemText><ComboboxItemContext v-slot="context"><span>{{ context.highlighted ? "Highlighted slot" : "Not highlighted slot" }}</span></ComboboxItemContext></ComboboxItem></ComboboxList></ComboboxContent></ComboboxPositioner></ComboboxRootProvider>',
  });

  render(Harness);

  await expect.element(page.getByText('Open', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Open slot', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Not highlighted', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Not highlighted slot', { exact: true })).toBeAttached();
});

test('preserves semantic hosts and refs with asChild', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, rootRef };
    },
    template:
      '<Combobox ref="rootRef" as-child :collection="collection"><section aria-label="Fruit selection"><ComboboxLabel>Fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl></section></Combobox>',
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Fruit selection', exact: true }))
    .toHaveAttribute('data-slot', 'combobox-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('applies consumer classes after CSS Module defaults', () => {
  render(TestCombobox, { props: { portalled: false } });

  const input = screen.getByRole('combobox', { name: 'Fruit' });
  const root = input.closest('[data-slot="combobox-root"]');
  const control = input.parentElement;
  const content = screen.getByRole('listbox').closest('[data-slot="combobox-content"]');
  const item = screen.getByRole('option', { name: 'Apple' });

  expect([...root!.classList]).toEqual(expect.arrayContaining([styles.root]));
  expect([...control!.classList]).toEqual(expect.arrayContaining([styles.control]));
  expect([...input!.classList]).toEqual(expect.arrayContaining([styles.input]));
  expect([...content!.classList]).toEqual(expect.arrayContaining([styles.content]));
  expect([...item!.classList]).toEqual(expect.arrayContaining([styles.item]));
  expect([...screen.getByText('Status')!.classList]).toEqual(
    expect.arrayContaining([styles.status]),
  );
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