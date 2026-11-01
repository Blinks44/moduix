import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  Select,
  SelectIndicator,
  SelectTrigger,
  SelectValueText,
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarSeparator,
  SidebarTooltip,
  SidebarTrigger,
} from '@/index';

const components = {
  Select,
  SelectIndicator,
  SelectTrigger,
  SelectValueText,
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarSeparator,
  SidebarTooltip,
  SidebarTrigger,
} as unknown as Record<string, Component>;

test('uses native Tailwind defaults and merges consumer utilities last', async () => {
  const Harness = defineComponent({
    components,
    template: `
      <Sidebar class="h-64 bg-muted">
        <SidebarPanel class="p-6">
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarNavigationButton class="p-6">Overview</SidebarNavigationButton>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarPanel>
        <SidebarResizeTrigger class="w-2 min-w-2" />
        <SidebarTrigger class="size-8" />
        <SidebarInset />
      </Sidebar>
    `,
  });

  const { container } = render(Harness);
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