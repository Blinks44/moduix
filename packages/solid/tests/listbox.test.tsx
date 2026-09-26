import { createListCollection } from '@ark-ui/solid/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxItem,
  ListboxItemContext,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxRootProvider,
  useListbox,
  useListboxContext,
} from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
    { label: 'Unavailable', value: 'unavailable', disabled: true },
  ],
});

function FruitListbox(props: { defaultValue?: string[] }) {
  return (
    <Listbox collection={fruits} defaultValue={props.defaultValue}>
      <ListboxLabel>Fruit</ListboxLabel>
      <ListboxContent>
        {fruits.items.map((item) => (
          <ListboxItem item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}

test('preserves Ark semantics, refs, and stable styling hooks', () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <Listbox ref={(element) => (rootRef = element)} collection={fruits} defaultValue={['apple']}>
      <ListboxLabel>Fruit</ListboxLabel>
      <ListboxContent>
        {fruits.items.map((item) => (
          <ListboxItem item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ));

  const content = screen.getByRole('listbox', { name: 'Fruit' });
  const apple = screen.getByRole('option', { name: 'Apple' });

  expect(content).toHaveAttribute('data-slot', 'listbox-content');
  expect(apple).toHaveAttribute('data-slot', 'listbox-item');
  expect(apple).toHaveAttribute('data-selected');
  expect(rootRef).toHaveAttribute('data-slot', 'listbox-root');
});

test('renders controlled values from consumer state', () => {
  function ControlledListbox() {
    const [value, setValue] = createSignal<string[]>(['mango']);

    return (
      <>
        <Listbox
          collection={fruits}
          value={value()}
          onValueChange={(details) => setValue(details.value)}
        >
          <ListboxLabel>Controlled fruit</ListboxLabel>
          <ListboxContent>
            {fruits.items.map((item) => (
              <ListboxItem item={item}>
                <ListboxItemText>{item.label}</ListboxItemText>
              </ListboxItem>
            ))}
          </ListboxContent>
        </Listbox>
        <button type="button" onClick={() => setValue(['apple'])}>
          Set apple
        </button>
      </>
    );
  }

  render(() => <ControlledListbox />);

  fireEvent.click(screen.getByRole('button', { name: 'Set apple' }));

  expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('data-selected');
  expect(screen.getByRole('option', { name: 'Mango' })).not.toHaveAttribute('data-selected');
});

test('exposes initial item state through the Ark ItemContext', () => {
  render(() => (
    <Listbox collection={fruits} defaultValue={['apple']}>
      <ListboxContent>
        {fruits.items.map((item) => (
          <ListboxItem item={item}>
            <ListboxItemContext>
              {(itemContext) => (
                <ListboxItemText>
                  {itemContext().selected ? `${item.label} (selected)` : item.label}
                </ListboxItemText>
              )}
            </ListboxItemContext>
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ));

  expect(screen.getByRole('option', { name: 'Apple (selected)' })).toHaveAttribute('data-selected');
});

test('keeps disabled items unavailable and content focusable for keyboard navigation', () => {
  render(() => <FruitListbox />);

  const content = screen.getByRole('listbox', { name: 'Fruit' });
  const unavailable = screen.getByRole('option', { name: 'Unavailable' });

  content.focus();
  fireEvent.keyDown(content, { key: 'ArrowDown' });
  fireEvent.click(unavailable);

  expect(content).toHaveFocus();
  expect(unavailable).toHaveAttribute('data-disabled');
  expect(unavailable).not.toHaveAttribute('data-selected');
});

test('selects highlighted enabled items with the keyboard and skips disabled items', async () => {
  render(() => <FruitListbox />);

  const content = screen.getByRole('listbox', { name: 'Fruit' });
  const apple = screen.getByRole('option', { name: 'Apple' });
  const mango = screen.getByRole('option', { name: 'Mango' });
  const unavailable = screen.getByRole('option', { name: 'Unavailable' });

  content.focus();
  fireEvent.keyDown(content, { key: 'ArrowDown' });

  await waitFor(() => {
    expect(apple).toHaveAttribute('data-highlighted');
    expect(content).toHaveAttribute('aria-activedescendant', apple.id);
  });

  fireEvent.keyDown(content, { key: 'Enter' });

  await waitFor(() => expect(apple).toHaveAttribute('data-selected'));

  fireEvent.keyDown(content, { key: 'ArrowDown' });

  await waitFor(() => expect(mango).toHaveAttribute('data-highlighted'));
  expect(unavailable).not.toHaveAttribute('data-highlighted');
});

test('exposes RootProvider state through the moduix context hook', () => {
  function ContextValue() {
    const listbox = useListboxContext();
    return <output>{listbox().value.join(',')}</output>;
  }

  function ProviderListbox() {
    const listbox = useListbox({ collection: fruits, defaultValue: ['mango'] });

    return (
      <ListboxRootProvider value={listbox}>
        <ListboxLabel>Provider fruit</ListboxLabel>
        <ListboxContent>
          {fruits.items.map((item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
            </ListboxItem>
          ))}
        </ListboxContent>
        <ContextValue />
      </ListboxRootProvider>
    );
  }

  render(() => <ProviderListbox />);

  expect(screen.getByRole('status')).toHaveTextContent('mango');
});

test('renders the consumer-wired clear trigger as an accessible button', () => {
  const handleClick = () => undefined;

  render(() => <ListboxClearTrigger onClick={handleClick} />);

  expect(screen.getByRole('button', { name: 'Clear search' })).toHaveAttribute('type', 'button');
});