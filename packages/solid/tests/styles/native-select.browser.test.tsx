import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { NativeSelect } from '@/index';

test('forwards the native select ref and supports controlled values', async () => {
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
  expect(NativeSelect).not.toHaveProperty('Root');
  const selectLocator = page.getByRole('combobox', { name: 'Framework', exact: true });
  await expect.element(selectLocator).toHaveAttribute('data-scope', 'field');
  await expect.element(selectLocator).toHaveAttribute('data-part', 'select');
  await expect.element(selectLocator).toHaveAttribute('data-slot', 'native-select-root');
  expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');

  await selectLocator.selectOption('vue');

  await expect.element(selectLocator).toHaveValue('vue');
});