import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '../src/components/checkbox/index';

function ProviderCheckbox() {
  const checkbox = useCheckbox({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <CheckboxRootProvider value={checkbox}>
      <CheckboxControl />
      <CheckboxHiddenInput />
      <CheckboxLabel>Provider notifications</CheckboxLabel>
    </CheckboxRootProvider>
  );
}

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render(() => (
    <form>
      <Checkbox defaultChecked name="notifications" value="email">
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Email notifications</CheckboxLabel>
      </Checkbox>
      <ProviderCheckbox />
      <CheckboxGroup defaultValue={['react']} name="frameworks">
        <Checkbox value="react">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>React</CheckboxLabel>
        </Checkbox>
        <Checkbox value="vue">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>Vue</CheckboxLabel>
        </Checkbox>
      </CheckboxGroup>
    </form>
  ));

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
    ['frameworks', 'react'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', () => {
  render(() => (
    <Checkbox asChild={(props) => <label {...props()} />}>
      <CheckboxControl />
      <CheckboxHiddenInput />
      <CheckboxLabel>Accept terms</CheckboxLabel>
    </Checkbox>
  ));

  const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('forwards refs and exposes stable slots on public parts', () => {
  let rootRef!: HTMLLabelElement;
  let controlRef!: HTMLDivElement;
  let indicatorRef!: HTMLDivElement;
  let labelRef!: HTMLSpanElement;
  let groupRef!: HTMLDivElement;

  render(() => (
    <CheckboxGroup ref={(element) => (groupRef = element)} defaultValue={['email']}>
      <Checkbox ref={(element) => (rootRef = element)} value="email" size="lg">
        <CheckboxControl ref={(element) => (controlRef = element)}>
          <CheckboxIndicator ref={(element) => (indicatorRef = element)} />
        </CheckboxControl>
        <CheckboxHiddenInput />
        <CheckboxLabel ref={(element) => (labelRef = element)}>Email notifications</CheckboxLabel>
      </Checkbox>
    </CheckboxGroup>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'checkbox-root');
  expect(rootRef).toHaveAttribute('data-size', 'lg');
  expect(controlRef).toHaveAttribute('data-slot', 'checkbox-control');
  expect(indicatorRef).toHaveAttribute('data-slot', 'checkbox-indicator');
  expect(labelRef).toHaveAttribute('data-slot', 'checkbox-label');
  expect(groupRef).toHaveAttribute('data-slot', 'checkbox-group');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLLabelElement | undefined;

  render(() => (
    <Checkbox
      ref={(element) => (rootRef = element)}
      asChild={(props) => <label {...props()} />}
      aria-label="Accept terms"
    >
      <CheckboxControl />
    </Checkbox>
  ));

  expect(rootRef).toBeUndefined();
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(() => (
    <>
      <Checkbox disabled>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Disabled option</CheckboxLabel>
      </Checkbox>
      <Checkbox readOnly>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Read-only option</CheckboxLabel>
      </Checkbox>
      <Checkbox invalid required>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Required option</CheckboxLabel>
      </Checkbox>
      <CheckboxGroup readOnly>
        <Checkbox value="group-option">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>Read-only group option</CheckboxLabel>
        </Checkbox>
      </CheckboxGroup>
    </>
  ));

  const disabled = screen.getByRole('checkbox', { name: 'Disabled option' });
  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });
  const required = screen.getByRole('checkbox', { name: 'Required option' });
  const groupReadOnly = screen.getByRole('checkbox', { name: 'Read-only group option' });

  fireEvent.click(disabled);
  fireEvent.click(readOnly);
  fireEvent.click(groupReadOnly);

  expect(disabled).not.toBeChecked();
  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(groupReadOnly).not.toBeChecked();
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled indeterminate state transitions Ark-shaped', async () => {
  function ControlledCheckbox() {
    const [checked, setChecked] = createSignal<boolean | 'indeterminate'>('indeterminate');

    return (
      <Checkbox checked={checked()} onCheckedChange={(details) => setChecked(details.checked)}>
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Select all</CheckboxLabel>
      </Checkbox>
    );
  }

  render(() => <ControlledCheckbox />);

  const checkbox = screen.getByRole('checkbox', { name: 'Select all' });
  const control = document.querySelector('[data-slot="checkbox-control"]')!;

  expect(control).toHaveAttribute('data-state', 'indeterminate');
  fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(checkbox).toBeChecked();
});