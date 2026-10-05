import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrListbox from './fixtures/SsrListbox.vue';

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

test('preserves Ark semantics, refs, and stable styling hooks', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: listboxComponents,
    setup() {
      return { collection: fruits, items: fruits.items, rootRef };
    },
    template: `<Listbox ref="rootRef" :collection="collection" :default-value="['apple']"><ListboxLabel>Fruit</ListboxLabel><ListboxContent><ListboxItem v-for="item in items" :key="item.value" :item="item"><ListboxItemText>{{ item.label }}</ListboxItemText><ListboxItemIndicator /></ListboxItem></ListboxContent></Listbox>`,
  });

  render(Harness);

  const apple = screen.getByRole('option', { name: 'Apple' });

  expect('Root' in Listbox).toBe(false);
  expect(rootRef.value!.$el.getAttribute('data-slot')).toBe('listbox-root');
  await expect
    .element(page.getByRole('listbox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-content');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-item');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  expect(
    Boolean(apple.querySelector('[data-slot="listbox-item-indicator"] svg')?.isConnected),
  ).toBe(true);
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
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-selected');
  await page.getByRole('button', { name: 'Set apple', exact: true }).click();
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('keeps disabled items unavailable and selects enabled items with the keyboard', async () => {
  render(FruitListbox);

  const apple = screen.getByRole('option', { name: 'Apple' });

  const rootLocator = page.getByRole('listbox', { name: 'Fruit', exact: true });
  await rootLocator.press('Home');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-highlighted');
  await expect.element(rootLocator).toHaveAttribute('aria-activedescendant', apple.id);
  await rootLocator.press('Enter');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  await rootLocator.press('ArrowDown');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-highlighted');
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .not.toHaveAttribute('data-highlighted');
});

test('connects provider hooks and scoped context slots', async () => {
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
  await expect.element(page.getByRole('status')).toContainText('mango');
  await expect.element(page.getByText('Mango selected')).toBeAttached();
  expect(screen.getAllByText('mango')).toHaveLength(2);
});

test('applies consumer classes after CSS Module defaults and keeps clear trigger accessible', async () => {
  render(ListboxClearTrigger, { props: { class: 'consumer-clear' } });
  const clear = screen.getByRole('button', { name: 'Clear search' });
  await expect
    .element(page.getByRole('button', { name: 'Clear search', exact: true }))
    .toHaveAttribute('type', 'button');
  expect([...clear!.classList]).toEqual(
    expect.arrayContaining([styles.clearTrigger, 'consumer-clear']),
  );
  expect(Boolean(clear.querySelector('svg')?.isConnected)).toBe(true);
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
  await expect
    .element(page.getByRole('button', { name: 'Clear vegetables', exact: true }))
    .toBeAttached();
  expect(screen.getByRole('button', { name: 'Clear vegetables' })).toBe(host);
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

  await expect.element(page.getByText('Apple')).toHaveAttribute('data-slot', 'listbox-value-text');
  expect(valueRef.value?.$el).toBe(screen.getByTestId('value'));
  value.value = ['mango'];
  const rootLocator = page.getByTestId('value');
  await expect.element(rootLocator).toContainText('Mango');
  custom.value = true;
  await nextTick();
  expect(screen.getByText('Custom value').tagName).toBe('STRONG');
  expect([...screen.getByTestId('value')!.classList]).toEqual(
    expect.arrayContaining(['consumer-value']),
  );
  await expect.element(rootLocator).toHaveAttribute('title', 'Selected fruit');
  expect(valueRef.value?.$el).toBe(screen.getByTestId('value'));
  custom.value = false;
  await nextTick();
  await expect.element(rootLocator).toContainText('Mango');
  expect(screen.queryByText('Custom value')).toBeNull();
  value.value = [];
  await expect.element(rootLocator).toContainText('Choose fruit');
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrListbox));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const root = host.querySelector('[data-slot="listbox-root"]');
  const serverNodes = [...host.querySelectorAll('*')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(root).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);

  const app = createSSRApp(SsrListbox);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="listbox-root"]')).toBe(root);
    expect([...host.querySelectorAll('*')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('listbox', { name: 'Server fruit', exact: true }).press('Home');
    await page.getByRole('listbox', { name: 'Server fruit', exact: true }).press('Enter');
    await expect
      .element(page.getByRole('option', { name: 'Apple', exact: true }))
      .toHaveAttribute('data-selected');
  } finally {
    app.unmount();
    host.remove();
  }
});