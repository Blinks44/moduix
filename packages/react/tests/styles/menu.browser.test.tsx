import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
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
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
} from '@/index';

function TestMenu() {
  return (
    <Menu defaultOpen>
      <MenuTrigger asChild>
        <Button>Actions</Button>
      </MenuTrigger>
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
  const { container } = render(<TestMenu />);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(menu).toBeFocused();
  await menu.press('Escape');

  await expect.element(page.getByRole('button', { name: 'Actions' })).toBeFocused();
  await expect.element(menu).toHaveCount(0);
});

test('preserves a custom content host with asChild', async () => {
  render(
    <Menu defaultOpen>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent asChild>
          <section aria-label="Actions">
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
            </MenuViewport>
          </section>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );

  await expect.element(page.getByRole('menu')).toHaveJSProperty('tagName', 'SECTION');
});

test('supports inline Positioner rendering', async () => {
  const { container } = render(
    <Menu defaultOpen portalled={false}>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );

  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);
});

test('preserves custom context trigger styling', async () => {
  render(
    <Menu defaultOpen>
      <MenuContextTrigger asChild>
        <button type="button">Open context menu</button>
      </MenuContextTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuArrow />
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );

  await expect.element(page.getByRole('menu')).toBeVisible();
  await expect
    .element(page.getByRole('menu').locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-arrow');
});

test('preserves provider and item context composition', async () => {
  function MenuState() {
    const context = useMenuContext();
    return <output>{context.open ? 'Open' : 'Closed'}</output>;
  }

  function ItemState() {
    const context = useMenuItemContext();
    return <span>{context.checked ? 'Checked' : 'Unchecked'}</span>;
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

  render(<ProviderMenu />);

  await expect.element(page.getByText('Open')).toBeAttached();
  await expect.element(page.getByText('Checked')).toBeAttached();
  await expect.element(page.getByRole('menuitemcheckbox')).toHaveAttribute('data-state', 'checked');
});

test('supports a custom portal mount', async () => {
  const portalRef = createRef<HTMLDivElement>();

  render(
    <>
      <div ref={portalRef} data-testid="portal" />
      <Menu defaultOpen portalRef={portalRef}>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </>,
  );

  expect(screen.getByTestId('portal')?.contains(screen.getByRole('menu'))).toBe(true);
});