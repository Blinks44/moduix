import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Checkbox, useCheckbox } from '../src';

function ProviderCheckbox() {
  const checkbox = useCheckbox({ defaultChecked: true, name: 'provider-notifications' });

  return (
    <Checkbox.RootProvider value={checkbox}>
      <Checkbox.Control />
      <Checkbox.Label>Provider notifications</Checkbox.Label>
    </Checkbox.RootProvider>
  );
}

test('renders automatic hidden inputs for roots and preserves native form data', () => {
  const { container } = render(
    <form>
      <Checkbox defaultChecked name="notifications" value="email">
        <Checkbox.Control />
        <Checkbox.Label>Email notifications</Checkbox.Label>
      </Checkbox>
      <ProviderCheckbox />
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        <Checkbox value="react">
          <Checkbox.Control />
          <Checkbox.Label>React</Checkbox.Label>
        </Checkbox>
        <Checkbox value="vue">
          <Checkbox.Control />
          <Checkbox.Label>Vue</Checkbox.Label>
        </Checkbox>
      </Checkbox.Group>
    </form>,
  );

  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('[data-slot="checkbox-hidden-input"]')).toHaveLength(4);
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
        <Checkbox.Label>Accept terms</Checkbox.Label>
      </label>
    </Checkbox>,
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkbox).toHaveAttribute('data-slot', 'checkbox-hidden-input');
});

test('keeps controlled indeterminate state transitions Ark-shaped', async () => {
  function ControlledCheckbox() {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');

    return (
      <Checkbox checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Checkbox.Control />
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