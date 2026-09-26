import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
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
  const [value, setValue] = useState(2);

  return (
    <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RatingGroupLabel>Controlled rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  );
}

test('submits through an explicit Ark hidden input', async () => {
  render(
    <form data-testid="form">
      <RatingGroup defaultValue={3} name="rating">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const items = screen.getAllByRole('radio');
  const input = document.querySelector('input[hidden]');

  expect(input).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  fireEvent.click(items[4]);
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('5'));
});

test('preserves asChild composition with an explicit hidden input', () => {
  render(
    <RatingGroup asChild defaultValue={2}>
      <section data-testid="rating-root">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </section>
    </RatingGroup>,
  );

  const root = screen.getByTestId('rating-root');

  expect(root.tagName).toBe('SECTION');
  expect(root.querySelectorAll('input[hidden]')).toHaveLength(1);
});

test('preserves Ark callback details and controlled and provider paths', async () => {
  const changes: number[] = [];
  const { rerender } = render(
    <RatingGroup defaultValue={2} onValueChange={(details) => changes.push(details.value)}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>,
  );

  fireEvent.click(screen.getAllByRole('radio')[3]);
  await waitFor(() => expect(changes).toEqual([4]));

  rerender(<ControlledRatingGroup />);
  fireEvent.click(screen.getAllByRole('radio')[3]);
  await waitFor(() => expect(screen.getAllByRole('radio')[3]).toHaveAttribute('data-checked'));

  rerender(<ProviderRatingGroup />);
  expect(screen.getAllByRole('radio')[2]).toHaveAttribute('data-checked');
});

test('keeps half-state and keyboard focus Ark-shaped', async () => {
  render(
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>,
  );

  const items = screen.getAllByRole('radio');

  expect(items[3]).toHaveAttribute('data-half');
  items[2].focus();
  fireEvent.keyDown(items[2], { key: 'ArrowRight' });
  await waitFor(() => expect(document.activeElement).toBe(items[3]));
});

test('does not mark a mouse-selected item as focus-visible', () => {
  render(
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>,
  );

  const item = screen.getAllByRole('radio')[2];

  fireEvent.click(item);

  expect(item).not.toHaveAttribute('data-focus-visible');
});

test('repeats custom indicators with Ark item state', () => {
  render(
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator data-testid="custom-indicator">
            <span>Star</span>
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>,
  );

  const indicators = screen.getAllByTestId('custom-indicator');

  expect(indicators).toHaveLength(5);
  expect(indicators[2]).toHaveAttribute('data-highlighted');
  expect(indicators[3]).toHaveAttribute('data-half');
});