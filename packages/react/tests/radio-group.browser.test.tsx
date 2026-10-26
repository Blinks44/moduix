import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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
  const changes: (string | null)[] = [];
  render(
    <form data-testid="form">
      <RadioGroup
        defaultValue="React"
        name="framework"
        onValueChange={(details) => changes.push(details.value)}
      >
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioItems />
      </RadioGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;

  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
  expect(changes).toEqual(['Solid']);
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

test('preserves controlled and provider composition paths', async () => {
  const { rerender } = render(<ControlledRadioGroup />);

  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();

  rerender(<ProviderRadioGroup />);
  await expect.element(solidRadio).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
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

  await expect
    .element(page.getByRole('radio', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radiogroup', { name: 'Read-only framework', exact: true }))
    .toHaveAttribute('aria-readonly', 'true');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('forwards refs and exposes stable slots on public parts', async () => {
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

  expect(rootRef.current?.getAttribute('data-slot')).toBe('radio-group-root');
  expect(rootRef.current?.getAttribute('data-orientation')).toBe('horizontal');
  expect(labelRef.current?.getAttribute('data-slot')).toBe('radio-group-label');
  expect(itemRef.current?.getAttribute('data-slot')).toBe('radio-group-item');
  expect(controlRef.current?.getAttribute('data-slot')).toBe('radio-group-item-control');
  expect(textRef.current?.getAttribute('data-slot')).toBe('radio-group-item-text');
  expect(indicatorRef.current?.getAttribute('data-slot')).toBe('radio-group-indicator');
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
});

test('exposes invalid and disabled state on the Ark item parts', async () => {
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

  await expect.element(page.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeDisabled();
});