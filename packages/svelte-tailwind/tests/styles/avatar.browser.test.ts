import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AvatarOverride from './AvatarOverride.svelte';

test('merges consumer Tailwind classes after component defaults', async () => {
  render(AvatarOverride);
  const root = screen.getByText('AT').closest('[data-slot="avatar-root"]') as HTMLElement;

  expect([...root.classList]).toEqual(expect.arrayContaining(['rounded-none', 'bg-primary']));
  await expect.element(page.locator('[data-slot="avatar-root"]')).toHaveCSS('border-radius', '0px');
  await expect.element(page.locator('[data-slot="avatar-root"]')).toHaveCSS('width', '48px');
  await expect.element(page.locator('[data-slot="avatar-root"]')).toHaveCSS('height', '48px');
});