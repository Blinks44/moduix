import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
  MenuTriggerItemIcon,
  MenuViewport,
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

test('applies consumer classes alongside CSS Module defaults', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger class="consumer-trigger">Actions</MenuTrigger><MenuPositioner><MenuContent class="consumer-content"><MenuViewport><MenuItem class="consumer-item" value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  const content = screen.getByRole('menu');
  const item = screen.getByRole('menuitem', { name: 'Edit' });
  expect(trigger.className).toBe('consumer-trigger');
  expect(content?.classList.contains('consumer-content')).toBe(true);
  expect(item?.classList.contains('consumer-item')).toBe(true);
});