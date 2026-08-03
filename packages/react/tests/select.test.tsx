import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Select, useSelect, useSelectContext } from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitSelect({
  defaultValue,
  nativeFormControl,
}: {
  defaultValue?: string[];
  nativeFormControl?: 'input' | 'select';
}) {
  return (
    <Select
      collection={fruits}
      defaultOpen
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