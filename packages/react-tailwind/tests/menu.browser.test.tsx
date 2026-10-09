import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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
} from '../src';
import * as menuEntry from '../src/components/menu';
import * as menuSource from '../src/components/menu/Menu';

test('keeps Tailwind recipes out of Menu entry points', async () => {
  expect('menuContentVariants' in menuEntry).toBe(false);
  expect('menuPositionerVariants' in menuEntry).toBe(false);
  expect('menuContentVariants' in menuSource).toBe(false);
  expect('menuPositionerVariants' in menuSource).toBe(false);
});

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

test('reactively moves the Positioner into a portal', async () => {
  function PortalMenu({ portalled }: { portalled: boolean }) {
    return (
      <Menu defaultOpen portalled={portalled}>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    );
  }

  const { rerender, container } = render(<PortalMenu portalled={false} />);

  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);

  rerender(<PortalMenu portalled />);

  await expect.poll(() => container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  await expect.element(page.getByRole('menu')).toBeVisible();
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
  expect(screen.getByRole('button', { name: 'Open context menu' }).className).toBe('');
  await expect
    .element(page.getByRole('menu').locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-arrow');
});

test('forwards refs through ordinary menu parts', async () => {
  let triggerRef: HTMLButtonElement | null = null;
  let contentRef: HTMLDivElement | null = null;
  let itemRef: HTMLDivElement | null = null;
  render(
    <Menu defaultOpen portalled={false}>
      <MenuTrigger
        ref={(element) => {
          triggerRef = element;
        }}
      >
        Actions
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent
          ref={(element) => {
            contentRef = element;
          }}
        >
          <MenuViewport>
            <MenuItem
              ref={(element) => {
                itemRef = element;
              }}
              value="edit"
            >
              Edit
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );
  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(contentRef).toBe(screen.getByRole('menu'));
  expect(itemRef).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  const viewport = page.locator('[data-slot="menu-viewport"]');
  await expect.element(viewport).toHaveAttribute('data-scope', 'menu');
  await expect.element(viewport).toHaveAttribute('data-part', 'viewport');
  await expect.element(viewport).toHaveCSS('overflow', 'auto');
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

  expect(
    screen.getByRole('menuitemcheckbox').classList.contains('grid-cols-[0.75rem_minmax(0,1fr)]'),
  ).toBe(true);
});

test('supports a custom portal mount', async () => {
  const portalRef = { current: document.createElement('div') };
  document.body.append(portalRef.current);
  render(
    <Menu defaultOpen portalRef={portalRef}>
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
  expect(portalRef.current?.contains(screen.getByRole('menu'))).toBe(true);
  portalRef.current.remove();
});

test('lets consumer classes override defaults and keeps empty visual parts visible', async () => {
  render(
    <Menu defaultOpen portalled={false}>
      <MenuTrigger className="bg-primary">Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent className="py-0">
          <MenuArrow className="[--arrow-size:1rem]" />
          <MenuViewport>
            <MenuItem value="edit" tone="destructive" className="px-0 text-primary">
              Edit
            </MenuItem>
            <MenuRadioItemGroup value="radio">
              <MenuRadioItem value="radio" indicator="end" className="grid-cols-1">
                <MenuItemIndicator />
                <MenuItemText>Radio</MenuItemText>
              </MenuRadioItem>
            </MenuRadioItemGroup>
            <MenuSeparator className="h-0.5" />
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );
  const trigger = screen.getByRole('button', { name: 'Actions' });
  const content = screen.getByRole('menu');
  const item = screen.getByRole('menuitem', { name: 'Edit' });
  const radioItem = screen.getByRole('menuitemradio', { name: 'Radio' });
  const separator = content.querySelector('[data-slot="menu-separator"]');
  const arrow = content.querySelector('[data-slot="menu-arrow"]');
  expect(trigger?.classList.contains('bg-primary')).toBe(true);
  expect(trigger?.classList.contains('bg-background')).toBe(false);
  expect(content?.classList.contains('py-0')).toBe(true);
  await expect.element(page.getByRole('menu')).toHaveCSS('padding-top', '0px');
  await expect.element(page.getByRole('menu')).toHaveCSS('padding-bottom', '0px');
  expect(content?.classList.contains('py-1')).toBe(false);
  expect(item?.classList.contains('px-0')).toBe(true);
  await expect
    .element(page.getByRole('menuitem', { name: 'Edit' }))
    .toHaveCSS('padding-left', '0px');
  expect(item?.classList.contains('px-3')).toBe(false);
  expect(item?.classList.contains('text-primary')).toBe(true);
  expect(item?.classList.contains('text-destructive')).toBe(false);
  expect(radioItem?.classList.contains('grid-cols-1')).toBe(true);
  expect(radioItem?.classList.contains('grid-cols-[minmax(0,1fr)_0.75rem]')).toBe(false);
  expect(separator?.classList.contains('h-0.5')).toBe(true);
  await expect.element(page.locator('[data-slot="menu-separator"]')).toHaveCSS('height', '2px');
  expect(separator?.classList.contains('bg-border')).toBe(true);
  expect(arrow?.classList.contains('[--arrow-size:1rem]')).toBe(true);
  expect(
    arrow?.firstElementChild?.classList.contains(
      '[border-block-start:1px_solid_var(--color-border)]',
    ),
  ).toBe(true);
});