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
  const indicator = document.querySelector('[data-slot="native-select-indicator"]')!;

  expect(indicator.querySelector('svg')?.isConnected).toBe(true);

  await selectLocator.selectOption('vue');

  await expect.element(selectLocator).toHaveValue('vue');
});

test('lets consumer utilities replace defaults and hides the indicator for list controls', async () => {
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

  expect([...control.classList]).toEqual(expect.arrayContaining(['w-full']));
  await expect.element(page.locator('[data-slot="native-select-indicator"]')).not.toBeVisible();
  const rootLocator = page.getByRole('listbox', { name: 'Frameworks' });
  await expect.element(rootLocator).toHaveCSS('height', '80px');
  await expect.element(rootLocator).toHaveCSS('width', '320px');
  await expect.element(rootLocator).toHaveCSS('padding-left', '0px');
});