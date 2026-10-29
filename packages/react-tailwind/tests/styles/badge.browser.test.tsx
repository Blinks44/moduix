import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Badge className="bg-secondary px-0 [a&]:hover:opacity-75" data-testid="badge">
      Ready
    </Badge>,
  );

  await expect.element(page.getByTestId('badge')).toHaveCount(1);
  await expect.element(page.getByTestId('badge')).toHaveCSS('padding', '0px');
});

test('lets a size utility on an icon override the default icon size', () => {
  render(
    <Badge>
      <svg aria-hidden="true" className="size-4" data-testid="icon" />
      New
    </Badge>,
  );

  expect(screen.getByTestId('icon').getBoundingClientRect().width).toBe(16);
});