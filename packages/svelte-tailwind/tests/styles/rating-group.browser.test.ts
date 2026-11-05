import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import RefsRatingGroup from '../../../svelte/tests/rating-group/RefsRatingGroup.svelte';
import RatingGroupOverride from './RatingGroupOverride.svelte';

test('preserves Ark semantics, Svelte refs, anatomy, attrs, and moduix hooks', async () => {
  const { component } = render(RefsRatingGroup);
  const refs = component.getRefs();

  const root = refs.root as HTMLElement;
  const item = screen.getByRole('radio');
  const indicator = item.querySelector('[data-slot="rating-group-item-indicator"]')!;
  expect(root.getAttribute('data-slot')).toBe('rating-group-root');
  expect(root.getAttribute('data-scope')).toBe('rating-group');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.getAttribute('data-size')).toBe('md');
  expect(refs.label?.getAttribute('data-slot')).toBe('rating-group-label');
  expect(refs.control?.getAttribute('data-slot')).toBe('rating-group-control');
  expect(refs.item).toBe(item);
  await expect.element(page.getByRole('radio')).toHaveAttribute('aria-setsize', '5');
  expect(indicator.getAttribute('data-slot')).toBe('rating-group-item-indicator');
  expect(root.querySelector('input[hidden]')?.isConnected).toBe(true);
});

test('applies native utilities and lets consumer classes win', async () => {
  render(RatingGroupOverride);

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="rating-group-control"]')!;
  const indicator = root.querySelector('[data-slot="rating-group-item-indicator"]')!;
  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-3', 'text-primary']));
  expect([...control.classList]).toEqual(expect.arrayContaining(['gap-3']));
  expect([...indicator.classList]).toEqual(expect.arrayContaining(['size-7', 'text-secondary']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '12px');
  await expect.element(page.locator('[data-slot="rating-group-control"]')).toHaveCSS('gap', '12px');
  await expect
    .element(page.locator('[data-slot="rating-group-item-indicator"]').nth(0))
    .toHaveCSS('width', '28px');
});