import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
} from '../src';

const frameworks = ['React', 'Solid', 'Vue'];

function RadioItems() {
  return (
    <>
      {frameworks.map((framework) => (
        <RadioGroupOption key={framework} value={framework}>
          {framework}
        </RadioGroupOption>
      ))}
    </>
  );
}

function ControlledRadioGroup() {
  const [value, setValue] = useState<string | null>('React');

  return (
    <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroup>
  );
}

function ProviderRadioGroup() {
  const radioGroup = useRadioGroup({ defaultValue: 'Solid' });

  return (
    <RadioGroupRootProvider value={radioGroup}>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioItems />
    </RadioGroupRootProvider>
  );
}

test('submits through explicit Ark item inputs', async () => {
  render(
    <form data-testid="form">
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioItems />
      </RadioGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('keeps asChild composition semantic with an explicit item input', () => {
  render(
    <RadioGroup defaultValue="React">
      <RadioGroupItem asChild value="React">
        <label data-testid="custom-item">
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </label>
      </RadioGroupItem>
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
      <RadioGroupLabel>Framework</RadioGroupLabel>
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

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(
    <>
      <RadioGroup disabled>
        <RadioGroupLabel>Disabled framework</RadioGroupLabel>
        <RadioGroupOption value="React">Disabled option</RadioGroupOption>
      </RadioGroup>
      <RadioGroup readOnly>
        <RadioGroupLabel>Read-only framework</RadioGroupLabel>
        <RadioGroupOption value="React">Read-only option</RadioGroupOption>
      </RadioGroup>
      <RadioGroup invalid required>
        <RadioGroupLabel>Required framework</RadioGroupLabel>
        <RadioGroupOption value="React">Required option</RadioGroupOption>
      </RadioGroup>
    </>,
  );

  const disabled = screen.getByRole('radio', { name: 'Disabled option' });
  const readOnly = screen.getByRole('radio', { name: 'Read-only option' });
  const required = screen.getByRole('radio', { name: 'Required option' });

  fireEvent.click(readOnly);

  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(readOnly).toBeDisabled();
  expect(screen.getByRole('radiogroup', { name: 'Read-only framework' })).toHaveAttribute(
    'aria-readonly',
    'true',
  );
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('forwards refs and exposes stable slots on public parts', () => {
  const rootRef = createRef<HTMLDivElement>();
  const labelRef = createRef<HTMLSpanElement>();
  const itemRef = createRef<HTMLLabelElement>();
  const controlRef = createRef<HTMLDivElement>();
  const textRef = createRef<HTMLSpanElement>();
  const indicatorRef = createRef<HTMLDivElement>();

  render(
    <RadioGroup ref={rootRef} defaultValue="React" orientation="horizontal">
      <RadioGroupLabel ref={labelRef}>Framework</RadioGroupLabel>
      <RadioGroupItem ref={itemRef} value="React">
        <RadioGroupItemControl ref={controlRef} />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText ref={textRef}>React</RadioGroupItemText>
      </RadioGroupItem>
      <RadioGroupIndicator ref={indicatorRef} />
    </RadioGroup>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'radio-group-root');
  expect(rootRef.current).toHaveAttribute('data-orientation', 'horizontal');
  expect(labelRef.current).toHaveAttribute('data-slot', 'radio-group-label');
  expect(itemRef.current).toHaveAttribute('data-slot', 'radio-group-item');
  expect(controlRef.current).toHaveAttribute('data-slot', 'radio-group-item-control');
  expect(textRef.current).toHaveAttribute('data-slot', 'radio-group-item-text');
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'radio-group-indicator');
  expect(screen.getByRole('radio', { name: 'React' })).toHaveAttribute('type', 'radio');
});

test('exposes invalid and disabled state on the Ark item parts', () => {
  render(
    <RadioGroup invalid>
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupItem value="React">
        <RadioGroupItemControl data-testid="invalid-control" />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText>React</RadioGroupItemText>
      </RadioGroupItem>
      <RadioGroupItem disabled value="Solid">
        <RadioGroupItemControl />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText>Solid</RadioGroupItemText>
      </RadioGroupItem>
    </RadioGroup>,
  );

  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeDisabled();
});
