import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type CSSProperties } from 'react';
import {
  CloseButton,
  SelectOption,
  Field,
  Select,
  useSelect,
  useSelectContext,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
  SelectRootProvider,
} from '../src';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

function FruitSelect({
  defaultOpen = true,
  defaultValue,
}: {
  defaultOpen?: boolean;
  defaultValue?: string[];
}) {
  return (
    <Select
      collection={fruits}
      defaultOpen={defaultOpen}
      defaultValue={defaultValue}
      name="fruit"
      portalled={false}
    >
      <SelectLabel>Fruit</SelectLabel>
      <SelectField placeholder="Select fruit" clearLabel="Clear fruit" />
      <SelectPositioner>
        <SelectContent>
          {fruits.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
  );
}

test('keeps default values and native form values Ark-shaped', async () => {
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>,
  );

  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toContainText('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');
  await expect
    .element(page.getByRole('button', { name: 'Clear fruit', exact: true }))
    .toBeVisible();
});

test('reserves room for the clear action only when it is rendered', async () => {
  render(
    <>
      <Select collection={fruits} defaultValue={['apple']}>
        <SelectField />
      </Select>
      <Select collection={fruits} defaultValue={['apple']}>
        <SelectField clearLabel="Clear fruit" />
      </Select>
    </>,
  );

  const [withoutClear, withClear] = [
    ...document.querySelectorAll<HTMLElement>('[data-slot="select-trigger"]'),
  ];
  await expect.poll(() => getComputedStyle(withClear!).paddingInlineEnd).toBe('68px');
  expect(getComputedStyle(withoutClear!).paddingInlineEnd).toBe('46px');
});

test('gives the clear trigger the CloseButton focus ring', async () => {
  render(
    <>
      <CloseButton data-testid="reference" />
      <Select collection={fruits} defaultValue={['apple']}>
        <SelectField clearLabel="Clear fruit" />
      </Select>
    </>,
  );

  await expect.element(page.getByRole('button', { name: 'Clear fruit' })).toBeVisible();
  const reference = document.querySelector<HTMLElement>('[data-testid="reference"]')!;
  const clear = document.querySelector<HTMLElement>('[data-slot="select-clear-trigger"]')!;
  reference.focus();
  const expected = getComputedStyle(reference);
  const ring = [expected.outlineWidth, expected.outlineOffset];
  clear.focus();
  const actual = getComputedStyle(clear);
  expect(ring).not.toEqual(['0px', '0px']);
  expect([actual.outlineWidth, actual.outlineOffset]).toEqual(ring);
});

test('reserves trigger room from the action size variable', async () => {
  const style = { '--moduix-select-action-size': '32px' } as CSSProperties;
  render(
    <>
      <Select collection={fruits} defaultValue={['apple']} style={style}>
        <SelectField />
      </Select>
      <Select collection={fruits} defaultValue={['apple']} style={style}>
        <SelectField clearLabel="Clear fruit" />
      </Select>
    </>,
  );

  const [withoutClear, withClear] = [
    ...document.querySelectorAll<HTMLElement>('[data-slot="select-trigger"]'),
  ];
  await expect.poll(() => getComputedStyle(withClear!).paddingInlineEnd).toBe('84px');
  expect(getComputedStyle(withoutClear!).paddingInlineEnd).toBe('54px');
  const indicator = document.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;
  expect(indicator.offsetWidth).toBe(32);
});

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(<FruitSelect />);

  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;

  expect(control!.contains(indicator)).toBe(true);
  expect(trigger!.contains(indicator)).not.toBe(true);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  let submitted: FormData | undefined;
  const { container } = render(
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submitted = new FormData(event.currentTarget);
      }}
    >
      <FruitSelect defaultOpen={false} />
      <button type="submit">Submit fruit</button>
    </form>,
  );

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  const rootLocator = page.getByRole('listbox');
  await expect.element(rootLocator).toBeFocused();
  await rootLocator.press('ArrowDown');
  await rootLocator.press('Enter');

  await expect.element(combobox).toContainText('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');

  await page.getByRole('button', { name: 'Clear fruit', exact: true }).click();

  await expect.element(combobox).toContainText('Select fruit');
  expect(container.querySelector('select')!.value).toBe('');
  await page.getByRole('button', { name: 'Submit fruit', exact: true }).click();
  expect(container.querySelector('select')!.selectedIndex).toBe(-1);
  expect(submitted!.has('fruit')).toBe(false);
});

