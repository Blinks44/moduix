import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Switch, useSwitch } from '../src';

function ProviderSwitch() {
  const switchApi = useSwitch({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <Switch.RootProvider value={switchApi}>
      <Switch.Control />
      <Switch.HiddenInput />
      <Switch.Label>Provider notifications</Switch.Label>
    </Switch.RootProvider>
  );
}

test('submits through explicit Ark inputs', () => {
  const { container } = render(
    <form>
      <Switch defaultChecked name="notifications" value="email">
        <Switch.Control />
        <Switch.HiddenInput />
        <Switch.Label>Email notifications</Switch.Label>
      </Switch>
      <ProviderSwitch />
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
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
        <Switch.HiddenInput />
        <Switch.Label>Enable reminders</Switch.Label>
      </label>
    </Switch>,
  );

  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });

  expect(switchInput).not.toBeChecked();
  fireEvent.click(switchInput);
  expect(switchInput).toBeChecked();
  expect(switchInput).toHaveAttribute('type', 'checkbox');
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
      <Switch.HiddenInput />
      <Switch.Label ref={labelRef}>Email notifications</Switch.Label>
    </Switch>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'switch-root');
  expect(rootRef.current).toHaveAttribute('data-size', 'lg');
  expect(controlRef.current).toHaveAttribute('data-slot', 'switch-control');
  expect(thumbRef.current).toHaveAttribute('data-slot', 'switch-thumb');
  expect(labelRef.current).toHaveAttribute('data-slot', 'switch-label');
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(
    <>
      <Switch disabled>
        <Switch.Control />
        <Switch.HiddenInput />
        <Switch.Label>Disabled option</Switch.Label>
      </Switch>
      <Switch readOnly>
        <Switch.Control />
        <Switch.HiddenInput />
        <Switch.Label>Read-only option</Switch.Label>
      </Switch>
      <Switch invalid required>
        <Switch.Control />
        <Switch.HiddenInput />
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
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled state and invalid styling hooks Ark-shaped', async () => {
  function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <Switch invalid checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.HiddenInput />
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