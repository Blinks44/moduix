import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Field, Select, useSelect, useSelectContext } from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitSelect({
  defaultOpen = true,
  defaultValue,
}: {
  defaultOpen?: boolean;
  defaultValue?: string[];
}) {
  return (
    <Select
      collection={fruits}
      defaultOpen={defaultOpen}
      defaultValue={defaultValue}
      name="fruit"
      portalled={false}
    >
      <Select.Label>Fruit</Select.Label>
      <Select.Field placeholder="Select fruit" clearLabel="Clear fruit" />
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
            <Select.Item key={item.value} item={item}>
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
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>,
  );

  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');
  expect(screen.getByRole('button', { name: 'Clear fruit' })).toBeVisible();
});

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(<FruitSelect />);

  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;

  expect(control).toContainElement(indicator);
  expect(trigger).not.toContainElement(indicator);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  const { container } = render(
    <form>
      <FruitSelect defaultOpen={false} />
    </form>,
  );
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const user = userEvent.setup();

  await user.click(trigger);
  await user.keyboard('{ArrowDown}{Enter}');

  expect(trigger).toHaveTextContent('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');

  await user.click(screen.getByRole('button', { name: 'Clear fruit' }));

  expect(trigger).toHaveTextContent('Select fruit');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards root and field refs', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fieldRef = createRef<HTMLDivElement>();
  const { container } = render(
    <Select ref={rootRef} collection={fruits} defaultOpen>
      <Select.Label>Portalled fruit</Select.Label>
      <Select.Field ref={fieldRef} placeholder="Select fruit" />
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select>,
  );

  const listbox = screen.getByRole('listbox');

  expect(rootRef.current).toHaveAttribute('data-slot', 'select-root');
  expect(fieldRef.current).toHaveAttribute('data-slot', 'select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body).toContainElement(listbox);
});

test('inherits Field state in the trigger and explicit native form control', () => {
  const { container } = render(
    <Field disabled invalid required>
      <FruitSelect defaultValue={['apple']} />
    </Field>,
  );

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
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>,
  );

  fireEvent.click(screen.getByRole('option', { name: 'Mango' }));
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
    return <output>{select.value.join(',')}</output>;
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

  render(<ProviderSelect />);

  expect(screen.getByRole('status')).toHaveTextContent('mango');
});

test('preserves native asChild composition and forwards its root ref', () => {
  const rootRef = createRef<HTMLDivElement>();

  const { container } = render(
    <Select ref={rootRef} asChild collection={fruits}>
      <section aria-label="Fruit selection">
        <Select.Label>Fruit</Select.Label>
        <Select.Field placeholder="Select fruit" />
        <Select.HiddenSelect />
      </section>
    </Select>,
  );

  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'select-root');
  expect(root.querySelector('select')).toBeInTheDocument();
  expect(container.contains(root)).toBe(true);
  expect(rootRef.current).toBe(root);
});

test('lets consumer utilities replace defaults and keeps visual parts visible', () => {
  const { container } = render(
    <Select
      className="w-80"
      collection={fruits}
      defaultOpen
      defaultValue={['apple']}
      portalled={false}
    >
      <Select.Label>Styled fruit</Select.Label>
      <Select.Control>
        <Select.Trigger className="h-8 rounded-lg">
          <Select.ValueText />
        </Select.Trigger>
        <Select.ClearTrigger className="size-5" aria-label="Clear styled fruits" />
        <Select.Indicator className="size-6" />
      </Select.Control>
      <Select.Positioner>
        <Select.Content className="p-0">
          <Select.List>
            <Select.Item item={fruits.items[0]} className="px-0">
              <Select.ItemText>Apple</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Positioner>
    </Select>,
  );

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
