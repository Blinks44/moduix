import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Field, NativeSelect } from '../src';

test('preserves Field state and control styling hooks', () => {
  render(
    <Field disabled id="framework" invalid required>
      <Field.Label>Framework</Field.Label>
      <NativeSelect controlProps={{ title: 'Native select control' }}>
        <option value="react">React</option>
      </NativeSelect>
      <Field.ErrorText>Choose a framework.</Field.ErrorText>
    </Field>,
  );

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
  const selectRef = createRef<HTMLSelectElement>();

  function ControlledNativeSelect() {
    const [value, setValue] = useState('react');

    return (
      <NativeSelect
        ref={selectRef}
        value={value}
        aria-label="Framework"
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    );
  }

  render(<ControlledNativeSelect />);

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(selectRef.current).toBe(select);

  fireEvent.change(select, { target: { value: 'vue' } });

  expect(select).toHaveValue('vue');
});