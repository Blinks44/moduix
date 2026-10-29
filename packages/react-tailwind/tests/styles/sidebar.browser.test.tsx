import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarNavigationButton,
} from '@/index';

test('uses native Tailwind defaults and merges consumer utilities last', async () => {
  const { container } = render(
    <Sidebar className="h-64 bg-muted">
      <SidebarPanel className="p-6">
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton className="p-6">Overview</SidebarNavigationButton>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger className="w-2 min-w-2" />
      <SidebarTrigger className="size-8" />
      <SidebarInset />
    </Sidebar>,
  );

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