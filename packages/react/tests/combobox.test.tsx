import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Combobox, useCombobox, useComboboxContext } from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitCombobox({ defaultValue }: { defaultValue?: string[] }) {
  return (
    <Combobox
      collection={fruits}
      defaultOpen
      defaultValue={defaultValue}
      name="fruit"
      portalled={false}
    >
      <Combobox.Label>Fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger aria-label="Open fruits" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.List>
            {fruits.items.map((item) => (
              <Combobox.Option key={item.value} item={item}>
                {item.label}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}

test('keeps default values and form values Ark-shaped', () => {
  const { container } = render(
    <form>
      <FruitCombobox defaultValue={['apple']} />
    </form>,
  );

  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('keeps controlled input changes consumer-owned', () => {
  function ControlledCombobox() {
    const [inputValue, setInputValue] = useState('mango');

    return (
      <>
        <Combobox
          collection={fruits}
          inputValue={inputValue}
          portalled={false}
          onInputValueChange={(details) => setInputValue(details.inputValue)}
        >
          <Combobox.Label>Controlled fruit</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input />
          </Combobox.Control>
        </Combobox>
        <button type="button" onClick={() => setInputValue('apple')}>
          Set apple
        </button>
      </>
    );
  }

  render(<ControlledCombobox />);

  fireEvent.click(screen.getByRole('button', { name: 'Set apple' }));

  expect(screen.getByRole('combobox', { name: 'Controlled fruit' })).toHaveValue('apple');
});

test('exposes RootProvider state through the moduix context hook', () => {
  function ContextValue() {
    const combobox = useComboboxContext();
    return <output>{combobox.open ? 'open' : 'closed'}</output>;
  }

  function ProviderCombobox() {
    const combobox = useCombobox({ collection: fruits, defaultOpen: true });

    return (
      <Combobox.RootProvider value={combobox} portalled={false}>
        <Combobox.Label>Provider fruit</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.Trigger aria-label="Open provider fruits" />
        </Combobox.Control>
        <ContextValue />
      </Combobox.RootProvider>
    );
  }

  render(<ProviderCombobox />);

  expect(screen.getByText('open')).toBeVisible();
});