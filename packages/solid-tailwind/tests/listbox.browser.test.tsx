import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxFilter,
  ListboxInput,
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

test('preserves Ark semantics, refs, and stable styling hooks', async () => {
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

  await expect
    .element(page.getByRole('listbox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-content');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-item');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  expect(rootRef!.getAttribute('data-slot')).toBe('listbox-root');
});

test('renders controlled values from consumer state', async () => {
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

  await page.getByRole('button', { name: 'Set apple', exact: true }).click();

  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('exposes initial item state through the Ark ItemContext', async () => {
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

  await expect
    .element(page.getByRole('option', { name: 'Apple (selected)', exact: true }))
    .toHaveAttribute('data-selected');
});

test('selects enabled items, preserves content focus and skips disabled items', async () => {
  render(() => <FruitListbox />);

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

  await expect.element(page.getByRole('status')).toContainText('mango');
});

test('passes dynamic children through the clear trigger without replacing the button', async () => {
  const [custom, setCustom] = createSignal(false);
  let calls = 0;
  render(() => (
    <ListboxClearTrigger onClick={() => calls++}>
      {custom() ? [[<span data-testid="custom-clear">Reset</span>]] : false}
    </ListboxClearTrigger>
  ));

  const button = screen.getByRole('button', { name: 'Clear search' });
  expect(button.querySelector('svg')).not.toBeNull();
  setCustom(true);
  await expect.element(page.getByTestId('custom-clear')).toContainText('Reset');
  expect(button.querySelector('svg')).toBeNull();
  expect(screen.getByRole('button', { name: 'Clear search' })).toBe(button);
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  expect(calls).toBe(1);
  setCustom(false);
  await expect.element(page.getByTestId('custom-clear')).toHaveCount(0);
  expect(button.querySelector('svg')).not.toBeNull();
});

test('renders the consumer-wired clear trigger as an accessible button', async () => {
  const handleClick = rs.fn();

  render(() => <ListboxClearTrigger onClick={handleClick} />);

  await expect
    .element(page.getByRole('button', { name: 'Clear search', exact: true }))
    .toHaveAttribute('type', 'button');
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('exposes the item context and keeps component-owned visual parts visible', async () => {
  const { container } = render(() => (
    <Listbox collection={fruits} defaultValue={['apple']}>
      <ListboxLabel>Styled fruit</ListboxLabel>
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
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  ));

  const root = container.querySelector('[data-slot="listbox-root"]')!;
  const label = container.querySelector('[data-slot="listbox-label"]')!;
  const content = container.querySelector('[data-slot="listbox-content"]')!;
  const item = container.querySelector('[data-slot="listbox-item"]')!;
  const itemText = container.querySelector('[data-slot="listbox-item-text"]')!;
  const indicator = container.querySelector('[data-slot="listbox-item-indicator"]')!;

  await expect
    .element(page.getByRole('option', { name: 'Apple (selected)', exact: true }))
    .toHaveAttribute('data-selected');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-64']));
  expect([...label!.classList]).toEqual(expect.arrayContaining(['text-sm', 'font-medium']));
  expect([...content!.classList]).toEqual(
    expect.arrayContaining(['max-h-56', 'rounded-md', 'border']),
  );
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-sm', 'grid', 'px-3']),
  );
  expect([...itemText!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'text-ellipsis']));
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-4', 'inline-flex']));
});

test('lets consumer utilities replace conflicting defaults', async () => {
  const { container } = render(() => (
    <Listbox collection={fruits} class="w-80">
      <ListboxLabel class="text-lg">Styled fruit</ListboxLabel>
      <ListboxFilter>
        <ListboxInput class="min-h-10" />
        <ListboxClearTrigger class="size-5" />
      </ListboxFilter>
      <ListboxContent class="max-h-80 p-0">
        <ListboxItem item={fruits.items[0]} class="px-0">
          <ListboxItemText>Apple</ListboxItemText>
          <ListboxItemIndicator class="size-5" />
        </ListboxItem>
      </ListboxContent>
    </Listbox>
  ));

  const root = container.querySelector('[data-slot="listbox-root"]')!;
  const label = container.querySelector('[data-slot="listbox-label"]')!;
  const input = container.querySelector('[data-slot="listbox-input"]')!;
  const clearTrigger = container.querySelector('[data-slot="listbox-clear-trigger"]')!;
  const content = container.querySelector('[data-slot="listbox-content"]')!;
  const item = container.querySelector('[data-slot="listbox-item"]')!;
  const indicator = container.querySelector('[data-slot="listbox-item-indicator"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect(root!.classList.contains('w-64')).toBe(false);
  expect([...label!.classList]).toEqual(expect.arrayContaining(['text-lg']));
  expect(label!.classList.contains('text-sm')).toBe(false);
  expect([...input!.classList]).toEqual(expect.arrayContaining(['min-h-10']));
  expect(input!.classList.contains('min-h-control-md')).toBe(false);
  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['size-5']));
  expect(clearTrigger!.classList.contains('size-control-xs')).toBe(false);
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-h-80', 'p-0']));
  expect(['max-h-56', 'py-1'].some((name) => content!.classList.contains(name))).toBe(false);
  expect([...item!.classList]).toEqual(expect.arrayContaining(['px-0']));
  expect(item!.classList.contains('px-3')).toBe(false);
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-5']));
  expect(indicator!.classList.contains('size-4')).toBe(false);
  await expect.element(page.locator('[data-slot="listbox-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="listbox-label"]')).toHaveCSS('font-size', '18px');
  await expect.element(page.locator('[data-slot="listbox-input"]')).toHaveCSS('min-height', '40px');
  await expect
    .element(page.locator('[data-slot="listbox-clear-trigger"]'))
    .toHaveCSS('width', '20px');
  await expect
    .element(page.locator('[data-slot="listbox-content"]'))
    .toHaveCSS('padding-top', '0px');
  await expect
    .element(page.locator('[data-slot="listbox-content"]'))
    .toHaveCSS('max-height', '320px');
  await expect.element(page.locator('[data-slot="listbox-item"]')).toHaveCSS('padding-left', '0px');
  await expect
    .element(page.locator('[data-slot="listbox-item-indicator"]'))
    .toHaveCSS('width', '20px');
});