import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  Combobox,
  useCombobox,
  useComboboxContext,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
} from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitCombobox({ defaultValue }: { defaultValue?: string[] }) {
  return (
    <Combobox collection={fruits} defaultOpen defaultValue={defaultValue} name="fruit">
      <ComboboxLabel>Fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxClearTrigger />
        <ComboboxTrigger aria-label="Open fruits" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxList>
            {fruits.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
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
          <ComboboxLabel>Controlled fruit</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput />
          </ComboboxControl>
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

test('selects with the keyboard and clears through the default accessible action', async () => {
  const { container } = render(
    <form>
      <FruitCombobox />
    </form>,
  );

  const input = screen.getByRole('combobox', { name: 'Fruit' });
  const user = userEvent.setup();

  await user.click(input);
  await user.keyboard('{ArrowDown}{Enter}');

  expect(input).toHaveValue('Apple');

  await user.click(screen.getByRole('button', { name: 'Clear selection' }));

  expect(input).toHaveValue('');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards the root ref', () => {
  const rootRef = { current: null as HTMLDivElement | null };
  const { container } = render(
    <Combobox ref={rootRef} collection={fruits} defaultOpen>
      <ComboboxLabel>Portalled fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxList>
            {fruits.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>,
  );

  const list = screen.getByRole('listbox');

  expect(rootRef.current).toHaveAttribute('data-slot', 'combobox-root');
  expect(container.contains(list)).toBe(false);
  expect(document.body).toContainElement(list);
});

test('exposes RootProvider state through the moduix context hook', () => {
  function ContextValue() {
    const combobox = useComboboxContext();
    return <output>{combobox.open ? 'open' : 'closed'}</output>;
  }

  function ProviderCombobox() {
    const combobox = useCombobox({ collection: fruits, defaultOpen: true });

    return (
      <ComboboxRootProvider value={combobox} portalled={false}>
        <ComboboxLabel>Provider fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxTrigger aria-label="Open provider fruits" />
        </ComboboxControl>
        <ContextValue />
      </ComboboxRootProvider>
    );
  }

  render(<ProviderCombobox />);

  expect(screen.getByText('open')).toBeVisible();
});

test('lets consumer utilities replace defaults and keeps visual parts visible', () => {
  const { container } = render(
    <Combobox className="w-80" collection={fruits} defaultOpen portalled={false}>
      <ComboboxLabel>Styled fruit</ComboboxLabel>
      <ComboboxControl className="rounded-lg">
        <ComboboxInput className="h-8" />
        <ComboboxClearTrigger className="size-5" aria-label="Clear styled fruits" />
        <ComboboxTrigger className="size-6" aria-label="Open styled fruits" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent className="p-0">
          <ComboboxStatus>Loading options</ComboboxStatus>
          <ComboboxList>
            <ComboboxOption item={fruits.items[0]} className="px-0">
              Apple
            </ComboboxOption>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>,
  );

  const root = container.querySelector('[data-slot="combobox-root"]')!;
  const control = container.querySelector('[data-slot="combobox-control"]')!;
  const input = container.querySelector('[data-slot="combobox-input"]')!;
  const clear = container.querySelector('[data-slot="combobox-clear-trigger"]')!;
  const trigger = container.querySelector('[data-slot="combobox-trigger"]')!;
  const content = container.querySelector('[data-slot="combobox-content"]')!;
  const status = container.querySelector('[data-slot="combobox-status"]')!;
  const item = container.querySelector('[data-slot="combobox-item"]')!;
  const itemText = container.querySelector('[data-slot="combobox-item-text"]')!;
  const indicator = container.querySelector('[data-slot="combobox-item-indicator"]')!;

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-64');
  expect(control).toHaveClass('rounded-lg');
  expect(control).not.toHaveClass('rounded-md');
  expect(input).toHaveClass('h-8');
  expect(input).not.toHaveClass('h-control-md');
  expect(clear).toHaveClass(
    'size-5',
    'inset-y-0',
    'my-auto',
    'transition-[background-color,color,opacity]',
  );
  expect(clear).not.toHaveClass('size-control-xs', 'top-1/2', '-translate-y-1/2');
  expect(trigger).toHaveClass('size-6');
  expect(trigger).not.toHaveClass('size-control-xs');
  expect(content).toHaveClass('p-0');
  expect(content).not.toHaveClass('py-1');
  expect(status).toHaveClass('px-4', 'py-1', 'text-sm');
  expect(item).toHaveClass('min-h-control-sm', 'px-0', 'text-sm');
  expect(item).not.toHaveClass('px-3');
  expect(itemText).toHaveClass('min-w-0', 'flex-1');
  expect(indicator).toHaveClass('size-3');
});