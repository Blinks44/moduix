import { createListCollection } from '@ark-ui/vue/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxContext,
  ListboxItem,
  ListboxItemContext,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxRootProvider,
  ListboxValueText,
  useListbox,
  useListboxContext,
} from '../src';
import styles from '../src/components/listbox/Listbox.module.css';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
    { label: 'Unavailable', value: 'unavailable', disabled: true },
  ],
});

const listboxComponents = {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxContext,
  ListboxItem,
  ListboxItemContext,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxRootProvider,
  ListboxValueText,
} as unknown as Record<string, Component>;

const FruitListbox = defineComponent({
  components: listboxComponents,
  setup() {
    return { collection: fruits, items: fruits.items };
  },
  template:
    '<Listbox :collection="collection"><ListboxLabel>Fruit</ListboxLabel><ListboxContent><ListboxItem v-for="item in items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText><ListboxItemIndicator /></ListboxItem></ListboxContent></Listbox>',
});

test('preserves Ark semantics, refs, and stable styling hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: listboxComponents,
    setup() {
      return { collection: fruits, items: fruits.items, rootRef };
    },
    template: `<Listbox ref="rootRef" :collection="collection" :default-value="['apple']"><ListboxLabel>Fruit</ListboxLabel><ListboxContent><ListboxItem v-for="item in items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText><ListboxItemIndicator /></ListboxItem></ListboxContent></Listbox>`,
  });

  render(Harness);
  const content = screen.getByRole('listbox', { name: 'Fruit' });
  const apple = screen.getByRole('option', { name: 'Apple' });

  expect('Root' in Listbox).toBe(false);
  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'listbox-root');
  expect(content).toHaveAttribute('data-slot', 'listbox-content');
  expect(apple).toHaveAttribute('data-slot', 'listbox-item');
  expect(apple).toHaveAttribute('data-selected');
  expect(apple.querySelector('[data-slot="listbox-item-indicator"] svg')).toBeInTheDocument();
});

test('supports controlled values through v-model', async () => {
  const Harness = defineComponent({
    components: listboxComponents,
    setup() {
      const value = ref<string[]>(['mango']);
      return { collection: fruits, items: fruits.items, value };
    },
    template: `<div><Listbox v-model="value" :collection="collection"><ListboxLabel>Controlled fruit</ListboxLabel><ListboxContent><ListboxItem v-for="item in items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText></ListboxItem></ListboxContent></Listbox><button type="button" @click="value = ['apple']">Set apple</button></div>`,
  });

  render(Harness);
  expect(screen.getByRole('option', { name: 'Mango' })).toHaveAttribute('data-selected');
  await fireEvent.click(screen.getByRole('button', { name: 'Set apple' }));
  await waitFor(() =>
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('data-selected'),
  );
  expect(screen.getByRole('option', { name: 'Mango' })).not.toHaveAttribute('data-selected');
});

test('keeps disabled items unavailable and selects enabled items with the keyboard', async () => {
  render(FruitListbox);
  const content = screen.getByRole('listbox', { name: 'Fruit' });
  const apple = screen.getByRole('option', { name: 'Apple' });
  const mango = screen.getByRole('option', { name: 'Mango' });
  const unavailable = screen.getByRole('option', { name: 'Unavailable' });

  content.focus();
  await fireEvent.keyDown(content, { key: 'ArrowDown' });
  await waitFor(() => {
    expect(apple).toHaveAttribute('data-highlighted');
    expect(content).toHaveAttribute('aria-activedescendant', apple.id);
  });
  await fireEvent.keyDown(content, { key: 'Enter' });
  await waitFor(() => expect(apple).toHaveAttribute('data-selected'));
  await fireEvent.keyDown(content, { key: 'ArrowDown' });
  await waitFor(() => expect(mango).toHaveAttribute('data-highlighted'));
  expect(unavailable).toHaveAttribute('data-disabled');
  expect(unavailable).not.toHaveAttribute('data-highlighted');
});

