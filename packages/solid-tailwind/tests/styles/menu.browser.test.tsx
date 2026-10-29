import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import * as menuEntry from '@/components/menu';
import * as menuSource from '@/components/menu/Menu';
import {
  Button,
  Menu,
  useMenu,
  useMenuContext,
  useMenuItemContext,
  MenuRootProvider,
  MenuTrigger,
  MenuContextTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuArrow,
  MenuItem,
  MenuSeparator,
  MenuRadioItemGroup,
  MenuRadioItem,
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
} from '@/index';

function TestMenu() {
  return (
    <Menu defaultOpen>
      <MenuTrigger asChild={(props) => <Button {...props()} />}>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuCheckboxItem checked={false} value="toolbar">
              <MenuItemIndicator />
              <MenuItemText>Show toolbar</MenuItemText>
            </MenuCheckboxItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}

test('returns focus to the trigger after escape', async () => {
  const { container } = render(() => <TestMenu />);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(page.getByRole('button', { name: 'Actions' })).toBeFocused();
  await expect.element(menu).toHaveCount(0);
});

test('preserves a custom content host with asChild', async () => {
  render(() => (
    <Menu defaultOpen>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent asChild={(props) => <section {...props()} aria-label="Actions" />}>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ));
  await expect.element(page.getByRole('menu')).toHaveJSProperty('tagName', 'SECTION');
});

test('supports inline Positioner rendering', async () => {
  const { container } = render(() => (
    <Menu defaultOpen portalled={false}>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ));
  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);
});

test('preserves custom context trigger styling', async () => {
  render(() => (
    <Menu defaultOpen>
      <MenuContextTrigger asChild={(props) => <button {...props()} type="button" />}>
        Open context menu
      </MenuContextTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuArrow />
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ));
  await expect
    .element(page.getByRole('menu').locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-arrow');
});

test('preserves provider and item context composition', async () => {
  function MenuState() {
    const context = useMenuContext();
    return <output>{context().open ? 'Open' : 'Closed'}</output>;
  }
  function ItemState() {
    const context = useMenuItemContext();
    return <span>{context().checked ? 'Checked' : 'Unchecked'}</span>;
  }
  function ProviderMenu() {
    const menu = useMenu({ defaultOpen: true });
    return (
      <MenuRootProvider value={menu} portalled={false}>
        <MenuState />
        <MenuTrigger>Actions</MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuCheckboxItem checked value="toolbar">
                <MenuItemIndicator />
                <MenuItemText>
                  Show toolbar
                  <ItemState />
                </MenuItemText>
              </MenuCheckboxItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </MenuRootProvider>
    );
  }
  render(() => <ProviderMenu />);
  await expect.element(page.getByText('Open')).toBeAttached();
  await expect.element(page.getByText('Checked')).toBeAttached();
  await expect.element(page.getByRole('menuitemcheckbox')).toHaveAttribute('data-state', 'checked');
});

test('supports a custom portal mount', async () => {
  let portalRef!: HTMLDivElement;
  render(() => (
    <>
      <div
        ref={(element) => {
          portalRef = element;
        }}
        data-testid="portal"
      />
      <Menu defaultOpen portalRef={() => portalRef}>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </>
  ));
  expect(screen.getByTestId('portal')?.contains(screen.getByRole('menu'))).toBe(true);
});

test('keeps Tailwind recipes out of Menu entry points', async () => {
  expect('menuContentVariants' in menuEntry).toBe(false);
  expect('menuPositionerVariants' in menuEntry).toBe(false);
  expect('menuContentVariants' in menuSource).toBe(false);
  expect('menuPositionerVariants' in menuSource).toBe(false);
});

test('lets consumer classes override defaults and keeps empty visual parts visible', async () => {
  render(() => (
    <Menu defaultOpen portalled={false}>
      <MenuTrigger class="bg-primary">Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent class="py-0">
          <MenuArrow class="[--arrow-size:1rem]" />
          <MenuViewport>
            <MenuItem value="edit" tone="destructive" class="px-0 text-primary">
              Edit
            </MenuItem>
            <MenuRadioItemGroup value="radio">
              <MenuRadioItem value="radio" indicator="end" class="grid-cols-1">
                <MenuItemIndicator />
                <MenuItemText>Radio</MenuItemText>
              </MenuRadioItem>
            </MenuRadioItemGroup>
            <MenuSeparator class="h-0.5" />
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ));
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