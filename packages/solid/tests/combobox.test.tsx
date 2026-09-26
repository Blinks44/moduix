import { createListCollection } from '@ark-ui/solid/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
  ComboboxTrigger,
} from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitCombobox(props: { defaultValue?: string[] }) {
  return (
    <Combobox collection={fruits} defaultOpen defaultValue={props.defaultValue} name="fruit">
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
              <ComboboxOption item={item}>{item.label}</ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}

test('keeps default values and form values Ark-shaped', () => {
  const { container } = render(() => (
    <form>
      <FruitCombobox defaultValue={['apple']} />
    </form>
  ));

  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('keeps controlled input changes consumer-owned', () => {
  function ControlledCombobox() {
    const [inputValue, setInputValue] = createSignal('mango');

    return (
      <>
        <Combobox
          collection={fruits}
          inputValue={inputValue()}
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

  render(() => <ControlledCombobox />);

  fireEvent.click(screen.getByRole('button', { name: 'Set apple' }));

  expect(screen.getByRole('combobox', { name: 'Controlled fruit' })).toHaveValue('apple');
});

test('selects with the keyboard and clears through the default accessible action', async () => {
  const { container } = render(() => (
    <form>
      <FruitCombobox />
    </form>
  ));

  const input = screen.getByRole('combobox', { name: 'Fruit' });

  fireEvent.click(input);
  await waitFor(() => expect(screen.getByRole('listbox')).toBeVisible());
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(input).toHaveValue('Apple'));

  fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));

  await waitFor(() => expect(input).toHaveValue(''));
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards the root ref', async () => {
  let rootRef!: HTMLDivElement;
  const { container } = render(() => (
    <Combobox ref={(element) => (rootRef = element)} collection={fruits} defaultOpen>
      <ComboboxLabel>Portalled fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxList>
            {fruits.items.map((item) => (
              <ComboboxOption item={item}>{item.label}</ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  ));

  const list = await waitFor(() => screen.getByRole('listbox'));

  expect(rootRef).toHaveAttribute('data-slot', 'combobox-root');
  expect(container.contains(list)).toBe(false);
  expect(document.body).toContainElement(list);
});

test('exposes RootProvider state through the moduix context hook', () => {
  function ContextValue() {
    const combobox = useComboboxContext();
    return <output>{combobox().open ? 'open' : 'closed'}</output>;
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

  render(() => <ProviderCombobox />);

  expect(screen.getByText('open')).toBeVisible();
});

test('preserves native asChild composition and its Ark Solid ref limitation', () => {
  let rootRef: HTMLDivElement | undefined;

  const { container } = render(() => (
    <Combobox
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Fruit selection" />}
      collection={fruits}
    >
      <ComboboxLabel>Fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
      </ComboboxControl>
    </Combobox>
  ));

  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'combobox-root');
  expect(container.contains(root)).toBe(true);
  expect(rootRef).toBeUndefined();
});