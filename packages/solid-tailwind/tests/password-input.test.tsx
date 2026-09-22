import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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

test('renders the default Field composition with Ark anatomy and moduix slots', () => {
  render(() => (
    <PasswordInput name="password" required>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  expect(screen.getByText('Password')).toHaveAttribute('data-slot', 'password-input-label');
  expect(screen.getByLabelText('Password')).toHaveAttribute('name', 'password');
  expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  expect(screen.getByRole('button')).toHaveAttribute(
    'data-slot',
    'password-input-visibility-trigger',
  );
});

test('toggles controlled visibility through Ark details', async () => {
  render(() => <ControlledPasswordInput />);

  const input = screen.getByLabelText('Password');
  fireEvent.pointerDown(screen.getByRole('button', { name: /show password/i }), { button: 0 });

  await waitFor(() => {
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });
});

test('preserves disabled interaction semantics', () => {
  render(() => (
    <PasswordInput disabled>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  expect(screen.getByLabelText('Password')).toBeDisabled();
  expect(screen.getByRole('button', { name: /show password/i })).toBeDisabled();
});

test('preserves readonly interaction semantics', () => {
  render(() => (
    <PasswordInput readOnly>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  const input = screen.getByLabelText('Password');
  const trigger = screen.getByRole('button', { name: /show password/i });
  fireEvent.pointerDown(trigger, { button: 0 });

  expect(input).toHaveAttribute('readonly');
  expect(trigger).toHaveAttribute('data-readonly');
  expect(input).toHaveAttribute('type', 'password');
});

test('uses the native input for form submission and reset', () => {
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
  const input = screen.getByLabelText('Password');

  expect(new FormData(form).get('password')).toBe('initial-password');

  fireEvent.change(input, { target: { value: 'updated-password' } });

  expect(new FormData(form).get('password')).toBe('updated-password');

  form.reset();

  expect(input).toHaveValue('initial-password');
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

  expect(rootRef).toHaveAttribute('data-slot', 'password-input-root');
  expect(fieldRef).toHaveAttribute('data-slot', 'password-input-control');
});

test('preserves asChild composition without forwarding the root ref through Ark Solid', () => {
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

  expect(screen.getByRole('region', { name: 'Password input' })).toHaveAttribute(
    'data-slot',
    'password-input-root',
  );
  expect(rootRef).toBeUndefined();
});

test('renders the default Field composition through RootProvider', () => {
  render(() => <ProviderPasswordInput />);

  expect(screen.getByLabelText('Password')).toHaveAttribute('data-slot', 'password-input-input');
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render(() => (
    <PasswordInput>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ));

  expect(container.querySelector('[data-slot="password-input-root"]')).toHaveClass(
    'flex',
    'w-full',
    'max-w-none',
    'flex-col',
    'gap-1',
    'text-foreground',
  );
  expect(screen.getByText('Password')).toHaveClass(
    'inline-flex',
    'items-center',
    'gap-1',
    'text-sm',
    'font-medium',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="password-input-control"]')).toHaveClass(
    'flex',
    'min-h-control-md',
    'w-full',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'pr-2',
  );
  expect(screen.getByLabelText('Password')).toHaveClass(
    'flex-auto',
    'min-h-0',
    'min-w-0',
    'bg-transparent',
    'px-3',
    'py-1',
    'text-md',
    'text-foreground',
  );
  expect(screen.getByRole('button')).toHaveClass(
    'inline-flex',
    'size-control-sm',
    'min-w-control-sm',
    'shrink-0',
    'rounded-sm',
    'text-muted-foreground',
  );
  expect(container.querySelector('[data-slot="password-input-indicator"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-sm',
    'p-1',
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(() => (
    <PasswordInput class="w-80 max-w-sm gap-4 text-muted-foreground">
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl class="min-h-20 rounded-lg border-2 border-primary bg-muted pr-0">
        <PasswordInputInput />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  ));

  const root = container.querySelector('[data-slot="password-input-root"]');
  const control = container.querySelector('[data-slot="password-input-control"]');

  expect(root).toHaveClass('w-80', 'max-w-sm', 'gap-4', 'text-muted-foreground');
  expect(root).not.toHaveClass('w-full', 'max-w-none', 'gap-1', 'text-foreground');
  expect(control).toHaveClass(
    'min-h-20',
    'rounded-lg',
    'border-2',
    'border-primary',
    'bg-muted',
    'pr-0',
  );
  expect(control).not.toHaveClass(
    'min-h-control-md',
    'rounded-md',
    'border-border',
    'bg-background',
    'pr-2',
  );
});