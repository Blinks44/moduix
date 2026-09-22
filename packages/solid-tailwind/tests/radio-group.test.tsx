import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
        <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
      ))}
    </>
  );
}

function ControlledRadioGroup() {
  const [value, setValue] = createSignal<string | null>('React');

  return (
    <RadioGroup value={value()} onValueChange={(details) => setValue(details.value)}>
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
  const { container } = render(() => (
    <form>
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroupLabel>Framework</RadioGroupLabel>
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
      <RadioGroupItem
        asChild={(props) => <label data-testid="custom-item" {...props()} />}
        value="React"
      >
        <>
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </>
      </RadioGroupItem>
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
      <RadioGroupItem
        ref={(element) => (itemRef = element)}
        asChild={(props) => <label {...props()} />}
        value="React"
      >
        <>
          <RadioGroupItemControl />
          <RadioGroupItemHiddenInput />
          <RadioGroupItemText>React</RadioGroupItemText>
        </>
      </RadioGroupItem>
    </RadioGroup>
  ));

  expect(itemRef).toBeUndefined();
});

test('preserves Ark value change callback details', async () => {
  const changes: string[] = [];

  render(() => (
    <RadioGroup defaultValue="React" onValueChange={(details) => changes.push(details.value ?? '')}>
      <RadioGroupLabel>Framework</RadioGroupLabel>
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
      <RadioGroupLabel ref={(element) => (labelRef = element)}>Framework</RadioGroupLabel>
      <RadioGroupItem ref={(element) => (itemRef = element)} value="React">
        <RadioGroupItemControl ref={(element) => (controlRef = element)} />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText ref={(element) => (textRef = element)}>React</RadioGroupItemText>
      </RadioGroupItem>
      <RadioGroupIndicator ref={(element) => (indicatorRef = element)} />
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
    </RadioGroup>
  ));

  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeDisabled();
});

test('applies native utilities to component-owned visual parts', () => {
  render(() => (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption value="React">React</RadioGroupOption>
    </RadioGroup>
  ));

  const root = screen.getByText('Framework').parentElement!;
  const item = root.querySelector('[data-slot="radio-group-item"]')!;
  const control = root.querySelector('[data-slot="radio-group-item-control"]')!;
  const text = root.querySelector('[data-slot="radio-group-item-text"]')!;
  const label = screen.getByText('Framework');

  expect(root).toHaveClass('relative', 'flex', 'flex-col', 'gap-2', 'text-foreground');
  expect(label).toHaveClass('text-sm', 'leading-5', 'font-semibold', 'text-inherit');
  expect(item).toHaveClass('inline-flex', 'w-fit', 'items-center', 'gap-2');
  expect(control).toHaveClass('size-5', 'rounded-full', 'border', 'border-border', 'bg-background');
  expect(control).toHaveClass('before:size-2', 'before:rounded-full', 'before:bg-current');
  expect(text).toHaveClass('text-sm', 'leading-5', 'font-medium', 'text-inherit');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <RadioGroup class="gap-4 text-primary" data-testid="root">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupItem value="React">
        <RadioGroupItemControl
          class="size-6 border-primary bg-muted before:size-3"
          data-testid="control"
        />
        <RadioGroupItemHiddenInput />
        <RadioGroupItemText>React</RadioGroupItemText>
      </RadioGroupItem>
    </RadioGroup>
  ));

  const root = screen.getByTestId('root');
  const control = screen.getByTestId('control');

  expect(root).toHaveClass('gap-4', 'text-primary');
  expect(root).not.toHaveClass('gap-2', 'text-foreground');
  expect(control).toHaveClass('size-6', 'border-primary', 'bg-muted', 'before:size-3');
  expect(control).not.toHaveClass('size-5', 'border-border', 'bg-background', 'before:size-2');
});