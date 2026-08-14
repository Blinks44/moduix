import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { ToggleGroup, useToggleGroup, useToggleGroupContext } from '../src';

function ControlledToggleGroup() {
  const [value, setValue] = useState(['left']);

  return (
    <ToggleGroup
      value={value}
      onValueChange={(details) => setValue(details.value)}
      aria-label="Alignment"
    >
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
    </ToggleGroup>
  );
}

function ProviderToggleGroup() {
  const toggleGroup = useToggleGroup({ defaultValue: ['center'] });

  return (
    <ToggleGroup.RootProvider value={toggleGroup} aria-label="Alignment">
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
    </ToggleGroup.RootProvider>
  );
}

function ContextAwareItem() {
  const toggleGroup = useToggleGroupContext();
  const selected = toggleGroup.value.includes('left');

  return (
    <ToggleGroup.Item value="left" data-selected={selected || undefined}>
      {selected ? 'Selected left' : 'Left'}
    </ToggleGroup.Item>
  );
}

test('preserves Ark selection details and keyboard navigation', async () => {
  const changes: string[][] = [];
  render(
    <ToggleGroup
      defaultValue={['left']}
      onValueChange={(details) => changes.push(details.value)}
      aria-label="Alignment"
    >
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
      <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
    </ToggleGroup>,
  );

  const left = screen.getByRole('radio', { name: 'Left' });
  const center = screen.getByRole('radio', { name: 'Center' });
  const right = screen.getByRole('radio', { name: 'Right' });

  expect(left).toHaveAttribute('data-state', 'on');
  fireEvent.click(center);
  await waitFor(() => expect(center).toHaveAttribute('data-state', 'on'));
  fireEvent.click(center);
  await waitFor(() => expect(center).toHaveAttribute('data-state', 'off'));
  expect(changes).toEqual([['center'], []]);

  center.focus();
  fireEvent.keyDown(center, { key: 'ArrowRight' });
  await waitFor(() => expect(right).toHaveFocus());
});

test('preserves controlled and RootProvider composition paths', async () => {
  const { rerender } = render(<ControlledToggleGroup />);

  const center = screen.getByRole('radio', { name: 'Center' });
  fireEvent.click(center);
  await waitFor(() => expect(center).toHaveAttribute('data-state', 'on'));

  rerender(<ProviderToggleGroup />);
  expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-state', 'on');
});

test('keeps visual hooks owned by ToggleGroup while inheriting and allowing item overrides', () => {
  render(
    <ToggleGroup
      defaultValue={['left']}
      aria-label="Alignment"
      variant="outline"
      size="sm"
      data-slot="custom-root"
      data-variant="default"
      data-size="lg"
    >
      <ToggleGroup.Item
        value="left"
        variant="ghost"
        size="icon-md"
        data-slot="custom-item"
        data-variant="default"
        data-size="lg"
      >
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
    </ToggleGroup>,
  );

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root).toHaveAttribute('data-slot', 'toggle-group-root');
  expect(root).toHaveAttribute('data-variant', 'outline');
  expect(root).toHaveAttribute('data-size', 'sm');
  expect(item).toHaveAttribute('data-slot', 'toggle-group-item');
  expect(item).toHaveAttribute('data-variant', 'ghost');
  expect(item).toHaveAttribute('data-size', 'icon-md');
  expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-variant', 'outline');
  expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-size', 'sm');
});

test('supports disabled groups and asChild items', () => {
  const { rerender } = render(
    <ToggleGroup defaultValue={['left']} aria-label="Disabled alignment" disabled>
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
    </ToggleGroup>,
  );

  expect(screen.getByRole('radio', { name: 'Left' })).toBeDisabled();

  rerender(
    <ToggleGroup defaultValue={['left']} aria-label="Custom alignment">
      <ToggleGroup.Item asChild value="left">
        <button type="button">Left</button>
      </ToggleGroup.Item>
    </ToggleGroup>,
  );

  const item = screen.getByRole('radio', { name: 'Left' });
  expect(item.tagName).toBe('BUTTON');
  expect(item).toHaveAttribute('data-slot', 'toggle-group-item');
});

test('supports asChild root composition', () => {
  render(
    <ToggleGroup asChild defaultValue={['left']} aria-label="Custom alignment">
      <section>
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      </section>
    </ToggleGroup>,
  );

  const root = screen.getByRole('radiogroup', { name: 'Custom alignment' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'toggle-group-root');
});

test('forwards refs to the Ark root and item elements', () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLButtonElement>();

  render(
    <ToggleGroup ref={rootRef} defaultValue={['left']} aria-label="Alignment">
      <ToggleGroup.Item ref={itemRef} value="left">
        Left
      </ToggleGroup.Item>
    </ToggleGroup>,
  );

  expect(rootRef.current).toBe(screen.getByRole('radiogroup'));
  expect(itemRef.current).toBe(screen.getByRole('radio', { name: 'Left' }));
});

test('exposes current state through useToggleGroupContext', async () => {
  render(
    <ToggleGroup defaultValue={['left']} aria-label="Context alignment">
      <ContextAwareItem />
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
    </ToggleGroup>,
  );

  const left = screen.getByRole('radio', { name: 'Selected left' });
  const center = screen.getByRole('radio', { name: 'Center' });

  expect(left).toHaveAttribute('data-selected');
  fireEvent.click(center);
  await waitFor(() =>
    expect(screen.getByRole('radio', { name: 'Left' })).not.toHaveAttribute('data-selected'),
  );
});