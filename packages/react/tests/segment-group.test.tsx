import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Field, Fieldset, SegmentGroup, useSegmentGroup } from '../src';

const frameworks = ['React', 'Solid', 'Vue'];
const frameworkItems = frameworks.map((value) => ({ value, label: value }));

function SegmentItems() {
  return (
    <>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </>
  );
}

function ControlledSegmentGroup() {
  const [value, setValue] = useState<string | null>('React');

  return (
    <SegmentGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <SegmentItems />
    </SegmentGroup>
  );
}

function ProviderSegmentGroup() {
  const segmentGroup = useSegmentGroup({ defaultValue: 'Solid' });

  return (
    <SegmentGroup.RootProvider value={segmentGroup}>
      <SegmentItems />
    </SegmentGroup.RootProvider>
  );
}

test('renders automatic native inputs that submit and reset with the form', async () => {
  render(
    <form data-testid="form">
      <SegmentGroup defaultValue="React" name="framework">
        <SegmentItems />
      </SegmentGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('data-slot', 'segment-group-item-hidden-input');
  expect(new FormData(form).get('framework')).toBe('React');

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');

  form.reset();
  await waitFor(() => expect(react).toBeChecked());
});

test('keeps asChild composition semantic while adding one native input', () => {
  render(
    <SegmentGroup defaultValue="React">
      <SegmentGroup.Item asChild value="React">
        <label data-testid="custom-item">
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </label>
      </SegmentGroup.Item>
    </SegmentGroup>,
  );

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('preserves Ark value change callback details', async () => {
  const changes: string[] = [];
  render(
    <SegmentGroup
      defaultValue="React"
      onValueChange={(details) => changes.push(details.value ?? '')}
    >
      <SegmentItems />
    </SegmentGroup>,
  );

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);

  await waitFor(() => expect(solid).toBeChecked());
  expect(changes).toEqual(['Solid']);
});

test('preserves controlled and provider composition paths', async () => {
  const { rerender } = render(<ControlledSegmentGroup />);

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());

  rerender(<ProviderSegmentGroup />);
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked();
});

test('inherits Field state on Ark item parts', () => {
  render(
    <Field disabled invalid readOnly required>
      <SegmentGroup defaultValue="React">
        <SegmentGroup.Item value="React">
          <SegmentGroup.ItemControl data-testid="invalid-control" />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </SegmentGroup.Item>
      </SegmentGroup>
    </Field>,
  );

  expect(screen.getByRole('radio', { name: 'React' })).toBeDisabled();
  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
});

test('inherits Fieldset disabled and invalid state', () => {
  render(
    <Fieldset disabled invalid>
      <SegmentGroup defaultValue="React">
        <SegmentGroup.Item value="React">
          <SegmentGroup.ItemControl data-testid="fieldset-invalid-control" />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </SegmentGroup.Item>
      </SegmentGroup>
    </Fieldset>,
  );

  expect(screen.getByRole('radio', { name: 'React' })).toBeDisabled();
  expect(screen.getByTestId('fieldset-invalid-control')).toHaveAttribute('data-invalid');
});

test('preserves vertical orientation for Ark navigation', () => {
  render(
    <SegmentGroup defaultValue="React" orientation="vertical">
      <SegmentItems />
    </SegmentGroup>,
  );

  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-orientation', 'vertical');
  expect(screen.getByRole('radio', { name: 'React' }).parentElement).toHaveAttribute(
    'data-orientation',
    'vertical',
  );
});