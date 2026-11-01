import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
} from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
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

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-3', 'text-primary']));
  expect([...control.classList]).toEqual(expect.arrayContaining(['gap-3']));
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-7', 'text-secondary']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '12px');
  await expect.element(page.locator('[data-slot="rating-group-control"]')).toHaveCSS('gap', '12px');
  await expect
    .element(page.locator('[data-slot="rating-group-item-indicator"]').nth(0))
    .toHaveCSS('width', '28px');
});