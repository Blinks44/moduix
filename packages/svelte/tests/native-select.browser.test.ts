import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { NativeSelect } from '@/components/native-select';
import BoundSelect from './native-select/BoundSelect.svelte';
import DisabledSelect from './native-select/DisabledSelect.svelte';
import FormSelect from './native-select/FormSelect.svelte';
import ListSelect from './native-select/ListSelect.svelte';
import SelectedOptions from './native-select/SelectedOptions.svelte';

test('shows the selected option while disabled', async () => {
  render(DisabledSelect);

  await expect
    .element(page.getByRole('combobox', { name: 'Framework', exact: true }))
    .toHaveValue('react');
});

test('preserves native form submission and reset behavior', async () => {
  render(FormSelect);

  const form = screen.getByRole('form', { name: 'Project settings' }) as HTMLFormElement;

  await page.getByRole('combobox', { name: 'Framework', exact: true }).selectOption('vue');

  expect(new FormData(form).get('framework')).toBe('vue');

  form.reset();

  await expect
    .element(page.getByRole('combobox', { name: 'Framework', exact: true }))
    .toHaveValue('react');
});

test('keeps natively selected options when uncontrolled', () => {
  render(SelectedOptions);

  const [single, multiple] = document.querySelectorAll('select');

  expect(single!.value).toBe('vue');
  expect([...multiple!.selectedOptions].map((option) => option.value)).toEqual(['react', 'vue']);
});

test('keeps the indicator connected for native list controls', async () => {
  render(ListSelect);

  const select = screen.getByRole('listbox', { name: 'Frameworks' });
  const indicator = select.parentElement?.querySelector('[data-slot="native-select-indicator"]');

  await expect
    .element(page.getByRole('listbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('multiple');
  await expect
    .element(page.getByRole('listbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('size', '3');
  expect(indicator?.isConnected).toBe(true);
});

test.each([false, true])(
  'forwards the native select ref and controlled events (asChild=%s)',
  async (asChild) => {
    const changes: string[] = [];
    const { component } = render(BoundSelect, { props: { asChild, changes } });

    const select = screen.getByRole('combobox', { name: 'Framework' });

    expect(component.getRef()).toBe(select);
    expect('Root' in NativeSelect).toBe(false);
    const selectLocator = page.getByRole('combobox', { name: 'Framework', exact: true });
    await expect.element(selectLocator).toHaveAttribute('data-scope', 'field');
    await expect.element(selectLocator).toHaveAttribute('data-part', 'select');
    await expect.element(selectLocator).toHaveAttribute('data-slot', 'native-select-root');
    expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
    const indicator = document.querySelector('[data-slot="native-select-indicator"]')!;

    expect(indicator.querySelector('svg')?.isConnected).toBe(true);
    await selectLocator.selectOption('vue');

    await expect.element(selectLocator).toHaveValue('vue');
    expect(component.getValue()).toBe('vue');
    expect(changes).toEqual(['vue']);

    component.setValue('react');
    await expect.element(selectLocator).toHaveValue('react');
    expect(changes).toEqual(['vue']);
  },
);