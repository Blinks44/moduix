import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Field, NativeSelect, FieldErrorText, FieldLabel } from '../src';

test('preserves Field state and control styling hooks', async () => {
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

  const selectLocator = page.getByRole('combobox', { name: 'Framework', exact: true });
  await expect.element(selectLocator).toBeDisabled();
  await expect.element(selectLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.element(selectLocator).toHaveAttribute('required');
  await expect.element(selectLocator).toHaveAttribute('data-part', 'select');
  await expect.element(selectLocator).toHaveAttribute('data-scope', 'field');
  await expect.element(selectLocator).toHaveAttribute('data-slot', 'native-select-root');
  expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
  expect(select.parentElement?.getAttribute('title')).toBe('Native select control');
});

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
  const control = document.querySelector('[data-slot="native-select-control"]')!;
  const indicator = document.querySelector('[data-slot="native-select-indicator"]')!;

  expect([...control.classList]).toEqual(
    expect.arrayContaining(['relative', 'inline-grid', 'w-fit', 'max-w-full', 'min-w-0']),
  );
  expect([...select.classList]).toEqual(
    expect.arrayContaining([
      'box-border',
      'h-control-md',
      'w-56',
      'rounded-md',
      'border-border',
      'bg-background',
      'ps-3',
      'pe-11',
    ]),
  );
  expect([...indicator.classList]).toEqual(
    expect.arrayContaining(['absolute', 'end-2', 'size-6', 'rounded-sm', 'text-muted-foreground']),
  );
  expect(indicator.querySelector('svg')?.isConnected).toBe(true);

  await selectLocator.selectOption('vue');

  await expect.element(selectLocator).toHaveValue('vue');
});

test('preserves native form submission and reset behavior', async () => {
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

  await page.getByRole('combobox', { name: 'Framework', exact: true }).selectOption('vue');

  expect(new FormData(form).get('framework')).toBe('vue');

  form.reset();

  await expect
    .element(page.getByRole('combobox', { name: 'Framework', exact: true }))
    .toHaveValue('react');
});

test('preserves asChild composition with a semantic select element', async () => {
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
  await expect
    .element(page.getByRole('combobox', { name: 'Framework', exact: true }))
    .toHaveAttribute('data-slot', 'native-select-root');
  expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
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
  const select = container.querySelector('[data-slot="native-select-root"]')!;
  const indicator = container.querySelector('[data-slot="native-select-indicator"]')!;

  expect([...control.classList]).toEqual(expect.arrayContaining(['w-full']));
  expect(control.classList.contains('w-fit')).toBe(false);
  expect([...select.classList]).toEqual(
    expect.arrayContaining(['h-20', 'w-80', 'rounded-lg', 'bg-muted', 'p-0', 'appearance-auto']),
  );
  expect(
    ['h-control-md', 'w-56', 'rounded-md', 'bg-background', 'ps-3', 'pe-11'].some((name) =>
      select.classList.contains(name),
    ),
  ).toBe(false);
  expect(indicator.classList.contains('hidden')).toBe(true);
  await expect.element(page.locator('[data-slot="native-select-indicator"]')).not.toBeVisible();
  const rootLocator = page.getByRole('listbox', { name: 'Frameworks' });
  await expect.element(rootLocator).toHaveCSS('height', '80px');
  await expect.element(rootLocator).toHaveCSS('width', '320px');
  await expect.element(rootLocator).toHaveCSS('padding-left', '0px');
});