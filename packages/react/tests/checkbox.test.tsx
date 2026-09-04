import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Checkbox, useCheckbox } from '../src';

function ProviderCheckbox() {
  const checkbox = useCheckbox({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <Checkbox.RootProvider value={checkbox}>
      <Checkbox.Control />
      <Checkbox.HiddenInput />
      <Checkbox.Label>Provider notifications</Checkbox.Label>
    </Checkbox.RootProvider>
  );
}

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render(
    <form>
      <Checkbox defaultChecked name="notifications" value="email">
        <Checkbox.Control />
        <Checkbox.HiddenInput />
        <Checkbox.Label>Email notifications</Checkbox.Label>
      </Checkbox>
      <ProviderCheckbox />
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        <Checkbox value="react">
          <Checkbox.Control />
          <Checkbox.HiddenInput />
          <Checkbox.Label>React</Checkbox.Label>
        </Checkbox>
        <Checkbox value="vue">
          <Checkbox.Control />
          <Checkbox.HiddenInput />
          <Checkbox.Label>Vue</Checkbox.Label>
        </Checkbox>
      </Checkbox.Group>
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
    ['frameworks', 'react'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', () => {
  render(
    <Checkbox asChild>
      <label>
        <Checkbox.Control />
        <Checkbox.HiddenInput />
        <Checkbox.Label>Accept terms</Checkbox.Label>
      </label>
    </Checkbox>,
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = createRef<HTMLLabelElement>();
  const controlRef = createRef<HTMLDivElement>();
  const indicatorRef = createRef<HTMLDivElement>();
  const labelRef = createRef<HTMLSpanElement>();
  const groupRef = createRef<HTMLDivElement>();

  render(
    <Checkbox.Group ref={groupRef} defaultValue={['email']}>
      <Checkbox ref={rootRef} value="email" size="lg">
        <Checkbox.Control ref={controlRef}>
          <Checkbox.Indicator ref={indicatorRef} />
        </Checkbox.Control>
        <Checkbox.HiddenInput />
        <Checkbox.Label ref={labelRef}>Email notifications</Checkbox.Label>
      </Checkbox>
    </Checkbox.Group>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'checkbox-root');
  expect(rootRef.current).toHaveAttribute('data-size', 'lg');
  expect(controlRef.current).toHaveAttribute('data-slot', 'checkbox-control');
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'checkbox-indicator');
  expect(labelRef.current).toHaveAttribute('data-slot', 'checkbox-label');
  expect(groupRef.current).toHaveAttribute('data-slot', 'checkbox-group');
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(
    <>
      <Checkbox disabled>
        <Checkbox.Control />
        <Checkbox.HiddenInput />
        <Checkbox.Label>Disabled option</Checkbox.Label>
      </Checkbox>
      <Checkbox readOnly>
        <Checkbox.Control />
        <Checkbox.HiddenInput />
        <Checkbox.Label>Read-only option</Checkbox.Label>
      </Checkbox>
      <Checkbox invalid required>
        <Checkbox.Control />
        <Checkbox.HiddenInput />
        <Checkbox.Label>Required option</Checkbox.Label>
      </Checkbox>
      <Checkbox.Group readOnly>
        <Checkbox value="group-option">
          <Checkbox.Control />
          <Checkbox.HiddenInput />
          <Checkbox.Label>Read-only group option</Checkbox.Label>
        </Checkbox>
      </Checkbox.Group>
    </>,
  );

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
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');

    return (
      <Checkbox checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Checkbox.Control />
        <Checkbox.HiddenInput />
        <Checkbox.Label>Select all</Checkbox.Label>
      </Checkbox>
    );
  }

  render(<ControlledCheckbox />);

  const checkbox = screen.getByRole('checkbox', { name: 'Select all' });
  const control = document.querySelector('[data-slot="checkbox-control"]')!;

  expect(control).toHaveAttribute('data-state', 'indeterminate');
  fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(checkbox).toBeChecked();
});