import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
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

test('submits through explicit Ark item inputs', async () => {
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

  expect(react).toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');

  fireEvent.click(solid);
  await waitFor(() => expect(solid).toBeChecked());
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('keeps asChild composition semantic with an explicit item input', () => {
  render(
    <SegmentGroup defaultValue="React">
      <SegmentGroup.Item asChild value="React">
        <label data-testid="custom-item">
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
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

test('preserves native radio semantics and disabled items', async () => {
  render(
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
    </SegmentGroup>,
  );

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
  render(
    <SegmentGroup defaultValue="React" disabled>
      <SegmentItems />
    </SegmentGroup>,
  );

  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-disabled');
  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toBeDisabled();
  }
});

test('forwards refs through the root, item, and indicator wrappers', () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLLabelElement>();
  const indicatorRef = createRef<HTMLDivElement>();

  render(
    <SegmentGroup ref={rootRef} defaultValue="React">
      <SegmentGroup.Indicator ref={indicatorRef} />
      <SegmentGroup.Item ref={itemRef} value="React">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>,
  );

  expect(rootRef.current).toBe(screen.getByRole('radiogroup'));
  expect(itemRef.current?.tagName).toBe('LABEL');
  expect(indicatorRef.current).toHaveAttribute('data-slot', 'segment-group-indicator');
});

test('keeps read-only native inputs from changing value', async () => {
  render(
    <SegmentGroup defaultValue="React" readOnly>
      <SegmentItems />
    </SegmentGroup>,
  );

  const react = screen.getByRole('radio', { name: 'React' });
  const solid = screen.getByRole('radio', { name: 'Solid' });

  fireEvent.click(solid);

  await waitFor(() => expect(react).toBeChecked());
  expect(solid).not.toBeChecked();
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
          <SegmentGroup.ItemHiddenInput />
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
          <SegmentGroup.ItemHiddenInput />
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

test('applies native utilities to component-owned visual parts', () => {
  render(
    <SegmentGroup defaultValue="React">
      <SegmentGroup.Label>Framework</SegmentGroup.Label>
      <SegmentGroup.Indicator data-testid="indicator" />
      <SegmentGroup.Item value="React">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>,
  );

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
  render(
    <SegmentGroup className="gap-4 text-primary" data-testid="root">
      <SegmentGroup.Indicator className="rounded-full bg-primary" data-testid="indicator" />
      <SegmentGroup.Item value="React" className="gap-4 text-primary">
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup>,
  );

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