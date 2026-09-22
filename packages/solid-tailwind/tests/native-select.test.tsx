import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Field, NativeSelect, FieldErrorText, FieldLabel } from '../src';

test('exports only the flat NativeSelect root', () => {
  expect(NativeSelect).not.toHaveProperty('Root');
});

test('preserves Field state and control styling hooks', () => {
  render(() => (
    <Field disabled id="framework" invalid required>
      <FieldLabel>Framework</FieldLabel>
      <NativeSelect controlProps={{ title: 'Native select control' }}>
        <option value="react">React</option>
      </NativeSelect>
      <FieldErrorText>Choose a framework.</FieldErrorText>
    </Field>
  ));

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(select).toBeDisabled();
  expect(select).toHaveAttribute('aria-invalid', 'true');
  expect(select).toBeRequired();
  expect(select).toHaveAttribute('data-part', 'select');
  expect(select).toHaveAttribute('data-scope', 'field');
  expect(select).toHaveAttribute('data-slot', 'native-select-root');
  expect(select.parentElement).toHaveAttribute('data-slot', 'native-select-control');
  expect(select.parentElement).toHaveAttribute('title', 'Native select control');
});

test('forwards the native select ref and supports controlled values', () => {
  let selectRef!: HTMLSelectElement;

  function ControlledNativeSelect() {
    const [value, setValue] = createSignal('react');

    return (
      <NativeSelect
        ref={(element) => (selectRef = element)}
        value={value()}
        aria-label="Framework"
        onChange={(event) => setValue(event.currentTarget.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    );
  }

  render(() => <ControlledNativeSelect />);

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(selectRef).toBe(select);

  fireEvent.change(select, { target: { value: 'vue' } });

  expect(select).toHaveValue('vue');
});

test('preserves native form submission and reset behavior', () => {
  render(() => (
    <form aria-label="Project settings">
      <NativeSelect name="framework" aria-label="Framework">
        <option value="react" selected>
          React
        </option>
        <option value="vue">Vue</option>
      </NativeSelect>
    </form>
  ));

  const form = screen.getByRole('form', { name: 'Project settings' }) as HTMLFormElement;
  const select = screen.getByRole('combobox', { name: 'Framework' });

  fireEvent.change(select, { target: { value: 'vue' } });

  expect(new FormData(form).get('framework')).toBe('vue');

  form.reset();

  expect(select).toHaveValue('react');
});

test('preserves asChild composition with a semantic select element', () => {
  let selectRef: HTMLSelectElement | undefined;

  render(() => (
    <NativeSelect
      asChild={(props) => (
        <select {...props()} aria-label="Framework">
          <option value="react">React</option>
        </select>
      )}
      ref={(element) => (selectRef = element)}
    />
  ));

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(selectRef).toBeUndefined();
  expect(select).toHaveAttribute('data-slot', 'native-select-root');
  expect(select.parentElement).toHaveAttribute('data-slot', 'native-select-control');
});

test('applies native utilities to the control and indicator', () => {
  const { container } = render(() => <NativeSelect aria-label="Framework" />);
  const control = container.querySelector('[data-slot="native-select-control"]')!;
  const select = container.querySelector('[data-slot="native-select-root"]')!;
  const indicator = container.querySelector('[data-slot="native-select-indicator"]')!;

  expect(control).toHaveClass('relative', 'inline-grid', 'w-fit', 'max-w-full', 'min-w-0');
  expect(select).toHaveClass(
    'box-border',
    'h-control-md',
    'w-56',
    'rounded-md',
    'border-border',
    'bg-background',
    'ps-3',
    'pe-11',
  );
  expect(indicator).toHaveClass(
    'absolute',
    'end-2',
    'size-6',
    'rounded-sm',
    'text-muted-foreground',
  );
  expect(indicator.querySelector('svg')).toBeInTheDocument();
});

test('lets consumer utilities replace defaults and hides the indicator for list controls', () => {
  const { container } = render(() => (
    <NativeSelect
      class="h-20 w-80 rounded-lg bg-muted p-0"
      controlProps={{ class: 'w-full' }}
      multiple
      size={3}
      aria-label="Frameworks"
    >
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
  ));

  const control = container.querySelector('[data-slot="native-select-control"]')!;
  const select = container.querySelector('[data-slot="native-select-root"]')!;
  const indicator = container.querySelector('[data-slot="native-select-indicator"]')!;

  expect(control).toHaveClass('w-full');
  expect(control).not.toHaveClass('w-fit');
  expect(select).toHaveClass('h-20', 'w-80', 'rounded-lg', 'bg-muted', 'p-0', 'appearance-auto');
  expect(select).not.toHaveClass(
    'h-control-md',
    'w-56',
    'rounded-md',
    'bg-background',
    'ps-3',
    'pe-11',
  );
  expect(indicator).toHaveClass('hidden');
});

test('keeps the field hooks on a standalone select', () => {
  render(() => (
    <NativeSelect aria-label="Framework">
      <option value="react">React</option>
    </NativeSelect>
  ));

  const select = screen.getByRole('combobox', { name: 'Framework' });
  expect(select).toHaveAttribute('data-scope', 'field');
  expect(select).toHaveAttribute('data-part', 'select');
  expect(select).toHaveAttribute('data-slot', 'native-select-root');
});