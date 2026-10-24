import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { useState } from 'react';
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
  const [value, setValue] = useState(2);

  return (
    <RatingGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RatingGroupLabel>Controlled rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  );
}

test('submits through an explicit Ark hidden input', async () => {
  const changes: number[] = [];
  render(
    <form data-testid="form">
      <RatingGroup
        defaultValue={3}
        name="rating"
        onValueChange={(details) => changes.push(details.value)}
      >
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
    </form>,
  );

  const form = screen.getByTestId('form') as HTMLFormElement;

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  await page.getByRole('radio').nth(3).click();
  await expect.poll(() => changes).toEqual([4]);
  expect(new FormData(form).get('rating')).toBe('4');
  await page.getByRole('radio').nth(4).click();
  await expect.poll(() => new FormData(form).get('rating')).toBe('5');
  expect(changes).toEqual([4, 5]);
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

test('preserves controlled and provider paths', async () => {
  const { rerender } = render(<ControlledRatingGroup />);
  const items = page.getByRole('radio');
  await items.nth(3).click();
  await expect.element(items.nth(3)).toHaveAttribute('data-checked');
  rerender(<ProviderRatingGroup />);
  await expect.element(items.nth(2)).toHaveAttribute('data-checked');
});
test('preserves half steps, keyboard focus and mouse focus visibility', async () => {
  render(
    <>
      <button type="button">Before rating</button>
      <RatingGroup allowHalf defaultValue={3.5}>
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
    </>,
  );
  const items = page.getByRole('radio');
  const before = page.getByRole('button', { name: 'Before rating', exact: true });
  await expect.element(items.nth(3)).toHaveAttribute('data-half');
  await before.click();
  await before.press('Tab');
  await expect.element(items.nth(3)).toBeFocused();
  expect(document.activeElement?.matches(':focus-visible')).toBe(true);
  await items.nth(3).press('ArrowLeft');
  await expect.element(items.nth(2)).toBeFocused();
  await items.nth(2).press('ArrowRight');
  await expect.element(items.nth(3)).toBeFocused();
  await expect.element(items.nth(3)).toHaveAttribute('data-half');
  await items.nth(2).click();
  await expect.element(items.nth(2)).toBeFocused();
  expect(document.activeElement?.matches(':focus-visible')).toBe(false);
});
test('repeats custom indicators with Ark item state', async () => {
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
  await expect
    .element(page.getByTestId('custom-indicator').nth(2))
    .toHaveAttribute('data-highlighted');
  await expect.element(page.getByTestId('custom-indicator').nth(3)).toHaveAttribute('data-half');
});
test('colors the default filled star from the indicator color', () => {
  render(
    <RatingGroup defaultValue={1}>
      <RatingGroupControl>
        <RatingGroupItem index={1}>
          <RatingGroupItemIndicator style={{ color: 'rgb(255, 0, 0)' }} />
        </RatingGroupItem>
      </RatingGroupControl>
    </RatingGroup>,
  );

  const foregroundIcon = document.querySelector('[data-slot="rating-group-item-indicator-fg"]')!;

  expect(getComputedStyle(foregroundIcon).color).toBe('rgb(255, 0, 0)');
});

test('clips the default star for half and empty items', async () => {
  render(
    <RatingGroup allowHalf count={3} defaultValue={1.5}>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>,
  );

  const foregroundIcons = document.querySelectorAll('[data-slot="rating-group-item-indicator-fg"]');

  await expect
    .poll(() => getComputedStyle(foregroundIcons[1]!).clipPath)
    .toBe('inset(0px 50% 0px 0px)');
  expect(getComputedStyle(foregroundIcons[0]!).clipPath).toBe('inset(0px)');
  expect(getComputedStyle(foregroundIcons[2]!).clipPath).toBe('inset(0px 100% 0px 0px)');
});