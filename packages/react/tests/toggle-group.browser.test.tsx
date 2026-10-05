import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
} from '../src';

function ControlledToggleGroup() {
  const [value, setValue] = useState(['left']);

  return (
    <ToggleGroup
      value={value}
      onValueChange={(details) => setValue(details.value)}
      aria-label="Alignment"
    >
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
    </ToggleGroup>
  );
}

function ProviderToggleGroup() {
  const toggleGroup = useToggleGroup({ defaultValue: ['center'] });

  return (
    <ToggleGroupRootProvider value={toggleGroup} aria-label="Alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
    </ToggleGroupRootProvider>
  );
}

function ContextAwareItem() {
  const toggleGroup = useToggleGroupContext();
  const selected = toggleGroup.value.includes('left');

  return (
    <ToggleGroupItem value="left" data-selected={selected || undefined}>
      {selected ? 'Selected left' : 'Left'}
    </ToggleGroupItem>
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
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>,
  );

  await expect
    .element(page.getByRole('radio', { name: 'Left' }))
    .toHaveAttribute('data-state', 'on');
  const center = page.getByRole('radio', { name: 'Center' });

  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'on');
  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'off');
  expect(changes).toEqual([['center'], []]);

  await expect.element(center).toBeFocused();
  await center.press('ArrowRight');
  await expect.element(page.getByRole('radio', { name: 'Right' })).toBeFocused();
});

test('preserves controlled and RootProvider composition paths', async () => {
  const { rerender } = render(<ControlledToggleGroup />);

  const center = page.getByRole('radio', { name: 'Center' });

  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'on');

  rerender(<ProviderToggleGroup />);
  await expect.element(center).toHaveAttribute('data-state', 'on');
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
      <ToggleGroupItem
        value="left"
        variant="ghost"
        size="icon-md"
        data-slot="custom-item"
        data-variant="default"
        data-size="lg"
      >
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
    </ToggleGroup>,
  );

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root.dataset).toMatchObject({ slot: 'toggle-group-root', variant: 'outline', size: 'sm' });
  expect(item.dataset).toMatchObject({
    slot: 'toggle-group-item',
    variant: 'ghost',
    size: 'icon-md',
  });
  expect(screen.getByRole('radio', { name: 'Center' }).dataset).toMatchObject({
    variant: 'outline',
    size: 'sm',
  });
});

test('supports disabled groups and asChild items', async () => {
  const { rerender } = render(
    <ToggleGroup defaultValue={['left']} aria-label="Disabled alignment" disabled>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
    </ToggleGroup>,
  );

  await expect.element(page.getByRole('radio', { name: 'Left' })).toBeDisabled();

  rerender(
    <ToggleGroup defaultValue={['left']} aria-label="Custom alignment">
      <ToggleGroupItem asChild value="left">
        <button type="button">Left</button>
      </ToggleGroupItem>
    </ToggleGroup>,
  );

  const item = screen.getByRole('radio', { name: 'Left' });
  expect(item.tagName).toBe('BUTTON');
  expect(item.getAttribute('data-slot')).toBe('toggle-group-item');
});

test('supports asChild root composition', () => {
  render(
    <ToggleGroup asChild defaultValue={['left']} aria-label="Custom alignment">
      <section>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </section>
    </ToggleGroup>,
  );

  const root = screen.getByRole('radiogroup', { name: 'Custom alignment' });

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('toggle-group-root');
});

test('forwards refs to the Ark root and item elements', () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLButtonElement>();

  render(
    <ToggleGroup ref={rootRef} defaultValue={['left']} aria-label="Alignment">
      <ToggleGroupItem ref={itemRef} value="left">
        Left
      </ToggleGroupItem>
    </ToggleGroup>,
  );

  expect(rootRef.current).toBe(screen.getByRole('radiogroup'));
  expect(itemRef.current).toBe(screen.getByRole('radio', { name: 'Left' }));
});

test('exposes current state through useToggleGroupContext', async () => {
  render(
    <ToggleGroup defaultValue={['left']} aria-label="Context alignment">
      <ContextAwareItem />
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
    </ToggleGroup>,
  );

  const left = screen.getByRole('radio', { name: 'Selected left' });

  expect(left.hasAttribute('data-selected')).toBe(true);
  await page.getByRole('radio', { name: 'Center' }).click();
  expect(screen.getByRole('radio', { name: 'Left' }).hasAttribute('data-selected')).not.toBe(true);
});