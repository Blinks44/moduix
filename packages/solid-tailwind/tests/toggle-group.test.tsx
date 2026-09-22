import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
} from '../src';

function ControlledToggleGroup() {
  const [value, setValue] = createSignal(['left']);

  return (
    <ToggleGroup
      value={value()}
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
  const selected = () => toggleGroup().value.includes('left');

  return (
    <ToggleGroupItem value="left" data-selected={selected() || undefined}>
      {selected() ? 'Selected left' : 'Left'}
    </ToggleGroupItem>
  );
}

test('preserves Ark selection details and keyboard navigation', async () => {
  const changes: string[][] = [];
  render(() => (
    <ToggleGroup
      defaultValue={['left']}
      onValueChange={(details) => changes.push(details.value)}
      aria-label="Alignment"
    >
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ));

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
  const controlled = render(() => <ControlledToggleGroup />);

  const center = screen.getByRole('radio', { name: 'Center' });
  fireEvent.click(center);
  await waitFor(() => expect(center).toHaveAttribute('data-state', 'on'));

  controlled.unmount();
  render(() => <ProviderToggleGroup />);
  expect(screen.getByRole('radio', { name: 'Center' })).toHaveAttribute('data-state', 'on');
});

test('keeps visual hooks owned by ToggleGroup while inheriting and allowing item overrides', () => {
  render(() => (
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
    </ToggleGroup>
  ));

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
  const { unmount } = render(() => (
    <ToggleGroup defaultValue={['left']} aria-label="Disabled alignment" disabled>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
    </ToggleGroup>
  ));

  expect(screen.getByRole('radio', { name: 'Left' })).toBeDisabled();
  unmount();

  render(() => (
    <ToggleGroup defaultValue={['left']} aria-label="Custom alignment">
      <ToggleGroupItem
        asChild={(props) => {
          const resolvedProps = props();

          return (
            <button {...resolvedProps} type="button">
              {resolvedProps.children}
            </button>
          );
        }}
        value="left"
      >
        Left
      </ToggleGroupItem>
    </ToggleGroup>
  ));

  const item = screen.getByRole('radio', { name: 'Left' });
  expect(item.tagName).toBe('BUTTON');
  expect(item).toHaveAttribute('data-slot', 'toggle-group-item');
});

test('supports asChild root composition', () => {
  render(() => (
    <ToggleGroup
      asChild={(props) => <section {...props()} />}
      defaultValue={['left']}
      aria-label="Custom alignment"
    >
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
    </ToggleGroup>
  ));

  const root = screen.getByRole('radiogroup', { name: 'Custom alignment' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'toggle-group-root');
});

test('forwards refs to the Ark root and item elements', () => {
  let rootRef: HTMLDivElement | undefined;
  let itemRef: HTMLButtonElement | undefined;

  render(() => (
    <ToggleGroup
      ref={(element) => {
        rootRef = element;
      }}
      defaultValue={['left']}
      aria-label="Alignment"
    >
      <ToggleGroupItem
        ref={(element) => {
          itemRef = element;
        }}
        value="left"
      >
        Left
      </ToggleGroupItem>
    </ToggleGroup>
  ));

  expect(rootRef).toBe(screen.getByRole('radiogroup'));
  expect(itemRef).toBe(screen.getByRole('radio', { name: 'Left' }));
});

test('exposes current state through useToggleGroupContext', async () => {
  render(() => (
    <ToggleGroup defaultValue={['left']} aria-label="Context alignment">
      <ContextAwareItem />
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
    </ToggleGroup>
  ));

  const left = screen.getByRole('radio', { name: 'Selected left' });
  const center = screen.getByRole('radio', { name: 'Center' });

  expect(left).toHaveAttribute('data-selected');
  fireEvent.click(center);
  await waitFor(() =>
    expect(screen.getByRole('radio', { name: 'Left' })).not.toHaveAttribute('data-selected'),
  );
});

test('applies native utilities to component-owned visual parts', () => {
  render(() => (
    <ToggleGroup variant="outline">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
    </ToggleGroup>
  ));

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root).toHaveClass('group/toggle-group', 'inline-flex', 'gap-px', 'rounded-lg', 'border');
  expect(root).toHaveClass('bg-background', 'p-0.5', 'max-w-full', 'overflow-x-auto');
  expect(item).toHaveClass(
    'box-border',
    'flex-none',
    'min-h-control-md',
    'gap-2',
    'rounded-md',
    'border',
    'bg-background',
    'px-4',
    'py-1',
    'text-sm',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <ToggleGroup
      class="gap-4 rounded-none border-primary bg-card p-4"
      variant="outline"
      size="lg"
      aria-label="Custom alignment"
    >
      <ToggleGroupItem value="left" class="border-primary bg-card p-0 text-xs">
        Left
      </ToggleGroupItem>
    </ToggleGroup>
  ));

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root).toHaveClass('gap-4', 'rounded-none', 'border-primary', 'bg-card', 'p-4');
  expect(root).not.toHaveClass('gap-px', 'rounded-lg', 'border-border', 'bg-background', 'p-0.5');
  expect(item).toHaveClass('border-primary', 'bg-card', 'p-0', 'text-xs');
  expect(item).not.toHaveClass(
    'border-border',
    'bg-background',
    'min-h-control-lg',
    'px-5',
    'py-1.5',
    'text-md',
  );
});
