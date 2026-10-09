import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
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
  const [visible, setVisible] = createSignal(false);

  return (
    <PasswordInput
      visible={visible()}
      onVisibilityChange={(details) => setVisible(details.visible)}
    >
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
  render(() => (
    <PasswordInput name="password" required>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

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
  render(() => <ControlledPasswordInput />);

  await page.getByRole('button', { name: /show password/i, exact: true }).click();

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'text');
  await expect
    .element(page.getByRole('button', { name: /hide password/i, exact: true }))
    .toBeAttached();
});

test('preserves disabled interaction semantics', async () => {
  render(() => (
    <PasswordInput disabled>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  await expect.element(page.getByLabel('Password', { exact: true })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: /show password/i, exact: true }))
    .toBeDisabled();
});

test('preserves readonly interaction semantics', async () => {
  render(() => (
    <PasswordInput readOnly>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  await page.getByRole('button', { name: /show password/i, exact: true }).click();

  await expect.element(page.getByLabel('Password', { exact: true })).toHaveAttribute('readonly');
  await expect
    .element(page.getByRole('button', { name: /show password/i, exact: true }))
    .toHaveAttribute('data-readonly');
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'password');
});

test('uses the native input for form submission and reset', async () => {
  render(() => (
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
    </form>
  ));

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
  let rootRef!: HTMLDivElement;
  let fieldRef!: HTMLDivElement;

  render(() => (
    <PasswordInput ref={(element) => (rootRef = element)}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField ref={(element) => (fieldRef = element)} />
    </PasswordInput>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('password-input-root');
  expect(fieldRef?.getAttribute('data-slot')).toBe('password-input-control');
});

test('preserves asChild composition without forwarding the root ref through Ark Solid', async () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <PasswordInput
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Password input" />}
    >
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  await expect
    .element(page.getByRole('region', { name: 'Password input', exact: true }))
    .toHaveAttribute('data-slot', 'password-input-root');
  expect(rootRef).toBeUndefined();
});

test('renders the default Field composition through RootProvider', async () => {
  render(() => <ProviderPasswordInput />);

  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('data-slot', 'password-input-input');
});