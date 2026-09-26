import { createListCollection } from '@ark-ui/vue/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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

test('keeps Ark semantics, form values, anatomy, and flat exports', () => {
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
  expect(root).toHaveAttribute('data-scope', 'combobox');
  expect(root).toHaveAttribute('data-slot', 'combobox-root');
  expect(inputRef.value?.$el).toBe(input);
  expect(input).toHaveAttribute('data-slot', 'combobox-input');
  expect(input).toHaveAttribute('data-probe', 'input');
  expect(input).toHaveValue('Apple');
  expect(itemRef.value?.$el).toBe(item);
  expect(item).toHaveAttribute('data-slot', 'combobox-item');
  expect(item.querySelector('[data-slot="combobox-item-text"]')).toHaveTextContent('Apple');
  expect(item.querySelector('[data-slot="combobox-item-indicator"]')).toHaveAttribute(
    'data-state',
    'checked',
  );
  expect(item.querySelector('[data-slot="combobox-item-indicator"] svg')).toBeInTheDocument();
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
  const input = screen.getByRole('combobox', { name: 'Controlled fruit' });

  expect(input).toHaveValue('mango');
  await fireEvent.click(screen.getByRole('button', { name: 'Set apple' }));
  await waitFor(() => expect(input).toHaveValue('apple'));
});

test('selects with the keyboard and clears through the default accessible action', async () => {
  const { container } = render(TestCombobox);
  const input = screen.getByRole('combobox', { name: 'Fruit' });

  await fireEvent.click(input);
  await fireEvent.keyDown(input, { key: 'ArrowDown' });
  await fireEvent.keyDown(input, { key: 'Enter' });
  await waitFor(() => expect(input).toHaveValue('Apple'));

  await fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
  await waitFor(() => expect(input).toHaveValue(''));
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

  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'combobox-root');
  expect(container.contains(list)).toBe(false);
  expect(document.body).toContainElement(list);
});

test('keeps RootProvider, root context, item context, and scoped slots connected', () => {
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

  expect(screen.getByText('Open')).toBeInTheDocument();
  expect(screen.getByText('Open slot')).toBeInTheDocument();
  expect(screen.getByText('Not highlighted')).toBeInTheDocument();
  expect(screen.getByText('Not highlighted slot')).toBeInTheDocument();
});

test('preserves semantic hosts and refs with asChild', () => {
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
  expect(root).toHaveAttribute('data-slot', 'combobox-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('applies consumer classes after CSS Module defaults', () => {
  render(TestCombobox, { props: { portalled: false } });

  const input = screen.getByRole('combobox', { name: 'Fruit' });
  const root = input.closest('[data-slot="combobox-root"]');
  const control = input.parentElement;
  const content = screen.getByRole('listbox').closest('[data-slot="combobox-content"]');
  const item = screen.getByRole('option', { name: 'Apple' });

  expect(root).toHaveClass(styles.root);
  expect(control).toHaveClass(styles.control);
  expect(input).toHaveClass(styles.input);
  expect(content).toHaveClass(styles.content);
  expect(item).toHaveClass(styles.item);
  expect(screen.getByText('Status')).toHaveClass(styles.status);
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const App = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, item: fruits.items[0] };
    },
    template:
      '<Combobox :collection="collection" default-open :portalled="false"><ComboboxLabel>Server fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption :item="item">Apple</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox>',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="combobox-root"');
  expect(html).toContain('data-slot="combobox-input"');
  expect(html).toContain('data-slot="combobox-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="combobox-root"]')).toHaveLength(1);
  expect(host.querySelector('[role="combobox"]')).toBeInTheDocument();
  expect(host.querySelector('[role="option"]')).toHaveTextContent('Apple');

  app.unmount();
  host.remove();
});