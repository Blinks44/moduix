import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import * as menuEntry from '@/components/menu';
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContext,
  MenuContextTrigger,
  MenuContent,
  MenuItem,
  MenuItemContext,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRootProvider,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  MenuViewport,
  MenuTriggerItemIcon,
} from '@/index';

const menuComponents = {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContext,
  MenuContextTrigger,
  MenuContent,
  MenuItem,
  MenuItemContext,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRootProvider,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuViewport,
};

test('keeps Tailwind recipes out of the public Menu entry point', async () => {
  expect('menuContentVariants' in menuEntry).toBe(false);
  expect('menuPositionerVariants' in menuEntry).toBe(false);
  expect('menuItemStyles' in menuEntry).toBe(false);
});

test('lets consumer classes override defaults and keeps empty visual parts visible', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger class="bg-primary">Actions</MenuTrigger><MenuPositioner><MenuContent class="py-0"><MenuArrow class="[--arrow-size:1rem]" /><MenuViewport><MenuItem value="edit" tone="destructive" class="px-0 text-primary">Edit</MenuItem><MenuRadioItemGroup model-value="radio"><MenuRadioItem value="radio" indicator="end" class="grid-cols-1"><MenuItemIndicator /><MenuItemText>Radio</MenuItemText></MenuRadioItem></MenuRadioItemGroup><MenuSeparator class="h-0.5" /></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  const content = screen.getByRole('menu');
  const item = screen.getByRole('menuitem', { name: 'Edit' });
  const radioItem = screen.getByRole('menuitemradio', { name: 'Radio' });
  const separator = content.querySelector('[data-slot="menu-separator"]');
  const arrow = content.querySelector('[data-slot="menu-arrow"]');
  expect(trigger.className).toBe('bg-primary');
  expect(content?.classList.contains('py-0')).toBe(true);
  await expect.element(page.getByRole('menu')).toHaveCSS('padding-top', '0px');
  await expect.element(page.getByRole('menu')).toHaveCSS('padding-bottom', '0px');
  expect(item?.classList.contains('px-0')).toBe(true);
  await expect
    .element(page.getByRole('menuitem', { name: 'Edit' }))
    .toHaveCSS('padding-left', '0px');
  expect(item?.classList.contains('text-primary')).toBe(true);
  expect(radioItem?.classList.contains('grid-cols-1')).toBe(true);
  expect(separator?.classList.contains('h-0.5')).toBe(true);
  await expect.element(page.locator('[data-slot="menu-separator"]')).toHaveCSS('height', '2px');
  expect(arrow?.classList.contains('[--arrow-size:1rem]')).toBe(true);
});