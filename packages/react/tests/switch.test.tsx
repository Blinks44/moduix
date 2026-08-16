import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Switch, useSwitch } from '../src';

function ProviderSwitch() {
  const switchApi = useSwitch({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <Switch.RootProvider value={switchApi}>
      <Switch.Control />
      <Switch.Label>Provider notifications</Switch.Label>
    </Switch.RootProvider>
  );
}

test('renders automatic hidden inputs and preserves native form data', () => {
  const { container } = render(
    <form>
      <Switch defaultChecked name="notifications" value="email">
        <Switch.Control />
        <Switch.Label>Email notifications</Switch.Label>
      </Switch>
      <ProviderSwitch />
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('[data-slot="switch-hidden-input"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', () => {
  render(
    <Switch asChild>
      <label>
        <Switch.Control />
        <Switch.Label>Enable reminders</Switch.Label>
      </label>
    </Switch>,
  );

  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });

  expect(switchInput).not.toBeChecked();
  fireEvent.click(switchInput);
  expect(switchInput).toBeChecked();
  expect(switchInput).toHaveAttribute('data-slot', 'switch-hidden-input');
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = createRef<HTMLLabelElement>();
  const controlRef = createRef<HTMLSpanElement>();
  const thumbRef = createRef<HTMLSpanElement>();
  const labelRef = createRef<HTMLSpanElement>();

  render(
    <Switch ref={rootRef} size="lg">
      <Switch.Control ref={controlRef}>
        <Switch.Thumb ref={thumbRef} />
      </Switch.Control>
      <Switch.Label ref={labelRef}>Email notifications</Switch.Label>
    </Switch>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'switch-root');
  expect(rootRef.current).toHaveAttribute('data-size', 'lg');
  expect(controlRef.current).toHaveAttribute('data-slot', 'switch-control');
  expect(thumbRef.current).toHaveAttribute('data-slot', 'switch-thumb');
  expect(labelRef.current).toHaveAttribute('data-slot', 'switch-label');
});

test('restores uncontrolled checked state when its form resets', async () => {
  const { container } = render(
    <form>
      <Switch defaultChecked name="notifications">
        <Switch.Control />
        <Switch.Label>Email notifications</Switch.Label>
      </Switch>
    </form>,
  );

  const form = container.querySelector('form')!;
  const switchInput = screen.getByRole('checkbox', { name: 'Email notifications' });

  fireEvent.click(switchInput);
  expect(switchInput).not.toBeChecked();

  form.reset();
  await waitFor(() => expect(switchInput).toBeChecked());
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(
    <>
      <Switch disabled>
        <Switch.Control />
        <Switch.Label>Disabled option</Switch.Label>
      </Switch>
      <Switch readOnly>
        <Switch.Control />
        <Switch.Label>Read-only option</Switch.Label>
      </Switch>
      <Switch invalid required>
        <Switch.Control />
        <Switch.Label>Required option</Switch.Label>
      </Switch>
    </>,
  );

  const disabled = screen.getByRole('checkbox', { name: 'Disabled option' });
  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });
  const required = screen.getByRole('checkbox', { name: 'Required option' });

  fireEvent.click(disabled);
  fireEvent.click(readOnly);

  expect(disabled).not.toBeChecked();
  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(readOnly).toHaveAttribute('aria-readonly', 'true');
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled state and invalid styling hooks Ark-shaped', async () => {
  function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <Switch invalid checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.Label>Enable alerts</Switch.Label>
      </Switch>
    );
  }

  render(<ControlledSwitch />);

  const switchInput = screen.getByRole('checkbox', { name: 'Enable alerts' });
  const control = document.querySelector('[data-slot="switch-control"]')!;

  expect(control).toHaveAttribute('data-invalid');
  expect(control).toHaveAttribute('data-state', 'unchecked');
  fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(switchInput).toBeChecked();
});