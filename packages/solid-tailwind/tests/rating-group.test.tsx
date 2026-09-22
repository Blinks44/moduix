import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '../src';

function RatingItems() {
  return (
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  );
}

function ProviderRatingGroup() {
  const ratingGroup = useRatingGroup({ defaultValue: 3 });

  return (
    <RatingGroupRootProvider value={ratingGroup}>
      <RatingGroupLabel>Provider rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroupRootProvider>
  );
}

function ControlledRatingGroup() {
  const [value, setValue] = createSignal(2);

  return (
    <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
      <RatingGroupLabel>Controlled rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  );
}

test('submits through an explicit Ark hidden input', async () => {
  const { container } = render(() => (
    <form>
      <RatingGroup defaultValue={3} name="rating">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;
  const items = screen.getAllByRole('radio');
  const input = container.querySelector('input[hidden]');

  expect(input).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  fireEvent.click(items[4]);
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('5'));
});

test('preserves asChild composition with an explicit hidden input', () => {
  const { container } = render(() => (
    <RatingGroup
      asChild={(props) => <section {...props()} data-testid="rating-root" />}
      defaultValue={2}
    >
      <>
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </>
    </RatingGroup>
  ));

  const root = screen.getByTestId('rating-root');

  expect(root.tagName).toBe('SECTION');
  expect(root.querySelectorAll('input[hidden]')).toHaveLength(1);
  expect(container.querySelectorAll('[data-slot="rating-group-item"]')).toHaveLength(5);
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <RatingGroup
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      defaultValue={2}
    >
      <RatingItems />
    </RatingGroup>
  ));

  expect(rootRef).toBeUndefined();
});

test('preserves Ark callback details and controlled and provider paths', async () => {
  const changes: number[] = [];
  const { unmount } = render(() => (
    <RatingGroup defaultValue={2} onValueChange={(details) => changes.push(details.value)}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  ));

  fireEvent.click(screen.getAllByRole('radio')[3]);
  await waitFor(() => expect(changes).toEqual([4]));

  unmount();
  const controlled = render(() => <ControlledRatingGroup />);
  fireEvent.click(screen.getAllByRole('radio')[3]);
  await waitFor(() => {
    expect(screen.getAllByRole('radio')[3]).toHaveAttribute('aria-checked', 'true');
    expect(screen.getAllByRole('radio')[3]).toHaveAttribute('data-checked');
  });

  controlled.unmount();
  render(() => <ProviderRatingGroup />);
  await waitFor(() => {
    expect(screen.getAllByRole('radio')[2]).toHaveAttribute('aria-checked', 'true');
    expect(screen.getAllByRole('radio')[2]).toHaveAttribute('data-checked');
  });
});

test('keeps half-state and keyboard focus Ark-shaped', async () => {
  render(() => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  ));

  const items = screen.getAllByRole('radio');

  expect(items[3]).toHaveAttribute('data-half');
  items[2].focus();
  fireEvent.keyDown(items[2], { key: 'ArrowRight' });
  await waitFor(() => expect(document.activeElement).toBe(items[3]));
});

test('does not mark a mouse-selected item as focus-visible', () => {
  render(() => (
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  ));

  const item = screen.getAllByRole('radio')[2];
  fireEvent.click(item);

  expect(item).not.toHaveAttribute('data-focus-visible');
});

test('repeats custom indicators with Ark item state', () => {
  render(() => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator data-testid="custom-indicator">
            <span>Star</span>
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  ));

  const indicators = screen.getAllByTestId('custom-indicator');

  expect(indicators).toHaveLength(5);
  expect(indicators[2]).toHaveAttribute('data-highlighted');
  expect(indicators[3]).toHaveAttribute('data-half');
});

test('forwards refs and exposes stable slots on public parts', () => {
  let rootRef!: HTMLDivElement;
  let labelRef!: HTMLLabelElement;
  let controlRef!: HTMLDivElement;
  let itemRef!: HTMLSpanElement;
  let indicatorRef!: HTMLSpanElement;

  const { container } = render(() => (
    <RatingGroup ref={(element) => (rootRef = element)} defaultValue={3}>
      <RatingGroupLabel ref={(element) => (labelRef = element)}>Rating</RatingGroupLabel>
      <RatingGroupControl ref={(element) => (controlRef = element)}>
        <RatingGroupItem ref={(element) => (itemRef = element)} index={1}>
          <RatingGroupItemIndicator ref={(element) => (indicatorRef = element)} />
        </RatingGroupItem>
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'rating-group-root');
  expect(labelRef).toHaveAttribute('data-slot', 'rating-group-label');
  expect(controlRef).toHaveAttribute('data-slot', 'rating-group-control');
  expect(itemRef).toHaveAttribute('data-slot', 'rating-group-item');
  expect(indicatorRef).toHaveAttribute('data-slot', 'rating-group-item-indicator');
  expect(container.querySelector('input[hidden]')).toHaveAttribute('hidden');
});

test('applies native utilities to component-owned visual parts', () => {
  render(() => (
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Notifications</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  ));

  const root = screen.getByText('Notifications').parentElement!;
  const control = root.querySelector('[data-slot="rating-group-control"]')!;
  const item = root.querySelector('[data-slot="rating-group-item"]')!;
  const indicator = root.querySelector('[data-slot="rating-group-item-indicator"]')!;
  const backgroundIcon = root.querySelector('[data-slot="rating-group-item-indicator-bg"]')!;
  const foregroundIcon = root.querySelector('[data-slot="rating-group-item-indicator-fg"]')!;
  const label = screen.getByText('Notifications');

  expect(root).toHaveClass('inline-flex', 'flex-col', 'gap-1', 'text-muted-foreground');
  expect(label).toHaveClass('text-sm', 'font-semibold', 'select-none');
  expect(control).toHaveClass('inline-flex', 'items-center', 'gap-1');
  expect(item).toHaveClass('inline-flex', 'rounded-sm', 'outline-1', 'outline-transparent');
  expect(indicator).toHaveClass(
    'relative',
    'size-5',
    'text-primary',
    '[&>svg]:transition-[color,fill,stroke,clip-path]',
    '[&>svg]:duration-200',
    '[&>svg]:ease-in-out',
  );
  expect(backgroundIcon).toHaveClass('absolute', 'inset-0', 'size-full', 'fill-transparent');
  expect(foregroundIcon).toHaveClass(
    'absolute',
    'inset-0',
    'size-full',
    'fill-current',
    '[clip-path:inset(0_0_0_0)]',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <RatingGroup class="gap-3 text-primary" data-testid="root">
      <RatingGroupLabel>Notifications</RatingGroupLabel>
      <RatingGroupControl class="gap-3">
        <RatingGroupItems>
          <RatingGroupItemIndicator class="size-7 text-secondary" />
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  ));

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="rating-group-control"]')!;
  const indicator = root.querySelector('[data-slot="rating-group-item-indicator"]')!;

  expect(root).toHaveClass('gap-3', 'text-primary');
  expect(root).not.toHaveClass('gap-1', 'text-muted-foreground');
  expect(control).toHaveClass('gap-3');
  expect(control).not.toHaveClass('gap-1');
  expect(indicator).toHaveClass('size-7', 'text-secondary');
  expect(indicator).not.toHaveClass('size-5', 'text-primary');
});
