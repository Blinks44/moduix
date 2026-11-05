import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildRatingGroup from './rating-group/AsChildRatingGroup.svelte';
import BoundRatingGroup from './rating-group/BoundRatingGroup.svelte';
import CustomIndicatorRatingGroup from './rating-group/CustomIndicatorRatingGroup.svelte';
import FormRatingGroup from './rating-group/FormRatingGroup.svelte';
import HalfRatingGroup from './rating-group/HalfRatingGroup.svelte';
import ProviderRatingGroup from './rating-group/ProviderRatingGroup.svelte';

test('submits through an explicit Ark hidden input', async () => {
  render(FormRatingGroup);

  const form = screen.getByTestId('form') as HTMLFormElement;
  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');
  await page.getByRole('radio').nth(4).click();
  await expect.poll(() => new FormData(form).get('rating')).toBe('5');
});

test('preserves semantic hosts and refs with asChild', async () => {
  const { component } = render(AsChildRatingGroup);

  const root = screen.getByRole('region', { name: 'Rating section' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Rating section', exact: true }))
    .toHaveAttribute('data-slot', 'rating-group-root');
  expect(component.getRootRef()).toBe(root);
  expect(root.querySelectorAll('input[hidden]')).toHaveLength(1);
  expect(root.querySelectorAll('[data-slot="rating-group-item"]')).toHaveLength(5);
});

test('supports bind:value and preserves Ark callback details', async () => {
  const details: number[] = [];
  render(BoundRatingGroup, { props: { details } });

  await page.getByRole('radio').nth(3).click();
  await expect.element(page.getByText('Current value: 4')).toBeAttached();
  expect(details).toEqual([4]);
});

test('preserves half steps, keyboard focus and mouse focus visibility', async () => {
  render(HalfRatingGroup);

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
  render(CustomIndicatorRatingGroup);

  const indicators = screen.getAllByTestId('custom-indicator');
  expect(indicators).toHaveLength(5);
  await expect
    .element(page.getByTestId('custom-indicator').nth(2))
    .toHaveAttribute('data-highlighted');
  await expect.element(page.getByTestId('custom-indicator').nth(3)).toHaveAttribute('data-half');
});

test('keeps provider, context, and item hooks connected', async () => {
  render(ProviderRatingGroup);

  await expect.element(page.getByText('Value 3')).toBeAttached();
  await expect.element(page.getByText('Item highlighted')).toBeAttached();
  await page.getByRole('button', { name: 'Set five', exact: true }).click();
  await expect.element(page.getByText('Value 5')).toBeAttached();
});