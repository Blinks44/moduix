import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
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