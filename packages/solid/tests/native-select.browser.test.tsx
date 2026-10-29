import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Field, NativeSelect, FieldErrorText, FieldLabel } from '@/index';

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

test('keeps the declared selection of a multiple select', () => {
  render(() => (
    <>
      <NativeSelect multiple aria-label="Frameworks">
        <option value="react" selected>
          React
        </option>
        <option value="vue" selected>
          Vue
        </option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
      <NativeSelect multiple aria-label="Runtimes">
        <option value="node">Node</option>
        <option value="deno">Deno</option>
      </NativeSelect>
    </>
  ));

  const [frameworks, runtimes] = document.querySelectorAll('select');

  expect([...frameworks!.selectedOptions].map((option) => option.value)).toEqual(['react', 'vue']);
  expect(runtimes!.selectedOptions).toHaveLength(0);
});