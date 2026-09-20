import { Field } from '@ark-ui/solid/field';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { NativeSelect } from '../src';

test('preserves Field state and control styling hooks', () => {
  render(() => (
    <Field.Root disabled id="framework" invalid required>
      <Field.Label>Framework</Field.Label>
      <NativeSelect controlProps={{ title: 'Native select control' }}>
        <option value="react">React</option>
      </NativeSelect>
      <Field.ErrorText>Choose a framework.</Field.ErrorText>
    </Field.Root>
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