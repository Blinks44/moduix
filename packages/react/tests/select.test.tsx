import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('keeps default values and native form values Ark-shaped', () => {
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>,
  );

  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');
  expect(screen.getByRole('button', { name: 'Clear fruit' })).toBeVisible();
});

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(<FruitSelect />);

  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;

  expect(control).toContainElement(indicator);
  expect(trigger).not.toContainElement(indicator);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  const { container } = render(
    <form>
      <FruitSelect defaultOpen={false} />
    </form>,
  );
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const user = userEvent.setup();

  await user.click(trigger);
  await user.keyboard('{ArrowDown}{Enter}');

  expect(trigger).toHaveTextContent('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');

  await user.click(screen.getByRole('button', { name: 'Clear fruit' }));

  expect(trigger).toHaveTextContent('Select fruit');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards root and field refs', () => {
  const rootRef = { current: null as HTMLDivElement | null };
  const fieldRef = { current: null as HTMLDivElement | null };
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

  expect(rootRef.current).toHaveAttribute('data-slot', 'select-root');
  expect(fieldRef.current).toHaveAttribute('data-slot', 'select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body).toContainElement(listbox);
});

test('inherits Field state in the trigger and explicit native form control', () => {
  const { container } = render(
    <Field disabled invalid required>
      <FruitSelect defaultValue={['apple']} />
    </Field>,
  );

  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const control = container.querySelector('[data-slot="select-control"]');
  const nativeSelect = container.querySelector('select');

  expect(trigger).toBeDisabled();
  expect(trigger).toHaveAttribute('aria-invalid', 'true');
  expect(control).toHaveAttribute('data-disabled');
  expect(control).toHaveAttribute('data-invalid');
  expect(nativeSelect).toBeDisabled();
  expect(nativeSelect).toBeRequired();
});

test('resets an explicit native form control to its default selection', async () => {
  const { container } = render(
    <form>
      <FruitSelect defaultValue={['apple']} />
    </form>,
  );

  fireEvent.click(screen.getByRole('option', { name: 'Mango' }));
  await waitFor(() =>
    expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('mango'),
  );

  container.querySelector('form')!.reset();

  await waitFor(() =>
    expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple'),
  );
});

test('exposes RootProvider state through the moduix context hook', () => {
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

  expect(screen.getByRole('status')).toHaveTextContent('mango');
});

test('preserves native asChild composition and forwards its root ref', () => {
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
  expect(root).toHaveAttribute('data-slot', 'select-root');
  expect(root.querySelector('select')).toBeInTheDocument();
  expect(container.contains(root)).toBe(true);
  expect(rootRef.current).toBe(root);
});
