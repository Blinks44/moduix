import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarFallback } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Avatar className="size-control-xl bg-primary" data-testid="avatar">
      <AvatarFallback>AT</AvatarFallback>
    </Avatar>,
  );

  const root = screen.getByTestId('avatar');
  expect([...root.classList]).toEqual(expect.arrayContaining(['bg-primary']));
  expect([...root.classList]).toEqual(expect.arrayContaining(['size-control-xl']));
  await expect.element(page.getByTestId('avatar')).toHaveCSS('width', '48px');
  await expect.element(page.getByTestId('avatar')).toHaveCSS('height', '48px');
});