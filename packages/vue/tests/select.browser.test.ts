import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, ref, nextTick } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  SelectOption,
  Field,
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectContext,
  SelectControl,
  SelectField,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemContext,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPositioner,
  SelectRootProvider,
  SelectTrigger,
  SelectValueText,
} from '@/index';
import SsrSelect from './fixtures/SsrSelect.vue';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

const selectComponents = {
  Field,
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectContext,
  SelectControl,
  SelectField,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemContext,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPositioner,
  SelectRootProvider,
  SelectTrigger,
  SelectValueText,
} as unknown as Record<string, Component>;

test('switches between native value text and an optional custom slot', async () => {
  const custom = ref(false);
  const value = ref<string[]>([]);
  const valueRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: selectComponents,
    setup() {
      return { custom, value, valueRef, collection: fruits };
    },
    template: `
      <Select :collection="collection" v-model="value" :portalled="false">
        <SelectControl><SelectTrigger>
          <SelectValueText ref="valueRef" placeholder="Choose fruit" class="consumer-value"
            style="color: red" data-testid="value-text">
            <template v-if="custom" #default><span>Custom value</span></template>
          </SelectValueText>
        </SelectTrigger></SelectControl>
      </Select>
    `,
  });

  render(App);
  const host = screen.getByTestId('value-text');
  const hostLocator = page.getByTestId('value-text');
  await expect.element(hostLocator).toContainText('Choose fruit');
  value.value = ['apple'];
  await expect.element(hostLocator).toContainText('Apple');
  custom.value = true;
  await expect.element(hostLocator).toContainText('Custom value');
  expect(screen.getByTestId('value-text')).toBe(host);
  expect(valueRef.value?.$el).toBe(host);
  value.value = ['mango'];
  custom.value = false;
  await expect.element(hostLocator).toContainText('Mango');
  value.value = [];
  await expect.element(hostLocator).toContainText('Choose fruit');
  expect(screen.getByTestId('value-text')).toBe(host);
  await expect.element(hostLocator).toHaveAttribute('data-slot', 'select-value-text');
  expect([...host!.classList]).toEqual(expect.arrayContaining(['consumer-value']));
  expect(valueRef.value?.$el).toBe(host);
});

test('preserves Ark semantics, Vue refs, anatomy, attrs, and flat exports', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const fieldRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: selectComponents,
    setup() {
      return { collection: fruits, item: fruits.items[0], fieldRef, itemRef, rootRef };
    },
    template: `
      <Select ref="rootRef" :collection="collection" default-open data-probe="root">
        <SelectLabel>Fruit</SelectLabel>
        <SelectField ref="fieldRef" placeholder="Select fruit" />
        <SelectPositioner>
          <SelectContent>
            <SelectList>
              <SelectItem ref="itemRef" :item="item">
                <SelectItemText>Apple</SelectItemText>
              </SelectItem>
            </SelectList>
          </SelectContent>
        </SelectPositioner>
      </Select>
    `,
  });

  render(Harness);

  const item = screen.getByRole('option', { name: 'Apple' });
  const root = rootRef.value?.$el as HTMLElement;

  expect('Root' in Select).toBe(false);
  expect(root!.getAttribute('data-scope')).toBe('select');
  expect(root!.getAttribute('data-slot')).toBe('select-root');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(fieldRef.value!.$el.getAttribute('data-slot')).toBe('select-control');
  expect(itemRef.value?.$el).toBe(item);
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('data-slot', 'select-trigger');
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'select-item');
  expect(item.querySelector('[data-slot="select-item-text"]')!.textContent).toContain('Apple');
  await expect.element(page.locator('[data-slot="select-item-indicator"]')).toHaveCount(0);
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrSelect));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const root = host.querySelector('[data-slot="select-root"]');
  const serverNodes = [...host.querySelectorAll('*')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(root).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);

  const app = createSSRApp(SsrSelect);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="select-root"]')).toBe(root);
    expect([...host.querySelectorAll('*')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('option', { name: 'Apple', exact: true }).click();
    await expect
      .element(page.getByRole('combobox', { name: 'Server fruit', exact: true }))
      .toContainText('Apple');
  } finally {
    app.unmount();
    host.remove();
  }
});

test('renders an option row with a replaceable indicator', async () => {
  render({
    components: { ...selectComponents, SelectOption },
    setup: () => ({ fruits }),
    template: `
      <Select :collection="fruits" default-open :default-value="['apple']" :portalled="false">
        <SelectPositioner><SelectContent>
          <SelectOption :item="fruits.items[0]">Apple</SelectOption>
          <SelectOption :item="fruits.items[1]" :indicator="false">Mango</SelectOption>
        </SelectContent></SelectPositioner>
      </Select>
    `,
  });

  await expect.element(page.getByRole('option', { name: 'Apple' })).toBeVisible();

  const [apple, mango] = [...document.querySelectorAll<HTMLElement>('[data-slot="select-item"]')];
  expect(apple!.querySelector('[data-slot="select-item-text"]')!.textContent).toBe('Apple');
  expect(apple!.querySelector('[data-slot="select-item-indicator"] svg')).not.toBeNull();
  expect(mango!.querySelector('[data-slot="select-item-indicator"]')).toBeNull();
  expect(document.querySelector('[data-testid="custom-indicator"]')).toBeNull();

  render({
    components: { ...selectComponents, SelectOption },
    setup: () => ({ fruits, indicator: h('span', { 'data-testid': 'custom-indicator' }) }),
    template: `
      <Select :collection="fruits" default-open :default-value="['mango']" :portalled="false">
        <SelectPositioner><SelectContent>
          <SelectOption :item="fruits.items[1]" :indicator="indicator">Mango</SelectOption>
        </SelectContent></SelectPositioner>
      </Select>
    `,
  });
  await expect
    .poll(() => document.querySelector('[data-testid="custom-indicator"]'))
    .not.toBeNull();
});