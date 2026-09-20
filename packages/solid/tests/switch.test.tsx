import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Switch, useSwitch } from '../src/components/switch/index';

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
  const { container } = render(() => (
    <form>
      <Switch defaultChecked name="notifications" value="email">
        <Switch.Control />
        <Switch.HiddenInput />
        <Switch.Label>Email notifications</Switch.Label>
      </Switch>
      <ProviderSwitch />
    </form>
  ));

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', () => {
  render(() => (
    <Switch asChild={(props) => <label {...props()} />}>
      <Switch.Control />
      <Switch.HiddenInput />
      <Switch.Label>Enable reminders</Switch.Label>
    </Switch>
  ));

  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });

  expect(switchInput).not.toBeChecked();
  fireEvent.click(switchInput);
  expect(switchInput).toBeChecked();
  expect(switchInput).toHaveAttribute('type', 'checkbox');
});

test('forwards refs and exposes stable slots on public parts', () => {
  let rootRef!: HTMLLabelElement;
  let controlRef!: HTMLSpanElement;
  let thumbRef!: HTMLSpanElement;
  let labelRef!: HTMLSpanElement;

  render(() => (
    <Switch ref={(element) => (rootRef = element)} size="lg">
      <Switch.Control ref={(element) => (controlRef = element)}>
        <Switch.Thumb ref={(element) => (thumbRef = element)} />
      </Switch.Control>
      <Switch.HiddenInput />
      <Switch.Label ref={(element) => (labelRef = element)}>Email notifications</Switch.Label>
    </Switch>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'switch-root');
  expect(rootRef).toHaveAttribute('data-size', 'lg');
  expect(controlRef).toHaveAttribute('data-slot', 'switch-control');
  expect(thumbRef).toHaveAttribute('data-slot', 'switch-thumb');
  expect(labelRef).toHaveAttribute('data-slot', 'switch-label');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLLabelElement | undefined;

  render(() => (
    <Switch
      ref={(element) => (rootRef = element)}
      asChild={(props) => <label {...props()} />}
      aria-label="Enable reminders"
    >
      <Switch.Control />
      <Switch.HiddenInput />
    </Switch>
  ));

  expect(screen.getByRole('checkbox', { name: 'Enable reminders' })).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
});

test('keeps the moduix data-size attribute authoritative over consumer value', () => {
  render(() => (
    <Switch size="lg" data-size="sm">
      <Switch.Control />
      <Switch.HiddenInput />
      <Switch.Label>Authoritative size</Switch.Label>
    </Switch>
  ));

  const root = screen.getByText('Authoritative size').closest('[data-slot="switch-root"]')!;

  expect(root).toHaveAttribute('data-size', 'lg');
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(() => (
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
    </>
  ));

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
    const [checked, setChecked] = createSignal(false);

    return (
      <Switch
        invalid
        checked={checked()}
        onCheckedChange={(details) => setChecked(details.checked)}
      >
        <Switch.Control />
        <Switch.HiddenInput />
        <Switch.Label>Enable alerts</Switch.Label>
      </Switch>
    );
  }

  render(() => <ControlledSwitch />);

  const switchInput = screen.getByRole('checkbox', { name: 'Enable alerts' });
  const control = document.querySelector('[data-slot="switch-control"]')!;

  expect(control).toHaveAttribute('data-invalid');
  expect(control).toHaveAttribute('data-state', 'unchecked');
  fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(switchInput).toBeChecked();
});