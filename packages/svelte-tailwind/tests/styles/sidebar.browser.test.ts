import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import SidebarOverride from './SidebarOverride.svelte';

test('uses native Tailwind defaults and merges consumer utilities last', async () => {
  const { container } = render(SidebarOverride);
  const root = container.querySelector('[data-slot="sidebar-root"]');
  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  expect([...root!.classList]).toEqual(expect.arrayContaining(['h-64', 'bg-muted']));
  expect([...document.querySelector('[data-slot="sidebar-trigger"]')!.classList]).toEqual(
    expect.arrayContaining(['size-8']),
  );
  await expect.element(trigger.locator('svg')).toBeVisible();
  await expect.element(trigger).toHaveCSS('width', '32px');
  await expect.element(page.locator('[data-slot="sidebar-panel"]')).toHaveCSS('padding', '24px');
});