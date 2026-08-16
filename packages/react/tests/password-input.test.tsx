import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { PasswordInput, usePasswordInput } from '../src';

function ControlledPasswordInput() {
  const [visible, setVisible] = useState(false);

  return (
    <PasswordInput visible={visible} onVisibilityChange={(details) => setVisible(details.visible)}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  );
}

function ProviderPasswordInput() {
  const passwordInput = usePasswordInput();

  return (
    <PasswordInput.RootProvider value={passwordInput}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput.RootProvider>
  );
}

test('renders the default Field composition with Ark anatomy and moduix slots', () => {
  render(
    <PasswordInput name="password" required>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>,
  );

  expect(screen.getByText('Password')).toHaveAttribute('data-slot', 'password-input-label');
  expect(screen.getByLabelText('Password')).toHaveAttribute('name', 'password');
  expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  expect(screen.getByRole('button')).toHaveAttribute(
    'data-slot',
    'password-input-visibility-trigger',
  );
});

test('toggles controlled visibility through Ark details', async () => {
  render(<ControlledPasswordInput />);

  const input = screen.getByLabelText('Password');
  fireEvent.pointerDown(screen.getByRole('button', { name: /show password/i }), { button: 0 });

  await waitFor(() => {
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });
});

test('preserves disabled and readonly interaction contracts', () => {
  const { rerender } = render(
    <PasswordInput disabled>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>,
  );

  expect(screen.getByLabelText('Password')).toBeDisabled();
  expect(screen.getByRole('button')).toBeDisabled();

  rerender(
    <PasswordInput readOnly>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>,
  );

  const input = screen.getByLabelText('Password');
  const trigger = screen.getByRole('button');
  fireEvent.pointerDown(trigger, { button: 0 });

  expect(input).toHaveAttribute('readonly');
  expect(trigger).toHaveAttribute('data-readonly');
  expect(input).toHaveAttribute('type', 'password');
});

test('uses the native input for form submission and reset', () => {
  render(
    <form data-testid="form">
      <PasswordInput name="password">
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input defaultValue="initial-password" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const input = screen.getByLabelText('Password');

  expect(new FormData(form).get('password')).toBe('initial-password');

  fireEvent.change(input, { target: { value: 'updated-password' } });

  expect(new FormData(form).get('password')).toBe('updated-password');

  form.reset();

  expect(input).toHaveValue('initial-password');
});

test('forwards root and Field refs to their Ark elements', () => {
  const rootRef = createRef<HTMLDivElement>();
  const fieldRef = createRef<HTMLDivElement>();

  render(
    <PasswordInput ref={rootRef}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field ref={fieldRef} />
    </PasswordInput>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'password-input-root');
  expect(fieldRef.current).toHaveAttribute('data-slot', 'password-input-control');
});

test('renders the default Field composition through RootProvider', () => {
  render(<ProviderPasswordInput />);

  expect(screen.getByLabelText('Password')).toHaveAttribute('data-slot', 'password-input-input');
});