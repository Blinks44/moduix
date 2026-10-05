import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
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
} from '../src';
import { Button } from '../src/components/button/Button';

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

test('reactively moves the Positioner into a portal', async () => {
  const [portalled, setPortalled] = createSignal(false);
  const { container } = render(() => (
    <Menu defaultOpen portalled={portalled()}>
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

  setPortalled(true);

  await expect.poll(() => container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  await expect.element(page.getByRole('menu')).toBeVisible();
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

  const trigger = screen.getByRole('button', { name: 'Open context menu' });
  expect(trigger.className).toBe('');

  await expect.element(page.getByRole('menu')).toBeVisible();
  await expect
    .element(page.getByRole('menu').locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-arrow');
});

test('forwards refs through ordinary Ark Solid menu parts', async () => {
  let triggerRef!: HTMLButtonElement;
  let contentRef!: HTMLDivElement;
  let itemRef!: HTMLDivElement;

  render(() => (
    <Menu defaultOpen portalled={false}>
      <MenuTrigger ref={(element) => (triggerRef = element)}>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent ref={(element) => (contentRef = element)}>
          <MenuViewport>
            <MenuItem ref={(element) => (itemRef = element)} value="edit">
              Edit
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ));

  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(contentRef).toBe(screen.getByRole('menu'));
  expect(itemRef).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  const viewport = page.locator('[data-slot="menu-viewport"]');
  await expect.element(viewport).toHaveAttribute('data-scope', 'menu');
  await expect.element(viewport).toHaveAttribute('data-part', 'viewport');
  await expect.element(viewport).toHaveCSS('overflow', 'auto');
});

test('does not forward refs through native Ark Solid asChild composition', async () => {
  let contentRef: HTMLElement | undefined;

  render(() => (
    <Menu defaultOpen portalled={false}>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent
          ref={(element) => (contentRef = element)}
          asChild={(props) => <section {...props()} />}
        >
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  ));

  expect(contentRef).toBeUndefined();
  await expect.element(page.getByRole('menu')).toHaveJSProperty('tagName', 'SECTION');
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
      <div ref={(element) => (portalRef = element)} data-testid="portal" />
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