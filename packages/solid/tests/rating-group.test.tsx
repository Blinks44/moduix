import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { RatingGroup, useRatingGroup } from '../src';

function RatingItems() {
  return (
    <RatingGroup.Control>
      <RatingGroup.Items />
    </RatingGroup.Control>
  );
}

function ProviderRatingGroup() {
  const ratingGroup = useRatingGroup({ defaultValue: 3 });

  return (
    <RatingGroup.RootProvider value={ratingGroup}>
      <RatingGroup.Label>Provider rating</RatingGroup.Label>
      <RatingItems />
    </RatingGroup.RootProvider>
  );
}

function ControlledRatingGroup() {
  const [value, setValue] = createSignal(2);

  return (
    <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
      <RatingGroup.Label>Controlled rating</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>
  );
}

test('renders one automatic input that submits and resets with the form', async () => {
  const { container } = render(() => (
    <form>
      <RatingGroup defaultValue={3} name="rating">
        <RatingGroup.Label>Rating</RatingGroup.Label>
        <RatingItems />
      </RatingGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;
  const items = screen.getAllByRole('radio');
  const input = container.querySelector('[data-slot="rating-group-hidden-input"]');

  expect(input).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  fireEvent.click(items[4]);
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('5'));

  form.reset();
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('3'));
});

test('preserves asChild composition while appending the automatic input', () => {
  const { container } = render(() => (
    <RatingGroup
      asChild={(props) => <section {...props()} data-testid="rating-root" />}
      defaultValue={2}
    >
      <>
        <RatingGroup.Label>Rating</RatingGroup.Label>
        <RatingItems />
      </>
    </RatingGroup>
  ));

  const root = screen.getByTestId('rating-root');

  expect(root.tagName).toBe('SECTION');
  expect(root.querySelectorAll('[data-slot="rating-group-hidden-input"]')).toHaveLength(1);
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
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>
  ));

  fireEvent.click(screen.getAllByRole('radio')[3]);
  await waitFor(() => expect(changes).toEqual([4]));

  unmount();
  const controlled = render(() => <ControlledRatingGroup />);
  fireEvent.click(screen.getAllByRole('radio')[3]);
  await waitFor(() =>
    expect(screen.getAllByRole('radio')[3]).toHaveAttribute('aria-checked', 'true'),
  );

  controlled.unmount();
  render(() => <ProviderRatingGroup />);
  await waitFor(() =>
    expect(screen.getAllByRole('radio')[2]).toHaveAttribute('aria-checked', 'true'),
  );
});

test('keeps half-state and keyboard focus Ark-shaped', async () => {
  render(() => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>
  ));

  const items = screen.getAllByRole('radio');

  expect(items[3]).toHaveAttribute('data-half');
  items[2].focus();
  fireEvent.keyDown(items[2], { key: 'ArrowRight' });
  await waitFor(() => expect(document.activeElement).toBe(items[3]));
});

test('repeats custom indicators with Ark item state', () => {
  render(() => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator data-testid="custom-indicator">
            <span>Star</span>
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
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
      <RatingGroup.Label ref={(element) => (labelRef = element)}>Rating</RatingGroup.Label>
      <RatingGroup.Control ref={(element) => (controlRef = element)}>
        <RatingGroup.Item ref={(element) => (itemRef = element)} index={1}>
          <RatingGroup.ItemIndicator ref={(element) => (indicatorRef = element)} />
        </RatingGroup.Item>
      </RatingGroup.Control>
    </RatingGroup>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'rating-group-root');
  expect(labelRef).toHaveAttribute('data-slot', 'rating-group-label');
  expect(controlRef).toHaveAttribute('data-slot', 'rating-group-control');
  expect(itemRef).toHaveAttribute('data-slot', 'rating-group-item');
  expect(indicatorRef).toHaveAttribute('data-slot', 'rating-group-item-indicator');
  expect(container.querySelector('[data-slot="rating-group-hidden-input"]')).toHaveAttribute(
    'data-slot',
    'rating-group-hidden-input',
  );
});