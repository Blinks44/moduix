import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
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
  const [value, setValue] = useState(2);

  return (
    <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RatingGroup.Label>Controlled rating</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>
  );
}

test('renders one automatic input that submits and resets with the form', async () => {
  render(
    <form data-testid="form">
      <RatingGroup defaultValue={3} name="rating">
        <RatingGroup.Label>Rating</RatingGroup.Label>
        <RatingItems />
      </RatingGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;
  const items = screen.getAllByRole('radio');
  const input = document.querySelector('[data-slot="rating-group-hidden-input"]');

  expect(input).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  fireEvent.click(items[4]);
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('5'));

  form.reset();
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('3'));
});

test('preserves asChild composition while appending the automatic input', () => {
  render(
    <RatingGroup asChild defaultValue={2}>
      <section data-testid="rating-root">
        <RatingGroup.Label>Rating</RatingGroup.Label>
        <RatingItems />
      </section>
    </RatingGroup>,
  );

  const root = screen.getByTestId('rating-root');

  expect(root.tagName).toBe('SECTION');
  expect(root.querySelectorAll('[data-slot="rating-group-hidden-input"]')).toHaveLength(1);
});

test('preserves Ark callback details and controlled and provider paths', async () => {
  const changes: number[] = [];
  const { rerender } = render(
    <RatingGroup defaultValue={2} onValueChange={(details) => changes.push(details.value)}>
      <RatingGroup.Label>Rating</RatingGroup.Label>
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
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>,
  );

  const items = screen.getAllByRole('radio');

  expect(items[3]).toHaveAttribute('data-half');
  items[2].focus();
  fireEvent.keyDown(items[2], { key: 'ArrowRight' });
  await waitFor(() => expect(document.activeElement).toBe(items[3]));
});

test('repeats custom indicators with Ark item state', () => {
  render(
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Rating</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator data-testid="custom-indicator">
            <span>Star</span>
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
    </RatingGroup>,
  );

  const indicators = screen.getAllByTestId('custom-indicator');

  expect(indicators).toHaveLength(5);
  expect(indicators[2]).toHaveAttribute('data-highlighted');
  expect(indicators[3]).toHaveAttribute('data-half');
});