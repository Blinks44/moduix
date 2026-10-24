import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxFilter,
  ListboxInput,
  ListboxItem,
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

function FruitListbox({ defaultValue }: { defaultValue?: string[] }) {
  return (
    <Listbox collection={fruits} defaultValue={defaultValue}>
      <ListboxLabel>Fruit</ListboxLabel>
      <ListboxContent>
        {fruits.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}

test('preserves Ark semantics, refs, and stable styling hooks', async () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <Listbox ref={ref} collection={fruits} defaultValue={['apple']}>
      <ListboxLabel>Fruit</ListboxLabel>
      <ListboxContent>
        {fruits.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>,
  );

  await expect
    .element(page.getByRole('listbox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-content');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-item');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  expect(ref.current!.getAttribute('data-slot')).toBe('listbox-root');
});

test('renders controlled values from consumer state', async () => {
  function ControlledListbox() {
    const [value, setValue] = useState<string[]>(['mango']);

    return (
      <>
        <Listbox
          collection={fruits}
          value={value}
          onValueChange={(details) => setValue(details.value)}
        >
          <ListboxLabel>Controlled fruit</ListboxLabel>
          <ListboxContent>
            {fruits.items.map((item) => (
              <ListboxItem key={item.value} item={item}>
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

  render(<ControlledListbox />);

  await page.getByRole('button', { name: 'Set apple', exact: true }).click();

  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('selects enabled items, preserves content focus and skips disabled items', async () => {
  render(<FruitListbox />);

  const apple = screen.getByRole('option', { name: 'Apple' });

  const rootLocator = page.getByRole('listbox', { name: 'Fruit', exact: true });
  await rootLocator.press('Home');
  // Dispatch checks the event guard; browser clicks correctly reject aria-disabled items.
  screen
    .getByRole('option', { name: 'Unavailable' })
    .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

  await expect.element(page.getByRole('listbox', { name: 'Fruit', exact: true })).toBeFocused();
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .not.toHaveAttribute('data-selected');

  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-highlighted');
  await expect.element(rootLocator).toHaveAttribute('aria-activedescendant', apple.id);

  await rootLocator.press('Enter');

  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');

  await rootLocator.press('ArrowDown');

  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-highlighted');
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .not.toHaveAttribute('data-highlighted');
  await page.getByRole('listbox', { name: 'Fruit', exact: true }).press('ArrowDown');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-highlighted');
});

test('exposes RootProvider state through the moduix context hook', async () => {
  function ContextValue() {
    const listbox = useListboxContext();
    return <output>{listbox.value.join(',')}</output>;
  }

  function ProviderListbox() {
    const listbox = useListbox({ collection: fruits, defaultValue: ['mango'] });

    return (
      <ListboxRootProvider value={listbox}>
        <ListboxLabel>Provider fruit</ListboxLabel>
        <ListboxContent>
          {fruits.items.map((item) => (
            <ListboxItem key={item.value} item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
            </ListboxItem>
          ))}
        </ListboxContent>
        <ContextValue />
      </ListboxRootProvider>
    );
  }

  render(<ProviderListbox />);

  await expect.element(page.getByRole('status')).toContainText('mango');
});

test('renders the consumer-wired clear trigger as an accessible button', async () => {
  const handleClick = rs.fn();

  render(<ListboxClearTrigger onClick={handleClick} />);

  await expect
    .element(page.getByRole('button', { name: 'Clear search', exact: true }))
    .toHaveAttribute('type', 'button');
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('reserves filter room for the clear action and keeps page scroll chaining', () => {
  render(
    <Listbox collection={fruits}>
      <ListboxLabel>Fruit</ListboxLabel>
      <ListboxFilter>
        <ListboxInput />
        <ListboxClearTrigger />
      </ListboxFilter>
      <ListboxContent>
        {fruits.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>,
  );

  const input = document.querySelector<HTMLElement>('[data-slot="listbox-input"]')!;
  const clear = document.querySelector<HTMLElement>('[data-slot="listbox-clear-trigger"]')!;
  const content = document.querySelector<HTMLElement>('[data-slot="listbox-content"]')!;

  // 12px offset + 24px action + 8px gap before the text.
  expect(getComputedStyle(input).paddingInlineEnd).toBe('44px');
  expect(clear.offsetWidth).toBe(24);
  expect(
    Math.abs(input.getBoundingClientRect().right - clear.getBoundingClientRect().right - 12),
  ).toBeLessThanOrEqual(1);
  // The list is not a popup, so page scrolling chains past it.
  expect(getComputedStyle(content).overscrollBehaviorY).toBe('auto');
});

test('dims disabled items once through opacity', () => {
  render(<FruitListbox />);

  const [apple, , unavailable] = [
    ...document.querySelectorAll<HTMLElement>('[data-slot="listbox-item"]'),
  ];

  // Disabled items dim once, through opacity, and keep the regular text color.
  expect(getComputedStyle(unavailable!).opacity).toBe('0.5');
  expect(getComputedStyle(unavailable!).color).toBe(getComputedStyle(apple!).color);
});