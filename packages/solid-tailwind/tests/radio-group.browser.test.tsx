import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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
  const changes: (string | null)[] = [];
  const { container } = render(() => (
    <form>
      <RadioGroup
        defaultValue="React"
        name="framework"
        onValueChange={(details) => changes.push(details.value)}
      >
        <RadioGroupLabel>Framework</RadioGroupLabel>
        <RadioItems />
      </RadioGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;

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
  render(() => (
    <RadioGroup defaultValue="React">
      <RadioGroupItem
        class="grid w-56"
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
  expect([...item!.classList]).toEqual(expect.arrayContaining(['grid', 'w-56']));
  expect(item.classList.contains('inline-flex')).toBe(false);
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

test('preserves controlled and provider composition paths', async () => {
  const { unmount } = render(() => <ControlledRadioGroup />);

  const solidRadio = page.getByRole('radio', { name: 'Solid', exact: true });
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(solidRadio).toBeChecked();

  unmount();
  render(() => <ProviderRadioGroup />);
  await expect.element(solidRadio).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
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

  expect(rootRef.getAttribute('data-slot')).toBe('radio-group-root');
  expect(rootRef.getAttribute('data-orientation')).toBe('horizontal');
  expect(labelRef.getAttribute('data-slot')).toBe('radio-group-label');
  expect(itemRef.getAttribute('data-slot')).toBe('radio-group-item');
  expect(controlRef.getAttribute('data-slot')).toBe('radio-group-item-control');
  expect(textRef.getAttribute('data-slot')).toBe('radio-group-item-text');
  expect(indicatorRef.getAttribute('data-slot')).toBe('radio-group-indicator');
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
});

test('exposes invalid and disabled state on the Ark item parts', async () => {
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

  await expect.element(page.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeDisabled();
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

  expect([...root.classList]).toEqual(
    expect.arrayContaining(['relative', 'flex', 'flex-col', 'gap-2', 'text-foreground']),
  );
  expect([...label.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'leading-5', 'font-semibold', 'text-inherit']),
  );
  expect([...item!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'w-fit', 'items-center', 'gap-2']),
  );
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['size-5', 'rounded-full', 'border', 'border-border', 'bg-background']),
  );
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['before:size-2', 'before:rounded-full', 'before:bg-current']),
  );
  expect([...text.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'leading-5', 'font-medium', 'text-inherit']),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
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

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-2', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(false);
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['size-6', 'border-primary', 'bg-muted', 'before:size-3']),
  );
  expect(
    ['size-5', 'border-border', 'bg-background', 'before:size-2'].some((name) =>
      control.classList.contains(name),
    ),
  ).toBe(false);
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.getByTestId('control')).toHaveCSS('width', '24px');
});