test('portals popup content by default and forwards root and field refs', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fieldRef = createRef<HTMLDivElement>();
  const { container } = render(
    <Select ref={rootRef} collection={fruits} defaultOpen>
      <SelectLabel>Portalled fruit</SelectLabel>
      <SelectField ref={fieldRef} placeholder="Select fruit" />
      <SelectPositioner>
        <SelectContent>
          {fruits.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>,
  );

  const listbox = screen.getByRole('listbox');

  expect(rootRef.current!.getAttribute('data-slot')).toBe('select-root');
  expect(fieldRef.current!.getAttribute('data-slot')).toBe('select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body!.contains(listbox)).toBe(true);
});

test('inherits Field state in the trigger and explicit native form control', async () => {
  render(
    <Field disabled invalid required>
      <FruitSelect defaultValue={['apple']} />
    </Field>,
  );

  await expect.element(page.getByRole('combobox', { name: 'Fruit', exact: true })).toBeDisabled();
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.locator('[data-slot="select-control"]'))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.locator('[data-slot="select-control"]'))
    .toHaveAttribute('data-invalid');
  await expect.element(page.locator('select')).toBeDisabled();
  await expect.element(page.locator('select')).toHaveAttribute('required');
});

test('resets an explicit native form control to its default selection', async () => {
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>,
  );

  await page.getByRole('option', { name: 'Mango', exact: true }).click();
  await expect
    .poll(() => new FormData(container.querySelector('form')!).get('fruit'))
    .toBe('mango');

  container.querySelector('form')!.reset();

  await expect
    .poll(() => new FormData(container.querySelector('form')!).get('fruit'))
    .toBe('apple');
});

test('exposes RootProvider state through the moduix context hook', async () => {
  function ContextValue() {
    const select = useSelectContext();
    return <output>{select.value.join(',')}</output>;
  }

  function ProviderSelect() {
    const select = useSelect({ collection: fruits, defaultValue: ['mango'] });

    return (
      <SelectRootProvider value={select} portalled={false}>
        <SelectLabel>Provider fruit</SelectLabel>
        <SelectField placeholder="Select fruit" />
        <ContextValue />
      </SelectRootProvider>
    );
  }

  render(<ProviderSelect />);

  await expect.element(page.getByRole('status')).toContainText('mango');
});

test('preserves native asChild composition and forwards its root ref', async () => {
  const rootRef = createRef<HTMLDivElement>();

  const { container } = render(
    <Select ref={rootRef} asChild collection={fruits}>
      <section aria-label="Fruit selection">
        <SelectLabel>Fruit</SelectLabel>
        <SelectField placeholder="Select fruit" />
        <SelectHiddenSelect />
      </section>
    </Select>,
  );

  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Fruit selection', exact: true }))
    .toHaveAttribute('data-slot', 'select-root');
  expect(Boolean(root.querySelector('select')?.isConnected)).toBe(true);
  expect(container.contains(root)).toBe(true);
  expect(rootRef.current).toBe(root);
});

test('renders an option row with a replaceable indicator', async () => {
  const optionRef = createRef<HTMLDivElement>();
  render(
    <Select collection={fruits} defaultOpen defaultValue={['apple']} portalled={false}>
      <SelectPositioner>
        <SelectContent>
          <SelectOption ref={optionRef} item={fruits.items[0]!}>
            Apple
          </SelectOption>
          <SelectOption item={fruits.items[1]!} indicator={false}>
            Mango
          </SelectOption>
        </SelectContent>
      </SelectPositioner>
    </Select>,
  );

  await expect.element(page.getByRole('option', { name: 'Apple' })).toBeVisible();
  expect(optionRef.current?.dataset.slot).toBe('select-item');

  const [apple, mango] = [...document.querySelectorAll<HTMLElement>('[data-slot="select-item"]')];
  expect(apple!.querySelector('[data-slot="select-item-text"]')!.textContent).toBe('Apple');
  expect(apple!.querySelector('[data-slot="select-item-indicator"] svg')).not.toBeNull();
  expect(mango!.querySelector('[data-slot="select-item-indicator"]')).toBeNull();
  expect(document.querySelector('[data-testid="custom-indicator"]')).toBeNull();

  render(
    <Select collection={fruits} defaultOpen defaultValue={['mango']} portalled={false}>
      <SelectPositioner>
        <SelectContent>
          <SelectOption item={fruits.items[1]!} indicator={<span data-testid="custom-indicator" />}>
            Mango
          </SelectOption>
        </SelectContent>
      </SelectPositioner>
    </Select>,
  );
  await expect
    .poll(() => document.querySelector('[data-testid="custom-indicator"]'))
    .not.toBeNull();
});