test('connects provider hooks and scoped context slots', () => {
  const ContextValue = defineComponent({
    setup() {
      return { context: useListboxContext() };
    },
    template: '<output role="status">{{ context.value.join(",") }}</output>',
  });
  const Harness = defineComponent({
    components: { ...listboxComponents, ContextValue },
    setup() {
      return {
        collection: fruits,
        items: fruits.items,
        listbox: useListbox({ collection: fruits, defaultValue: ['mango'] }),
      };
    },
    template: `<ListboxRootProvider :value="listbox"><ListboxContext v-slot="context"><span>{{ context.value.join(',') }}</span></ListboxContext><ListboxContent><ListboxItem v-for="item in items" :key="item.value" :item="item"><ListboxItemContext v-slot="context"><ListboxItemText>{{ context.selected ? item.label + ' selected' : item.label }}</ListboxItemText></ListboxItemContext></ListboxItem></ListboxContent><ContextValue /></ListboxRootProvider>`,
  });

  render(Harness);
  expect(screen.getByRole('status')).toHaveTextContent('mango');
  expect(screen.getByText('Mango selected')).toBeInTheDocument();
  expect(screen.getAllByText('mango')).toHaveLength(2);
});

test('applies consumer classes after CSS Module defaults and keeps clear trigger accessible', () => {
  render(ListboxClearTrigger, { props: { class: 'consumer-clear' } });
  const clear = screen.getByRole('button', { name: 'Clear search' });
  expect(clear).toHaveAttribute('type', 'button');
  expect(clear).toHaveClass(styles.clearTrigger, 'consumer-clear');
  expect(clear.querySelector('svg')).toBeInTheDocument();
});

test('updates clear trigger labels without replacing the host', async () => {
  const label = ref<string | undefined>('Clear fruit');
  render({
    components: { ListboxClearTrigger },
    setup: () => ({ label }),
    template: '<ListboxClearTrigger :aria-label="label" />',
  });
  const host = screen.getByRole('button', { name: 'Clear fruit' });
  label.value = 'Clear vegetables';
  await nextTick();
  expect(host).toHaveAccessibleName('Clear vegetables');
  label.value = undefined;
  await nextTick();
  expect(screen.getByRole('button', { name: 'Clear search' })).toBe(host);
});

test('shows the selected value when ValueText has no consumer slot', async () => {
  const value = ref(['apple']);
  const custom = ref(false);
  const valueRef = ref<ComponentPublicInstance>();
  render(
    defineComponent({
      components: listboxComponents,
      setup() {
        return { collection: fruits, value, custom, valueRef };
      },
      template: `<Listbox :collection="collection" v-model="value"><ListboxContent /><ListboxValueText ref="valueRef" data-testid="value" class="consumer-value" title="Selected fruit" placeholder="Choose fruit"><template v-if="custom" #default><strong>Custom value</strong></template></ListboxValueText></Listbox>`,
    }),
  );

  expect(screen.getByText('Apple')).toHaveAttribute('data-slot', 'listbox-value-text');
  expect(valueRef.value?.$el).toBe(screen.getByTestId('value'));
  value.value = ['mango'];
  await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('Mango'));
  custom.value = true;
  await nextTick();
  expect(screen.getByText('Custom value').tagName).toBe('STRONG');
  expect(screen.getByTestId('value')).toHaveClass('consumer-value');
  expect(screen.getByTestId('value')).toHaveAttribute('title', 'Selected fruit');
  expect(valueRef.value?.$el).toBe(screen.getByTestId('value'));
  custom.value = false;
  await nextTick();
  expect(screen.getByTestId('value')).toHaveTextContent('Mango');
  expect(screen.queryByText('Custom value')).toBeNull();
  value.value = [];
  await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('Choose fruit'));
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const App = defineComponent({
    components: listboxComponents,
    setup() {
      return { collection: fruits, item: fruits.items[0] };
    },
    template:
      '<Listbox :collection="collection"><ListboxLabel>Server fruit</ListboxLabel><ListboxContent><ListboxItem :item="item">Apple</ListboxItem></ListboxContent></Listbox>',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="listbox-root"');
  expect(html).toContain('data-slot="listbox-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);
  expect(host.querySelectorAll('[data-slot="listbox-root"]')).toHaveLength(1);
  expect(host.querySelector('[role="listbox"]')).toBeInTheDocument();
  expect(host.querySelector('[role="option"]')).toHaveTextContent('Apple');
  app.unmount();
  host.remove();
});