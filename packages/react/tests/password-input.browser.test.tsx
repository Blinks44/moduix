import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Field,
  PasswordInput,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
} from '../src';

function ControlledPasswordInput() {
  const [visible, setVisible] = useState(false);

  return (
    <PasswordInput visible={visible} onVisibilityChange={(details) => setVisible(details.visible)}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  );
}

function ProviderPasswordInput() {
  const passwordInput = usePasswordInput();

  return (
    <PasswordInputRootProvider value={passwordInput}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInputRootProvider>
  );
}

test('renders the default Field composition with Ark anatomy and moduix slots', async () => {
  render(
    <PasswordInput name="password" required>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>,
  );

  await expect
    .element(page.getByText('Password'))
    .toHaveAttribute('data-slot', 'password-input-label');
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('name', 'password');
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'password');
  await expect
    .element(page.getByRole('button'))
    .toHaveAttribute('data-slot', 'password-input-visibility-trigger');
});

test('toggles controlled visibility through Ark details', async () => {
  render(<ControlledPasswordInput />);

  await page.getByRole('button', { name: /show password/i, exact: true }).click();

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'text');
  await expect
    .element(page.getByRole('button', { name: /hide password/i, exact: true }))
    .toBeAttached();
});

test('preserves disabled and readonly interaction contracts', async () => {
  const { rerender } = render(
    <PasswordInput disabled>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>,
  );

  const input = page.getByLabel('Password', { exact: true });
  await expect.element(input).toBeDisabled();
  const button = page.getByRole('button');
  await expect.element(button).toBeDisabled();

  rerender(
    <PasswordInput readOnly>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>,
  );

  await button.click();

  await expect.element(input).toHaveAttribute('readonly');
  await expect.element(button).toHaveAttribute('data-readonly');
  await expect.element(input).toHaveAttribute('type', 'password');
});

test('uses the native input for form submission and reset', async () => {
  render(
    <form data-testid="form">
      <PasswordInput name="password">
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput defaultValue="initial-password" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;

  expect(new FormData(form).get('password')).toBe('initial-password');

  await page.getByLabel('Password', { exact: true }).fill('updated-password');

  expect(new FormData(form).get('password')).toBe('updated-password');

  form.reset();

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveValue('initial-password');
});

test('forwards root and Field refs to their Ark elements', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fieldRef = createRef<HTMLDivElement>();

  render(
    <PasswordInput ref={rootRef}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField ref={fieldRef} />
    </PasswordInput>,
  );

  expect(rootRef.current?.getAttribute('data-slot')).toBe('password-input-root');
  expect(fieldRef.current?.getAttribute('data-slot')).toBe('password-input-control');
});

test('renders the default Field composition through RootProvider', async () => {
  render(<ProviderPasswordInput />);

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('data-slot', 'password-input-input');
});

test('does not dim a password input twice inside a disabled field', () => {
  render(
    <Field disabled>
      <PasswordInput>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputField />
      </PasswordInput>
    </Field>,
  );

  const field = document.querySelector('[data-slot="field-root"]')!;
  const root = document.querySelector('[data-slot="password-input-root"]')!;

  expect(root.hasAttribute('data-disabled')).toBe(true);
  expect(getComputedStyle(field).opacity).toBe('0.5');
  expect(getComputedStyle(root).opacity).toBe('1');
});

test('sizes the control, input text, trigger, and icon from the root size', () => {
  render(
    <div>
      <PasswordInput size="xs">
        <PasswordInputLabel>Extra small</PasswordInputLabel>
        <PasswordInputField />
      </PasswordInput>
      <PasswordInput size="xl">
        <PasswordInputLabel>Extra large</PasswordInputLabel>
        <PasswordInputField />
      </PasswordInput>
    </div>,
  );

  const [xs, xl] = [...document.querySelectorAll('[data-slot="password-input-root"]')];
  const part = (root: Element, slot: string) =>
    root.querySelector<HTMLElement>(`[data-slot="password-input-${slot}"]`)!;
  const iconWidth = (root: Element) =>
    part(root, 'indicator').querySelector('svg')!.getBoundingClientRect().width;

  expect(xs!.getAttribute('data-size')).toBe('xs');
  expect(xl!.getAttribute('data-size')).toBe('xl');
  expect(part(xs!, 'control').offsetHeight).toBe(24);
  expect(part(xl!, 'control').offsetHeight).toBe(48);
  for (const root of [xs!, xl!]) {
    expect(part(root, 'visibility-trigger').offsetHeight).toBeLessThan(
      part(root, 'control').offsetHeight,
    );
  }
  expect(parseFloat(getComputedStyle(part(xl!, 'input')).fontSize)).toBeGreaterThan(
    parseFloat(getComputedStyle(part(xs!, 'input')).fontSize),
  );
  expect(iconWidth(xl!)).toBeGreaterThan(iconWidth(xs!));
});