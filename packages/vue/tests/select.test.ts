import { createListCollection } from '@ark-ui/vue/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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
  expect(host).toHaveTextContent('Choose fruit');
  value.value = ['apple'];
  await waitFor(() => expect(screen.getByTestId('value-text')).toHaveTextContent('Apple'));
  custom.value = true;
  await waitFor(() => expect(screen.getByTestId('value-text')).toHaveTextContent('Custom value'));
  expect(screen.getByTestId('value-text')).toBe(host);
  expect(valueRef.value?.$el).toBe(host);
  value.value = ['mango'];
  custom.value = false;
  await waitFor(() => expect(screen.getByTestId('value-text')).toHaveTextContent('Mango'));
  value.value = [];
  await waitFor(() => expect(screen.getByTestId('value-text')).toHaveTextContent('Choose fruit'));
  expect(screen.getByTestId('value-text')).toBe(host);
  expect(host).toHaveAttribute('data-slot', 'select-value-text');
  expect(host).toHaveClass('consumer-value');
  expect(host).toHaveStyle({ color: 'red' });
  expect(valueRef.value?.$el).toBe(host);
});

test('preserves Ark semantics, Vue refs, anatomy, attrs, and flat exports', () => {
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

  const { container } = render(Harness);
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const item = screen.getByRole('option', { name: 'Apple' });
  const root = rootRef.value?.$el as HTMLElement;

  expect('Root' in Select).toBe(false);
  expect(root).toHaveAttribute('data-scope', 'select');
  expect(root).toHaveAttribute('data-slot', 'select-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(fieldRef.value?.$el).toHaveAttribute('data-slot', 'select-control');
  expect(itemRef.value?.$el).toBe(item);
  expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(item).toHaveAttribute('data-slot', 'select-item');
  expect(item.querySelector('[data-slot="select-item-text"]')).toHaveTextContent('Apple');
  expect(container.querySelector('[data-slot="select-item-indicator"]')).not.toBeInTheDocument();
});

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(FruitSelect);

  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;

  expect(control).toContainElement(indicator);
  expect(trigger).not.toContainElement(indicator);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  const { container } = render({
    components: { FruitSelect },
    template: '<form><FruitSelect :default-open="false" /></form>',
  });
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });

  await fireEvent.click(trigger);
  const listbox = screen.getByRole('listbox');
  listbox.focus();
  await fireEvent.keyDown(listbox, { key: 'ArrowDown' });
  await fireEvent.keyDown(listbox, { key: 'Enter' });

  await waitFor(() => expect(trigger).toHaveTextContent('Apple'));
  expect(
    new FormData(container.querySelector('form') ?? document.createElement('form')).get('fruit'),
  ).toBe('apple');

  await fireEvent.click(screen.getByRole('button', { name: 'Clear fruit' }));
  await waitFor(() => expect(trigger).toHaveTextContent('Select fruit'));
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

  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'select-root');
  expect(fieldRef.value?.$el).toHaveAttribute('data-slot', 'select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body).toContainElement(listbox);
});

test('inherits Field state in the trigger and explicit native form control', () => {
  const { container } = render({
    components: { ...selectComponents, FruitSelect },
    template:
      '<Field disabled invalid required><FruitSelect :default-value="[\'apple\']" /></Field>',
  });

  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const control = container.querySelector('[data-slot="select-control"]');
  const nativeSelect = container.querySelector('select');

  expect(trigger).toBeDisabled();
  expect(trigger).toHaveAttribute('aria-invalid', 'true');
  expect(control).toHaveAttribute('data-disabled');
  expect(control).toHaveAttribute('data-invalid');
  expect(nativeSelect).toBeDisabled();
  expect(nativeSelect).toBeRequired();
});

test('resets an explicit native form control to its default selection', async () => {
  const { container } = render({
    components: { FruitSelect },
    template: '<form><FruitSelect :default-value="[\'apple\']" /></form>',
  });

  await fireEvent.click(screen.getByRole('option', { name: 'Mango' }));
  await waitFor(() =>
    expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('mango'),
  );

  container.querySelector('form')!.reset();
  await waitFor(() =>
    expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple'),
  );
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
  await fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));
  await fireEvent.click(screen.getByRole('option', { name: 'Mango' }));

  await waitFor(() => expect(screen.getByText('Value: mango')).toBeInTheDocument());
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
  expect(screen.getByText('Not selected')).toBeInTheDocument();
  expect(screen.getByText('Selected')).toBeInTheDocument();
  expect(screen.getByText('Selected slot')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Choose apple' }));
  await waitFor(() => expect(screen.getAllByText('apple')).toHaveLength(2));
});

test('preserves semantic hosts and refs with asChild', () => {
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
  expect(root).toHaveAttribute('data-slot', 'select-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(root.querySelector('select')).toBeInTheDocument();
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const App = defineComponent({
    components: selectComponents,
    setup() {
      return { collection: fruits, items: fruits.items };
    },
    template: `
      <Select :collection="collection" default-open :portalled="false">
        <SelectLabel>Server fruit</SelectLabel>
        <SelectField placeholder="Select fruit" />
        <SelectPositioner>
          <SelectContent>
            <SelectList><SelectItem v-for="item in items" :key="item.value" :item="item">{{ item.label }}</SelectItem></SelectList>
          </SelectContent>
        </SelectPositioner>
      </Select>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="select-root"');
  expect(html).toContain('data-slot="select-trigger"');
  expect(html).toContain('data-slot="select-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect(host.querySelectorAll('[data-slot="select-root"]')).toHaveLength(1);
  expect(host.querySelector('[role="combobox"]')).toBeInTheDocument();
  expect(host.querySelector('[role="option"]')).toHaveTextContent('Apple');
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});