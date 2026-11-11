import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import NavigationMenuOverride from './NavigationMenuOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(NavigationMenuOverride);

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const trigger = screen.getByRole('button', { name: 'Products' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect([...root.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect([...list!.classList]).toEqual(expect.arrayContaining(['gap-4', 'p-2']));
  expect([...trigger.classList]).toEqual(
    expect.arrayContaining(['min-h-0', 'rounded-lg', 'px-6', 'text-lg']),
  );
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-w-md', 'py-0']));
  const triggerLocator = page.getByRole('button', { name: 'Products', exact: true });
  await expect.element(triggerLocator).toHaveCSS('min-height', '0px');
  await expect.element(triggerLocator).toHaveCSS('padding-left', '24px');
  await expect.element(triggerLocator).toHaveCSS('font-size', '18px');
  await expect.element(page.locator('[data-slot="navigation-menu-list"]')).toHaveCSS('gap', '16px');
});