import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, useSelect, useSelectContext } from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitSelect({
  defaultOpen = true,
  defaultValue,
  nativeFormControl,
}: {
  defaultOpen?: boolean;
  defaultValue?: string[];
  nativeFormControl?: 'input' | 'select';
}) {
  return (
    <Select
      collection={fruits}
      defaultOpen={defaultOpen}
      defaultValue={defaultValue}
      name="fruit"
      nativeFormControl={nativeFormControl}
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
  const rootRef = { current: null as HTMLDivElement | null };
  const fieldRef = { current: null as HTMLDivElement | null };
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

test('keeps virtualized form controls connected to reset and fieldset state', async () => {
  const { container } = render(
    <form>
      <fieldset disabled>
        <FruitSelect defaultValue={['apple']} nativeFormControl="input" />
      </fieldset>
    </form>,
  );

  const control = container.querySelector('[data-slot="select-control"]')!;
  await waitFor(() => expect(control).toHaveAttribute('data-disabled'));

  expect(container.querySelector('[data-slot="select-hidden-input-proxy"]')).toHaveProperty(
    'options.length',
    0,
  );
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBeNull();
  expect(container.querySelector('[data-slot="select-hidden-input-proxy"]')).toHaveAttribute('id');
});

test('resets input form controls to their default selection', async () => {
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} nativeFormControl="input" />
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