import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
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