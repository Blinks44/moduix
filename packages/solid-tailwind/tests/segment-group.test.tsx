import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
  const [value, setValue] = createSignal<string | null>('React');

  return (
    <SegmentGroup value={value()} onValueChange={(details) => setValue(details.value)}>
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

test('submits through explicit Ark item inputs', async () => {
  const { container } = render(() => (
    <form>
      <SegmentGroup defaultValue="React" name="framework">
        <SegmentItems />
      </SegmentGroup>
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
    <SegmentGroup defaultValue="React">
      <SegmentGroup.Item
        asChild={(props) => <label data-testid="custom-item" {...props()} />}
        value="React"
      >
        <>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </>
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  const item = screen.getByTestId('custom-item');
  expect(item.tagName).toBe('LABEL');
  expect(item.querySelectorAll('input[type="radio"]')).toHaveLength(1);
});

test('keeps asChild item state reactive after selection changes', async () => {
  render(() => (
    <SegmentGroup defaultValue="Monthly">
      <SegmentGroup.Indicator data-testid="indicator" />
      <SegmentGroup.Item
        value="Monthly"
        asChild={(props) => <label data-testid="monthly" {...props()} />}
      >
        <>
          <SegmentGroup.ItemText>Monthly</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </>
      </SegmentGroup.Item>
      <SegmentGroup.Item
        value="Annual"
        asChild={(props) => <label data-testid="annual" {...props()} />}
      >
        <>
          <SegmentGroup.ItemText>Annual</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </>
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  const monthly = screen.getByTestId('monthly');
  const annual = screen.getByTestId('annual');

  Object.defineProperties(monthly, {
    offsetLeft: { configurable: true, value: 0 },
    offsetTop: { configurable: true, value: 0 },
    offsetWidth: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 40 },
  });
  Object.defineProperties(annual, {
    offsetLeft: { configurable: true, value: 100 },
    offsetTop: { configurable: true, value: 0 },
    offsetWidth: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 40 },
  });

  expect(monthly).toHaveAttribute('data-state', 'checked');
  fireEvent.click(annual);

  await waitFor(() => expect(annual).toHaveAttribute('data-state', 'checked'));
  expect(monthly).not.toHaveAttribute('data-state', 'checked');
  expect(screen.getByTestId('indicator').style.getPropertyValue('--left')).toBe('100px');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let itemRef: HTMLLabelElement | undefined;

  render(() => (
    <SegmentGroup>
      <SegmentGroup.Item
        ref={(element) => (itemRef = element)}
        asChild={(props) => <label {...props()} />}
        value="React"
      >
        <>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </>
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  expect(itemRef).toBeUndefined();
});

test('preserves Ark value change callback details', async () => {
  const changes: string[] = [];

  render(() => (
    <SegmentGroup
      defaultValue="React"
      onValueChange={(details) => changes.push(details.value ?? '')}
    >
      <SegmentItems />
    </SegmentGroup>
  ));

  const solid = screen.getByRole('radio', { name: 'Solid' });

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(changes).toEqual(['Solid']);
});

test('preserves native radio semantics and disabled items', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" name="framework">
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="React">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="Solid" disabled>
        <SegmentGroup.ItemText>Solid</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="Vue">
        <SegmentGroup.ItemText>Vue</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });
  const vue = screen.getByRole('radio', { name: 'Vue' });

  expect(react).toHaveAttribute('type', 'radio');
  expect(react).toHaveAttribute('name', 'framework');
  expect(react).toBeChecked();
  expect(solid).toBeDisabled();

  solid.click();
  expect(react).toBeChecked();

  vue.click();
  await waitFor(() => expect(vue).toBeChecked());
});

test('propagates group disabled state to every native input', () => {
  render(() => (
    <SegmentGroup defaultValue="React" disabled>
      <SegmentItems />
    </SegmentGroup>
  ));

  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  for (const item of screen
    .getAllByRole('radio')
    .map((radio) => radio.closest('[data-slot="segment-group-item"]'))) {
    expect(item).toHaveClass('group-data-disabled/segment-group:!opacity-100');
  }
  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toBeDisabled();
  }
});

test('forwards refs through the root, item, and indicator wrappers', () => {
  let rootRef!: HTMLDivElement;
  let itemRef!: HTMLLabelElement;
  let indicatorRef!: HTMLDivElement;

  render(() => (
    <SegmentGroup ref={(element) => (rootRef = element)} defaultValue="React">
      <SegmentGroup.Indicator ref={(element) => (indicatorRef = element)} />
      <SegmentGroup.Item ref={(element) => (itemRef = element)} value="React">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  expect(rootRef).toBe(screen.getByRole('radiogroup'));
  expect(itemRef?.tagName).toBe('LABEL');
  expect(indicatorRef).toHaveAttribute('data-slot', 'segment-group-indicator');
});

test('keeps read-only native inputs from changing value', async () => {
  render(() => (
    <SegmentGroup defaultValue="React" readOnly>
      <SegmentItems />
    </SegmentGroup>
  ));

  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  fireEvent.click(solid);

  await waitFor(() => expect(react).toBeChecked());
  expect(solid).not.toBeChecked();
});

test('preserves controlled and provider composition paths', async () => {
  const { unmount } = render(() => <ControlledSegmentGroup />);

  const solid = screen.getByRole('radio', { name: 'Solid' });
  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());

  unmount();
  render(() => <ProviderSegmentGroup />);
  expect(screen.getByRole('radio', { name: 'Solid' })).toBeChecked();
});

test('inherits Field state on Ark item parts', () => {
  render(() => (
    <Field disabled invalid readOnly required>
      <SegmentGroup defaultValue="React">
        <SegmentGroup.Item value="React">
          <SegmentGroup.ItemControl data-testid="invalid-control" />
          <SegmentGroup.ItemHiddenInput />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </SegmentGroup.Item>
      </SegmentGroup>
    </Field>
  ));

  expect(screen.getByRole('radio', { name: 'React' })).toBeDisabled();
  expect(screen.getByTestId('invalid-control')).toHaveAttribute('data-invalid');
});

test('inherits Fieldset disabled and invalid state', () => {
  render(() => (
    <Fieldset disabled invalid>
      <SegmentGroup defaultValue="React">
        <SegmentGroup.Item value="React">
          <SegmentGroup.ItemControl data-testid="fieldset-invalid-control" />
          <SegmentGroup.ItemHiddenInput />
          <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        </SegmentGroup.Item>
      </SegmentGroup>
    </Fieldset>
  ));

  expect(screen.getByRole('radio', { name: 'React' })).toBeDisabled();
  expect(screen.getByTestId('fieldset-invalid-control')).toHaveAttribute('data-invalid');
});

test('preserves vertical orientation for Ark navigation', () => {
  render(() => (
    <SegmentGroup defaultValue="React" orientation="vertical">
      <SegmentItems />
    </SegmentGroup>
  ));

  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-orientation', 'vertical');
  expect(screen.getByRole('radio', { name: 'React' }).parentElement).toHaveAttribute(
    'data-orientation',
    'vertical',
  );
});

test('applies native utilities to component-owned visual parts', () => {
  render(() => (
    <SegmentGroup defaultValue="React">
      <SegmentGroup.Label>Framework</SegmentGroup.Label>
      <SegmentGroup.Indicator data-testid="indicator" />
      <SegmentGroup.Item value="React">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  const root = screen.getByRole('radiogroup');
  const label = screen.getByText('Framework');
  const item = root.querySelector('[data-slot="segment-group-item"]')!;
  const text = root.querySelector('[data-slot="segment-group-item-text"]')!;
  const control = root.querySelector('[data-slot="segment-group-item-control"]')!;
  const indicator = screen.getByTestId('indicator');

  expect(root).toHaveClass(
    'inline-flex',
    'max-w-full',
    'gap-1',
    'rounded-lg',
    'border',
    'bg-muted',
  );
  expect(label).toHaveClass('text-sm', 'leading-5', 'font-semibold', 'text-inherit');
  expect(item).toHaveClass('inline-flex', 'min-h-control-sm', 'gap-2', 'rounded-md');
  expect(item).toHaveClass('text-sm', 'font-medium', 'text-muted-foreground');
  expect(text).toHaveClass('relative', 'z-1');
  expect(control).toHaveClass('hidden');
  expect(indicator).toHaveClass('absolute', 'rounded-md', 'bg-background', 'shadow-sm');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <SegmentGroup class="gap-4 text-primary" data-testid="root">
      <SegmentGroup.Indicator class="rounded-full bg-primary" data-testid="indicator" />
      <SegmentGroup.Item value="React" class="gap-4 text-primary">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>
  ));

  const root = screen.getByTestId('root');
  const indicator = screen.getByTestId('indicator');
  const item = screen.getByRole('radio', { name: 'React' }).parentElement!;

  expect(root).toHaveClass('gap-4', 'text-primary');
  expect(root).not.toHaveClass('gap-1', 'text-foreground');
  expect(indicator).toHaveClass('rounded-full', 'bg-primary');
  expect(indicator).not.toHaveClass('rounded-md', 'bg-background');
  expect(item).toHaveClass('gap-4', 'text-primary');
  expect(item).not.toHaveClass('gap-2', 'text-muted-foreground');
});