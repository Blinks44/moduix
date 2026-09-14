import { createListCollection } from '@ark-ui/solid/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Listbox, useListbox, useListboxContext } from '../src';

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
      <Listbox.Label>Fruit</Listbox.Label>
      <Listbox.Content>
        {fruits.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}

test('preserves Ark semantics, refs, and stable styling hooks', () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <Listbox ref={(element) => (rootRef = element)} collection={fruits} defaultValue={['apple']}>
      <Listbox.Label>Fruit</Listbox.Label>
      <Listbox.Content>
        {fruits.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
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
          <Listbox.Label>Controlled fruit</Listbox.Label>
          <Listbox.Content>
            {fruits.items.map((item) => (
              <Listbox.Item item={item}>
                <Listbox.ItemText>{item.label}</Listbox.ItemText>
              </Listbox.Item>
            ))}
          </Listbox.Content>
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
      <Listbox.Content>
        {fruits.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemContext>
              {(itemContext) => (
                <Listbox.ItemText>
                  {itemContext.selected ? `${item.label} (selected)` : item.label}
                </Listbox.ItemText>
              )}
            </Listbox.ItemContext>
          </Listbox.Item>
        ))}
      </Listbox.Content>
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
      <Listbox.RootProvider value={listbox}>
        <Listbox.Label>Provider fruit</Listbox.Label>
        <Listbox.Content>
          {fruits.items.map((item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
            </Listbox.Item>
          ))}
        </Listbox.Content>
        <ContextValue />
      </Listbox.RootProvider>
    );
  }

  render(() => <ProviderListbox />);

  expect(screen.getByRole('status')).toHaveTextContent('mango');
});

test('renders the consumer-wired clear trigger as an accessible button', () => {
  const handleClick = () => undefined;

  render(() => <Listbox.ClearTrigger onClick={handleClick} />);

  expect(screen.getByRole('button', { name: 'Clear search' })).toHaveAttribute('type', 'button');
});

test('exposes the item context and keeps component-owned visual parts visible', () => {
  const { container } = render(() => (
    <Listbox collection={fruits} defaultValue={['apple']}>
      <Listbox.Label>Styled fruit</Listbox.Label>
      <Listbox.Content>
        {fruits.items.map((item) => (
          <Listbox.Item item={item}>
            <Listbox.ItemContext>
              {(itemContext) => (
                <Listbox.ItemText>
                  {itemContext.selected ? `${item.label} (selected)` : item.label}
                </Listbox.ItemText>
              )}
            </Listbox.ItemContext>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  ));

  const root = container.querySelector('[data-slot="listbox-root"]')!;
  const label = container.querySelector('[data-slot="listbox-label"]')!;
  const content = container.querySelector('[data-slot="listbox-content"]')!;
  const item = container.querySelector('[data-slot="listbox-item"]')!;
  const itemText = container.querySelector('[data-slot="listbox-item-text"]')!;
  const indicator = container.querySelector('[data-slot="listbox-item-indicator"]')!;

  expect(screen.getByRole('option', { name: 'Apple (selected)' })).toHaveAttribute('data-selected');
  expect(root).toHaveClass('w-64');
  expect(label).toHaveClass('text-sm', 'font-medium');
  expect(content).toHaveClass('max-h-56', 'rounded-md', 'border');
  expect(item).toHaveClass('min-h-control-sm', 'grid', 'px-3');
  expect(itemText).toHaveClass('min-w-0', 'text-ellipsis');
  expect(indicator).toHaveClass('size-4', 'inline-flex');
});

test('lets consumer utilities replace conflicting defaults', () => {
  const { container } = render(() => (
    <Listbox collection={fruits} class="w-80">
      <Listbox.Label class="text-lg">Styled fruit</Listbox.Label>
      <Listbox.Filter>
        <Listbox.Input class="min-h-10" />
        <Listbox.ClearTrigger class="size-5" />
      </Listbox.Filter>
      <Listbox.Content class="max-h-80 p-0">
        <Listbox.Item item={fruits.items[0]} class="px-0">
          <Listbox.ItemText>Apple</Listbox.ItemText>
          <Listbox.ItemIndicator class="size-5" />
        </Listbox.Item>
      </Listbox.Content>
    </Listbox>
  ));

  const root = container.querySelector('[data-slot="listbox-root"]')!;
  const label = container.querySelector('[data-slot="listbox-label"]')!;
  const input = container.querySelector('[data-slot="listbox-input"]')!;
  const clearTrigger = container.querySelector('[data-slot="listbox-clear-trigger"]')!;
  const content = container.querySelector('[data-slot="listbox-content"]')!;
  const item = container.querySelector('[data-slot="listbox-item"]')!;
  const indicator = container.querySelector('[data-slot="listbox-item-indicator"]')!;

  expect(root).toHaveClass('w-80');
  expect(root).not.toHaveClass('w-64');
  expect(label).toHaveClass('text-lg');
  expect(label).not.toHaveClass('text-sm');
  expect(input).toHaveClass('min-h-10');
  expect(input).not.toHaveClass('min-h-control-md');
  expect(clearTrigger).toHaveClass('size-5');
  expect(clearTrigger).not.toHaveClass('size-control-xs');
  expect(content).toHaveClass('max-h-80', 'p-0');
  expect(content).not.toHaveClass('max-h-56', 'py-1');
  expect(item).toHaveClass('px-0');
  expect(item).not.toHaveClass('px-3');
  expect(indicator).toHaveClass('size-5');
  expect(indicator).not.toHaveClass('size-4');
});