import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildPasswordInput from './password-input/AsChildPasswordInput.svelte';
import BasicPasswordInput from './password-input/BasicPasswordInput.svelte';
import ControlledPasswordInput from './password-input/ControlledPasswordInput.svelte';
import FallbackPasswordInput from './password-input/FallbackPasswordInput.svelte';
import FormPasswordInput from './password-input/FormPasswordInput.svelte';
import ProviderPasswordInput from './password-input/ProviderPasswordInput.svelte';
import RefsPasswordInput from './password-input/RefsPasswordInput.svelte';

test('renders the default Field composition with Ark anatomy and moduix slots', async () => {
  render(BasicPasswordInput, {
    props: { name: 'password', required: true, class: 'consumer-root' },
  });

  const root = screen.getByText('Password').parentElement;
  expect(root?.getAttribute('data-scope')).toBe('password-input');
  expect(root?.getAttribute('data-part')).toBe('root');
  expect(root?.getAttribute('data-slot')).toBe('password-input-root');
  expect(root?.className.endsWith('consumer-root')).toBe(true);
  await expect
    .element(page.getByText('Password'))
    .toHaveAttribute('data-slot', 'password-input-label');
  const input = page.getByLabel('Password', { exact: true });
  await expect.element(input).toHaveAttribute('data-scope', 'password-input');
  await expect.element(input).toHaveAttribute('data-part', 'input');
  await expect.element(input).toHaveAttribute('data-slot', 'password-input-input');
  await expect.element(input).toHaveAttribute('name', 'password');
  await expect.element(input).toHaveAttribute('type', 'password');
  await expect.element(input).toHaveAttribute('data-state', 'hidden');
  await expect
    .element(page.getByRole('button', { name: /show password/i, exact: true }))
    .toHaveAttribute('data-slot', 'password-input-visibility-trigger');
  expect(
    Boolean(
      screen.getByRole('button').querySelector('[data-slot="password-input-indicator"] svg')
        ?.isConnected,
    ),
  ).toBe(true);
});

test('supports controlled visibility, bind:visible, and one visibility event', async () => {
  const changes: boolean[] = [];
  const { component } = render(ControlledPasswordInput, { props: { changes } });

  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'text');
  await expect
    .element(page.getByRole('button', { name: /hide password/i, exact: true }))
    .toBeAttached();
  expect(component.getVisible()).toBe(true);
  expect(changes).toEqual([true]);
});

test('preserves disabled and read-only interaction contracts', async () => {
  const { unmount } = render(BasicPasswordInput, { props: { disabled: true } });

  const input = page.getByLabel('Password', { exact: true });
  await expect.element(input).toBeDisabled();
  await expect.element(page.getByRole('button')).toBeDisabled();

  unmount();
  render(BasicPasswordInput, { props: { readOnly: true } });

  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect.element(input).toHaveAttribute('readonly');
  await expect
    .element(page.getByRole('button', { name: /show password/i, exact: true }))
    .toHaveAttribute('data-readonly');
  await expect.element(input).toHaveAttribute('type', 'password');
});

test('uses the native input for form submission and reset', async () => {
  render(FormPasswordInput);

  const form = screen.getByTestId('form') as HTMLFormElement;
  expect(new FormData(form).get('password')).toBe('initial-password');
  await page.getByLabel('Password', { exact: true }).fill('updated-password');
  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveValue('updated-password');
  expect(new FormData(form).get('password')).toBe('updated-password');
  form.reset();
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveValue('initial-password');
});

test('forwards refs, attributes, and consumer classes to the Ark elements', async () => {
  const { component } = render(RefsPasswordInput);
  const { rootRef, fieldRef } = component.getRefs();

  const control = screen.getByTitle('password control');
  expect(rootRef?.getAttribute('data-slot')).toBe('password-input-root');
  expect(rootRef?.getAttribute('data-probe')).toBe('root');
  expect(fieldRef).toBe(control);
  await expect
    .element(page.getByTitle('password control'))
    .toHaveAttribute('data-slot', 'password-input-control');
  expect(control.className.endsWith('consumer-control')).toBe(true);
});

test('renders the fixed Field composition through RootProvider and exposes its context', async () => {
  render(ProviderPasswordInput);

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('data-slot', 'password-input-input');
  await expect.element(page.getByText('Visibility: hidden')).toBeAttached();
  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect.element(page.getByText('Visibility: visible')).toBeAttached();
});

test('supports a native fallback snippet and default indicator content', async () => {
  render(FallbackPasswordInput);

  await expect.element(page.getByText('Hidden icon')).toBeAttached();
  await page.getByRole('button', { name: /show password/i, exact: true }).click();
  await expect.element(page.getByText('Visible icon')).toBeAttached();
});

test('preserves asChild root composition on the consumer host', async () => {
  const { component } = render(AsChildPasswordInput);

  const root = screen.getByRole('region', { name: 'Password input' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Password input', exact: true }))
    .toHaveAttribute('data-slot', 'password-input-root');
  expect(component.getRootRef()).toBe(root);
});