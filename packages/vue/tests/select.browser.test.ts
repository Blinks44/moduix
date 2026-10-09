import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref, nextTick } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
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
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectList,
  SelectPositioner,
  SelectRootProvider,
  SelectTrigger,
  SelectValueText,
  useSelect,
  useSelectContext,
  useSelectItemContext,
} from '../src';
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
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectList,
  SelectPositioner,
  SelectRootProvider,
  SelectTrigger,
  SelectValueText,
} as unknown as Record<string, Component>;

const FruitSelect = defineComponent({
  components: selectComponents,
  props: {
    defaultOpen: { type: Boolean, default: true },
    defaultValue: { type: Array<string>, default: undefined },
    modelValue: { type: Array<string>, default: undefined },
    portalled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'valueChange'],
  setup() {
    return { collection: fruits, items: fruits.items };
  },
  template: `
    <Select
      :collection="collection"
      :default-open="defaultOpen"
      :default-value="modelValue === undefined ? defaultValue : undefined"
      :model-value="modelValue"
      :portalled="portalled"
      name="fruit"
      @update:model-value="$emit('update:modelValue', $event)"
      @value-change="$emit('valueChange', $event)"
    >
      <SelectLabel>Fruit</SelectLabel>
      <SelectField placeholder="Select fruit" clear-label="Clear fruit" />
      <SelectPositioner>
        <SelectContent>
          <SelectList>
            <SelectItem v-for="item in items" :key="item.value" :item="item">
              <SelectItemText>{{ item.label }}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          </SelectList>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
  `,
});

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
  await expect.element(hostLocator).toHaveCSS('color', 'rgb(255, 0, 0)');
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

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(FruitSelect);

  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;

  expect(control!.contains(indicator)).toBe(true);
  expect(trigger!.contains(indicator)).not.toBe(true);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  const { container } = render({
    components: { FruitSelect },
    template: '<form><FruitSelect :default-open="false" /></form>',
  });

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  const listbox = page.locator('[data-slot="select-list"]');
  await expect.element(listbox).toBeFocused();
  await listbox.press('ArrowDown');
  await listbox.press('Enter');

  await expect.element(combobox).toContainText('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');

  await page.getByRole('button', { name: 'Clear fruit', exact: true }).click();
  await expect.element(combobox).toContainText('Select fruit');
});

test('portals popup content by default and forwards root and field refs', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const fieldRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: selectComponents,
    setup() {
      return { collection: fruits, items: fruits.items, fieldRef, rootRef };
    },
    template: `
      <Select ref="rootRef" :collection="collection" default-open :portalled="true">
        <SelectLabel>Portalled fruit</SelectLabel>
        <SelectField ref="fieldRef" placeholder="Select fruit" />
        <SelectPositioner>
          <SelectContent>
            <SelectList><SelectItem v-for="item in items" :key="item.value" :item="item">{{ item.label }}</SelectItem></SelectList>
          </SelectContent>
        </SelectPositioner>
      </Select>
    `,
  });

  const { container } = render(Harness);
  const listbox = screen.getByRole('listbox');

  expect(rootRef.value!.$el.getAttribute('data-slot')).toBe('select-root');
  expect(fieldRef.value!.$el.getAttribute('data-slot')).toBe('select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body!.contains(listbox)).toBe(true);
});

test('inherits Field state in the trigger and explicit native form control', async () => {
  render({
    components: { ...selectComponents, FruitSelect },
    template:
      '<Field disabled invalid required><FruitSelect :default-value="[\'apple\']" /></Field>',
  });

  await expect.element(page.getByRole('combobox', { name: 'Fruit', exact: true })).toBeDisabled();
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.locator('[data-slot="select-control"]'))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.locator('[data-slot="select-control"]'))
    .toHaveAttribute('data-invalid');
  await expect.element(page.locator('select')).toBeDisabled();
  await expect.element(page.locator('select')).toHaveAttribute('required');
});

