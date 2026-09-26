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

test('keeps Ark semantics and form values', () => {
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
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  const item = screen.getByRole('option', { name: 'Apple' });
  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'combobox-root');
  expect(input).toHaveValue('Apple');
  expect(item.querySelector('[data-slot="combobox-item-indicator"]')).toHaveAttribute(
    'data-state',
    'checked',
  );
  expect(item.querySelector('[data-slot="combobox-item-indicator"] svg')).toBeInTheDocument();
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('selects with the keyboard and clears through the accessible action', async () => {
  render(TestCombobox);
  const input = screen.getByRole('combobox', { name: 'Fruit' });

  await fireEvent.click(input);
  await fireEvent.keyDown(input, { key: 'ArrowDown' });
  await fireEvent.keyDown(input, { key: 'Enter' });
  await waitFor(() => expect(input).toHaveValue('Apple'));
  await fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
  await waitFor(() => expect(input).toHaveValue(''));
});

test('supports controlled input v-model and selection clearing', async () => {
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      const inputValue = ref('mango');
      return { collection: fruits, inputValue };
    },
    template:
      '<div><Combobox :collection="collection" v-model:input-value="inputValue" default-open :portalled="false"><ComboboxLabel>Controlled fruit</ComboboxLabel><ComboboxControl><ComboboxInput /><ComboboxClearTrigger /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox><button type="button" @click="inputValue = &quot;apple&quot;">Set apple</button></div>',
  });

  render(Harness);
  const input = screen.getByRole('combobox', { name: 'Controlled fruit' });
  expect(input).toHaveValue('mango');
  await fireEvent.click(screen.getByRole('button', { name: 'Set apple' }));
  await waitFor(() => expect(input).toHaveValue('apple'));
});

test('keeps provider and scoped context slots connected', () => {
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
  expect(screen.getByText('Open slot')).toBeInTheDocument();
  expect(screen.getByText('Not highlighted')).toBeInTheDocument();
});

test('preserves semantic hosts with asChild and consumer utility classes', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, rootRef };
    },
    template:
      '<Combobox ref="rootRef" as-child class="consumer-root" :collection="collection"><section aria-label="Fruit selection"><ComboboxLabel class="consumer-label">Fruit</ComboboxLabel><ComboboxControl class="consumer-control"><ComboboxInput class="consumer-input" /></ComboboxControl></section></Combobox>',
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Fruit selection' });
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveClass('consumer-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(screen.getByText('Fruit')).toHaveClass('consumer-label');
  expect(input.parentElement).toHaveClass('consumer-control');
  expect(input).toHaveClass('consumer-input');
  expect(input).toHaveClass('h-control-md');
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
  expect(html).toContain('data-slot="combobox-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);
  expect(host.querySelectorAll('[data-slot="combobox-root"]')).toHaveLength(1);
  expect(host.querySelector('[role="combobox"]')).toBeInTheDocument();
  app.unmount();
  host.remove();
});