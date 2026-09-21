import { createListCollection } from '@ark-ui/solid/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Field, Select, useSelect, useSelectContext } from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitSelect(props: { defaultOpen?: boolean; defaultValue?: string[] }) {
  return (
    <Select
      collection={fruits}
      defaultOpen={props.defaultOpen ?? true}
      defaultValue={props.defaultValue}
      name="fruit"
      portalled={false}
    >
      <Select.Label>Fruit</Select.Label>
      <Select.Field placeholder="Select fruit" clearLabel="Clear fruit" />
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
            <Select.Item item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select>
  );
}

test('keeps default values and native form values Ark-shaped', () => {
  const { container } = render(() => (
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>
  ));

  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');
  expect(screen.getByRole('button', { name: 'Clear fruit' })).toBeVisible();
});

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(() => <FruitSelect />);

  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;

  expect(control).toContainElement(indicator);
  expect(trigger).not.toContainElement(indicator);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  const { container } = render(() => (
    <form>
      <FruitSelect defaultOpen={false} />
    </form>
  ));
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });

  trigger.focus();
  fireEvent.focusIn(trigger);
  fireEvent.click(trigger);
  const content = await waitFor(() => screen.getByRole('listbox'));
  content.focus();
  fireEvent.focusIn(content);
  fireEvent.keyDown(content, { key: 'ArrowDown' });
  fireEvent.keyDown(content, { key: 'Enter' });

  await waitFor(() => expect(trigger).toHaveTextContent('Apple'));
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');

  fireEvent.click(screen.getByRole('button', { name: 'Clear fruit' }));

  await waitFor(() => expect(trigger).toHaveTextContent('Select fruit'));
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards root and field refs', () => {
  let rootRef!: HTMLDivElement;
  let fieldRef!: HTMLDivElement;
  const { container } = render(() => (
    <Select ref={(element) => (rootRef = element)} collection={fruits} defaultOpen>
      <Select.Label>Portalled fruit</Select.Label>
      <Select.Field ref={(element) => (fieldRef = element)} placeholder="Select fruit" />
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
            <Select.Item item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select>
  ));

  const listbox = screen.getByRole('listbox');

  expect(rootRef).toHaveAttribute('data-slot', 'select-root');
  expect(fieldRef).toHaveAttribute('data-slot', 'select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body).toContainElement(listbox);
});

test('inherits Field state in the trigger and explicit native form control', () => {
  const { container } = render(() => (
    <Field disabled invalid required>
      <FruitSelect defaultValue={['apple']} />
    </Field>
  ));

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
  const { container } = render(() => (
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>
  ));

  const mango = screen.getByRole('option', { name: 'Mango' });
  fireEvent.pointerDown(mango, { button: 0 });
  fireEvent.click(mango);
  await waitFor(() =>
    expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('mango'),
  );

  container.querySelector('form')!.reset();

  await waitFor(() =>
    expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple'),
  );
});

test('exposes RootProvider state through the moduix context hook', () => {
  function ContextValue() {
    const select = useSelectContext();

    return <output>{select().value.join(',')}</output>;
  }

  function ProviderSelect() {
    const select = useSelect({ collection: fruits, defaultValue: ['mango'] });

    return (
      <Select.RootProvider value={select} portalled={false}>
        <Select.Label>Provider fruit</Select.Label>
        <Select.Field placeholder="Select fruit" />
        <ContextValue />
      </Select.RootProvider>
    );
  }

  render(() => <ProviderSelect />);

  expect(screen.getByRole('status')).toHaveTextContent('mango');
});

test('preserves native asChild composition and its Ark Solid ref limitation', () => {
  let rootRef: HTMLDivElement | undefined;

  const { container } = render(() => (
    <Select
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Fruit selection" />}
      collection={fruits}
    >
      <Select.Label>Fruit</Select.Label>
      <Select.Field placeholder="Select fruit" />
      <Select.HiddenSelect />
    </Select>
  ));

  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'select-root');
  expect(root.querySelector('select')).toBeInTheDocument();
  expect(container.contains(root)).toBe(true);
  expect(rootRef).toBeUndefined();
});

test('lets consumer utilities replace defaults and keeps visual parts visible', () => {
  const { container } = render(() => (
    <Select class="w-80" collection={fruits} defaultOpen defaultValue={['apple']} portalled={false}>
      <Select.Label>Styled fruit</Select.Label>
      <Select.Control>
        <Select.Trigger class="h-8 rounded-lg">
          <Select.ValueText />
        </Select.Trigger>
        <Select.ClearTrigger class="size-5" aria-label="Clear styled fruits" />
        <Select.Indicator class="size-6" />
      </Select.Control>
      <Select.Positioner>
        <Select.Content class="p-0">
          <Select.List>
            <Select.Item item={fruits.items[0]} class="px-0">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Positioner>
    </Select>
  ));

  const root = container.querySelector('[data-slot="select-root"]')!;
  const trigger = container.querySelector('[data-slot="select-trigger"]')!;
  const clear = container.querySelector('[data-slot="select-clear-trigger"]')!;
  const indicator = container.querySelector('[data-slot="select-indicator"]')!;
  const content = container.querySelector('[data-slot="select-content"]')!;
  const item = container.querySelector('[data-slot="select-item"]')!;
  const itemText = container.querySelector('[data-slot="select-item-text"]')!;
  const itemIndicator = container.querySelector('[data-slot="select-item-indicator"]')!;

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-56');
  expect(trigger).toHaveClass('h-8', 'rounded-lg');
  expect(trigger).not.toHaveClass('h-control-md', 'rounded-md');
  expect(clear).toHaveClass('size-5', 'end-[2.125rem]', 'pointer-events-auto');
  expect(clear).not.toHaveClass('size-control-xs');
  expect(indicator).toHaveClass('size-6', 'pointer-events-none');
  expect(indicator).not.toHaveClass('size-control-xs');
  expect(content).toHaveClass('p-0');
  expect(content).not.toHaveClass('py-1');
  expect(item).toHaveClass('min-h-control-sm', 'px-0', 'text-sm');
  expect(item).not.toHaveClass('px-3');
  expect(itemText).toHaveClass('min-w-0', 'flex-1');
  expect(itemIndicator).toHaveClass('size-3.5');
});