test('resets an explicit native form control to its default selection', async () => {
  const { container } = render({
    components: { FruitSelect },
    template: '<form><FruitSelect :default-value="[\'apple\']" /></form>',
  });

  await page.getByRole('option', { name: 'Mango', exact: true }).click();
  await expect
    .poll(() => new FormData(container.querySelector('form')!).get('fruit'))
    .toBe('mango');

  container.querySelector('form')!.reset();
  await expect
    .poll(() => new FormData(container.querySelector('form')!).get('fruit'))
    .toBe('apple');
});

test('supports v-model and notifies each Vue listener once', async () => {
  const details: string[][] = [];
  const Harness = defineComponent({
    components: { FruitSelect },
    setup() {
      const value = ref<string[]>([]);
      return { details, value };
    },
    template: `
      <FruitSelect v-model="value" :default-open="false" @value-change="details.push($event.value)" />
      <output>Value: {{ value.join(', ') }}</output>
    `,
  });

  render(Harness);
  await page.getByRole('combobox', { name: 'Fruit', exact: true }).click();
  await expect.element(page.locator('[data-slot="select-list"]')).toBeFocused();
  await page.getByRole('option', { name: 'Mango', exact: true }).click();

  await expect.element(page.getByText('Value: mango')).toBeAttached();
  expect(details).toEqual([['mango']]);
});

test('keeps provider, context, item context, and scoped slots connected', async () => {
  const RootState = defineComponent({
    setup() {
      const select = useSelectContext();
      const chooseApple = () => select.value.setValue(['apple']);
      return { chooseApple, select };
    },
    template:
      '<button type="button" @click="chooseApple">Choose apple</button><output>{{ select.value.join(", ") }}</output>',
  });
  const ItemState = defineComponent({
    setup() {
      return { item: useSelectItemContext() };
    },
    template: '<span>{{ item.selected ? "Selected" : "Not selected" }}</span>',
  });
  const Harness = defineComponent({
    components: { ...selectComponents, ItemState, RootState },
    setup() {
      return {
        collection: fruits,
        items: fruits.items,
        select: useSelect({ collection: fruits, defaultValue: ['mango'], open: true }),
      };
    },
    template: `
      <SelectRootProvider :value="select" :portalled="false">
        <RootState />
        <SelectContext v-slot="context"><output>{{ context.value.join(', ') }}</output></SelectContext>
        <SelectLabel>Provider fruit</SelectLabel>
        <SelectField placeholder="Select fruit" />
        <SelectPositioner>
          <SelectContent>
            <SelectList>
              <SelectItem v-for="item in items" :key="item.value" :item="item">
                <SelectItemText>{{ item.label }} <ItemState /></SelectItemText>
                <SelectItemContext v-slot="context"><span>{{ context.selected ? 'Selected slot' : 'Not selected slot' }}</span></SelectItemContext>
              </SelectItem>
            </SelectList>
          </SelectContent>
        </SelectPositioner>
      </SelectRootProvider>
    `,
  });

  render(Harness);
  expect(screen.getAllByText('mango')).toHaveLength(2);
  await expect.element(page.getByText('Not selected', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Selected', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Selected slot', { exact: true })).toBeAttached();

  await page.getByRole('button', { name: 'Choose apple', exact: true }).click();
  await expect.poll(() => screen.getAllByText('apple')).toHaveLength(2);
});

test('preserves semantic hosts and refs with asChild', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: selectComponents,
    setup() {
      return { collection: fruits, rootRef };
    },
    template: `
      <Select ref="rootRef" as-child :collection="collection">
        <section aria-label="Fruit selection">
          <SelectLabel>Fruit</SelectLabel>
          <SelectField placeholder="Select fruit" />
          <SelectHiddenSelect />
        </section>
      </Select>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Fruit selection', exact: true }))
    .toHaveAttribute('data-slot', 'select-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(Boolean(root.querySelector('select')?.isConnected)).toBe(true);
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