import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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
  ComboboxStatus,
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

test('keeps default values and form values Ark-shaped', async () => {
  const { container } = render(() => (
    <form>
      <FruitCombobox defaultValue={['apple']} />
    </form>
  ));

  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveValue('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('keeps controlled input changes consumer-owned', async () => {
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

  await page.getByRole('button', { name: 'Set apple', exact: true }).click();

  await expect
    .element(page.getByRole('combobox', { name: 'Controlled fruit', exact: true }))
    .toHaveValue('apple');
});

test('selects with the keyboard and clears through the default accessible action', async () => {
  const { container } = render(() => (
    <form>
      <FruitCombobox />
    </form>
  ));

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  await expect.element(page.getByRole('listbox')).toBeVisible();
  await combobox.press('ArrowDown');
  await combobox.press('Enter');

  await expect.element(combobox).toHaveValue('Apple');

  await page.getByRole('button', { name: 'Clear selection', exact: true }).click();

  await expect.element(combobox).toHaveValue('');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards the root ref', () => {
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

  const list = screen.getByRole('listbox');

  expect(rootRef!.getAttribute('data-slot')).toBe('combobox-root');
  expect(container.contains(list)).toBe(false);
  expect(document.body!.contains(list)).toBe(true);
});

test('exposes RootProvider state through the moduix context hook', async () => {
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

  await expect.element(page.getByText('open')).toBeVisible();
});

test('preserves native asChild composition and its Ark Solid ref limitation', async () => {
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
  await expect
    .element(page.getByRole('region', { name: 'Fruit selection', exact: true }))
    .toHaveAttribute('data-slot', 'combobox-root');
  expect(container.contains(root)).toBe(true);
  expect(rootRef).toBeUndefined();
});

test('lets consumer utilities replace defaults and keeps visual parts visible', async () => {
  const { container } = render(() => (
    <Combobox class="w-80" collection={fruits} defaultOpen portalled={false}>
      <ComboboxLabel>Styled fruit</ComboboxLabel>
      <ComboboxControl class="rounded-lg">
        <ComboboxInput class="h-8" />
        <ComboboxClearTrigger class="size-5" aria-label="Clear styled fruits" />
        <ComboboxTrigger class="size-6" aria-label="Open styled fruits" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class="p-0">
          <ComboboxStatus>Loading options</ComboboxStatus>
          <ComboboxList>
            <ComboboxOption item={fruits.items[0]} class="px-0">
              Apple
            </ComboboxOption>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  ));

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

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect(root!.classList.contains('w-64')).toBe(false);
  expect([...control!.classList]).toEqual(expect.arrayContaining(['rounded-lg']));
  expect(control!.classList.contains('rounded-md')).toBe(false);
  expect([...input!.classList]).toEqual(expect.arrayContaining(['h-8']));
  expect(input!.classList.contains('h-control-md')).toBe(false);
  expect([...clear!.classList]).toEqual(
    expect.arrayContaining([
      'size-5',
      'inset-y-0',
      'my-auto',
      'transition-[background-color,color,opacity]',
    ]),
  );
  expect(
    ['size-control-xs', 'top-1/2', '-translate-y-1/2'].some((name) =>
      clear!.classList.contains(name),
    ),
  ).toBe(false);
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['size-6']));
  expect(trigger!.classList.contains('size-control-xs')).toBe(false);
  expect([...content!.classList]).toEqual(expect.arrayContaining(['p-0']));
  expect(content!.classList.contains('py-1')).toBe(false);
  expect([...status!.classList]).toEqual(expect.arrayContaining(['px-4', 'py-1', 'text-sm']));
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-sm', 'px-0', 'text-sm']),
  );
  expect(item!.classList.contains('px-3')).toBe(false);
  expect([...itemText!.classList]).toEqual(expect.arrayContaining(['min-w-0', 'flex-1']));
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-3']));
  await expect.element(page.locator('[data-slot="combobox-root"]')).toHaveCSS('width', '320px');
  await expect
    .element(page.locator('[data-slot="combobox-control"]'))
    .toHaveCSS('border-top-left-radius', '10px');
  await expect.element(page.locator('[data-slot="combobox-input"]')).toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="combobox-clear-trigger"]'))
    .toHaveCSS('width', '20px');
  await expect.element(page.locator('[data-slot="combobox-trigger"]')).toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="combobox-content"]'))
    .toHaveCSS('padding-top', '0px');
  await expect
    .element(page.locator('[data-slot="combobox-item"]'))
    .toHaveCSS('padding-left', '0px');
});

test.each([false, true])('updates the clear trigger class (asChild=%s)', (asChild) => {
  const [className, setClassName] = createSignal('before');
  const { container } = render(() => (
    <Combobox collection={fruits} defaultValue={['apple']}>
      <ComboboxClearTrigger
        class={className()}
        asChild={asChild ? (props) => <button {...props()}>Clear</button> : undefined}
      />
    </Combobox>
  ));
  const trigger = container.querySelector('button')!;

  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['before']));
  setClassName('after');
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['after']));
  expect(trigger!.classList.contains('before')).toBe(false);
  expect(container.querySelector('button')).toBe(trigger);
});