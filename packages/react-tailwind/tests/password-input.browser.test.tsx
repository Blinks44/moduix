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

test('applies native utilities to component-owned parts', () => {
  const { container } = render(
    <PasswordInput>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>,
  );

  expect([...container.querySelector('[data-slot="password-input-root"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'w-full', 'flex-col', 'gap-1', 'text-foreground']),
  );
  expect([...screen.getByText('Password')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'gap-1', 'text-sm', 'font-medium']),
  );
  expect([...container.querySelector('[data-slot="password-input-control"]')!.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'min-h-control-md',
      'rounded-md',
      'border',
      'border-border',
      'bg-background',
      'pe-2',
    ]),
  );
  expect([...screen.getByLabelText('Password')!.classList]).toEqual(
    expect.arrayContaining([
      'flex-auto',
      'min-w-0',
      'bg-transparent',
      'px-3',
      'py-1',
      'text-md',
      'text-foreground',
    ]),
  );
  expect([...screen.getByRole('button')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'size-control-sm',
      'shrink-0',
      'rounded-sm',
      'text-muted-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="password-input-indicator"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'justify-center', 'rounded-sm', 'p-1']),
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(
    <PasswordInput className="w-80 max-w-sm gap-4 text-muted-foreground">
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl className="min-h-20 rounded-lg border-2 border-primary bg-muted pe-0">
        <PasswordInputInput />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>,
  );

  const root = container.querySelector('[data-slot="password-input-root"]');
  const control = container.querySelector('[data-slot="password-input-control"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-muted-foreground']),
  );
  expect(
    ['w-full', 'gap-1', 'text-foreground'].some((name) => root?.classList.contains(name)),
  ).toBe(false);
  expect([...control!.classList]).toEqual(
    expect.arrayContaining([
      'min-h-20',
      'rounded-lg',
      'border-2',
      'border-primary',
      'bg-muted',
      'pe-0',
    ]),
  );
  expect(
    ['min-h-control-md', 'rounded-md', 'border-border', 'bg-background', 'pe-2'].some((name) =>
      control?.classList.contains(name),
    ),
  ).toBe(false);
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(control!).minHeight).toBe('80px');
  expect(getComputedStyle(control!).paddingRight).toBe('0px');
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