import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarRootProvider,
} from '@/index';

const avatarComponents = {
  Avatar,
  AvatarContext,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarRootProvider,
};

test('merges consumer Tailwind classes after component defaults', async () => {
  render({
    components: avatarComponents,
    template:
      '<Avatar class="size-control-xl rounded-none bg-primary"><AvatarFallback>AT</AvatarFallback></Avatar>',
  });
  const root = screen.getByText('AT').closest('[data-slot="avatar-root"]') as HTMLElement;

  expect([...root.classList]).toEqual(expect.arrayContaining(['rounded-none', 'bg-primary']));
  await expect.element(page.locator('[data-slot="avatar-root"]')).toHaveCSS('border-radius', '0px');
  await expect.element(page.locator('[data-slot="avatar-root"]')).toHaveCSS('width', '48px');
  await expect.element(page.locator('[data-slot="avatar-root"]')).toHaveCSS('height', '48px');
});