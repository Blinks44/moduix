import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { RadioGroup, useRadioGroup } from '../src';

const frameworks = ['React', 'Solid', 'Vue'];

function RadioItems() {
  return (
    <>
      {frameworks.map((framework) => (
        <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
      ))}
    </>
  );
}

function ControlledRadioGroup() {
  const [value, setValue] = createSignal<string | null>('React');

  return (
    <RadioGroup value={value()} onValueChange={(details) => setValue(details.value)}>
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

test('submits through explicit Ark item inputs', async () => {
  const { container } = render(() => (
    <form>
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioItems />
      </RadioGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;
  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('keeps asChild composition semantic with an explicit item input', () => {
  render(() => (
    <RadioGroup defaultValue="React">
      <RadioGroup.Item
        asChild={(props) => <label data-testid="custom-item" {...props()} />}
        value="React"
      >
        <>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemText>React</RadioGroup.ItemText>
        </>
      </RadioGroup.Item>
    </RadioGroup>
  ));

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let itemRef: HTMLLabelElement | undefined;

  render(() => (
    <RadioGroup>
      <RadioGroup.Item
        ref={(element) => (itemRef = element)}
        asChild={(props) => <label {...props()} />}
        value="React"
      >
        <>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemText>React</RadioGroup.ItemText>
        </>
      </RadioGroup.Item>
    </RadioGroup>
  ));

  expect(itemRef).toBeUndefined();
});

test('preserves Ark value change callback details', async () => {
  const changes: string[] = [];

  render(() => (
    <RadioGroup defaultValue="React" onValueChange={(details) => changes.push(details.value ?? '')}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioItems />
    </RadioGroup>
  ));

  const solid = screen.getByRole('radio', { name: 'Solid' });

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(changes).toEqual(['Solid']);
});

test('preserves controlled and provider composition paths', async () => {
  const { unmount } = render(() => <ControlledRadioGroup />);

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());

  unmount();
  render(() => <ProviderRadioGroup />);
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  render(() => (
    <>
      <RadioGroup disabled>
        <RadioGroup.Label>Disabled framework</RadioGroup.Label>
        <RadioGroup.Option value="React">Disabled option</RadioGroup.Option>
      </RadioGroup>
      <RadioGroup readOnly>
        <RadioGroup.Label>Read-only framework</RadioGroup.Label>
        <RadioGroup.Option value="React">Read-only option</RadioGroup.Option>
      </RadioGroup>
      <RadioGroup invalid required>
        <RadioGroup.Label>Required framework</RadioGroup.Label>
        <RadioGroup.Option value="React">Required option</RadioGroup.Option>
      </RadioGroup>
    </>
  ));

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
  let rootRef!: HTMLDivElement;
  let labelRef!: HTMLSpanElement;
  let itemRef!: HTMLLabelElement;
  let controlRef!: HTMLDivElement;
  let textRef!: HTMLSpanElement;
  let indicatorRef!: HTMLDivElement;

  render(() => (
    <RadioGroup
      ref={(element) => (rootRef = element)}
      defaultValue="React"
      orientation="horizontal"
    >
      <RadioGroup.Label ref={(element) => (labelRef = element)}>Framework</RadioGroup.Label>
      <RadioGroup.Item ref={(element) => (itemRef = element)} value="React">
        <RadioGroup.ItemControl ref={(element) => (controlRef = element)} />
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemText ref={(element) => (textRef = element)}>React</RadioGroup.ItemText>
      </RadioGroup.Item>
      <RadioGroup.Indicator ref={(element) => (indicatorRef = element)} />
    </RadioGroup>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'radio-group-root');
  expect(rootRef).toHaveAttribute('data-orientation', 'horizontal');
  expect(labelRef).toHaveAttribute('data-slot', 'radio-group-label');
  expect(itemRef).toHaveAttribute('data-slot', 'radio-group-item');
  expect(controlRef).toHaveAttribute('data-slot', 'radio-group-item-control');
  expect(textRef).toHaveAttribute('data-slot', 'radio-group-item-text');
  expect(indicatorRef).toHaveAttribute('data-slot', 'radio-group-indicator');
  expect(screen.getByRole('radio', { name: 'React' })).toHaveAttribute('type', 'radio');
});

test('exposes invalid and disabled state on the Ark item parts', () => {
  render(() => (
    <RadioGroup invalid>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Item value="React">
        <RadioGroup.ItemControl data-testid="invalid-control" />
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemText>React</RadioGroup.ItemText>
      </RadioGroup.Item>
      <RadioGroup.Item disabled value="Solid">
        <RadioGroup.ItemControl />
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemText>Solid</RadioGroup.ItemText>
      </RadioGroup.Item>
    </RadioGroup>
  ));

  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeDisabled();
});