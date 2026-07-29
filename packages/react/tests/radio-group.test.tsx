import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { RadioGroup, useRadioGroup } from '../src';

const frameworks = ['React', 'Solid', 'Vue'];

function RadioItems() {
  return (
    <>
      {frameworks.map((framework) => (
        <RadioGroup.Option key={framework} value={framework}>
          {framework}
        </RadioGroup.Option>
      ))}
    </>
  );
}

function ControlledRadioGroup() {
  const [value, setValue] = useState<string | null>('React');

  return (
    <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup>
  );
}

function ProviderRadioGroup() {
  const radioGroup = useRadioGroup({ defaultValue: 'Solid' });

  return (
    <RadioGroup.RootProvider value={radioGroup}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup.RootProvider>
  );
}

test('renders automatic native inputs that submit and reset with the form', async () => {
  render(
    <form data-testid="form">
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioItems />
      </RadioGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('data-slot', 'radio-group-item-hidden-input');
  expect(new FormData(form).get('framework')).toBe('React');

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');

  form.reset();
  await waitFor(() => expect(react).toBeChecked());
});

test('keeps asChild composition semantic while adding one native input', () => {
  render(
    <RadioGroup defaultValue="React">
      <RadioGroup.Item asChild value="React">
        <label data-testid="custom-item">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>React</RadioGroup.ItemText>
        </label>
      </RadioGroup.Item>
    </RadioGroup>,
  );

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('preserves Ark value change callback details', async () => {
  const changes: string[] = [];
  render(
    <RadioGroup defaultValue="React" onValueChange={(details) => changes.push(details.value ?? '')}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup>,
  );

  const solid = screen.getByRole('radio', { name: 'Solid' });

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(changes).toEqual(['Solid']);
});

test('preserves controlled and provider composition paths', async () => {
  const { rerender } = render(<ControlledRadioGroup />);

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());

  rerender(<ProviderRadioGroup />);
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked();
});

test('exposes invalid and disabled state on the Ark item parts', () => {
  render(
    <RadioGroup invalid>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Item value="React">
        <RadioGroup.ItemControl data-testid="invalid-control" />
        <RadioGroup.ItemText>React</RadioGroup.ItemText>
      </RadioGroup.Item>
      <RadioGroup.Item disabled value="Solid">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>Solid</RadioGroup.ItemText>
      </RadioGroup.Item>
    </RadioGroup>,
  );

  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeDisabled();
});