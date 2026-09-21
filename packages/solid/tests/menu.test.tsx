import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Menu, useMenu, useMenuContext, useMenuItemContext, MenuRootProvider, MenuTrigger, MenuContextTrigger, MenuPositioner, MenuContent, MenuViewport, MenuArrow, MenuItem, MenuCheckboxItem, MenuItemIndicator, MenuItemText } from '../src';
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

function CheckboxMenu() {
  return (
    <Menu defaultOpen>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuCheckboxItem checked value="toolbar">
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
  render(() => <TestMenu />);

  const trigger = screen.getByRole('button', { name: 'Actions' });
  trigger.focus();

  expect(screen.getByRole('menu')).toBeVisible();

  fireEvent.keyDown(document.activeElement!, { key: 'Escape' });

  await waitFor(() => expect(trigger).toHaveFocus());
});

test('renders the controlled checked state for checkbox items', async () => {
  render(() => <CheckboxMenu />);

  const item = screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' });

  await waitFor(() => expect(item).toHaveAttribute('data-state', 'checked'));
  expect(screen.getByRole('menu')).toBeVisible();
});

test('preserves a custom content host with asChild', () => {
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

  expect(screen.getByRole('menu')).toHaveProperty('tagName', 'SECTION');
});

test('portals Positioner by default', () => {
  const { container } = render(() => <TestMenu />);

  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  expect(screen.getByRole('menu')).toBeVisible();
});

test('supports inline Positioner rendering', () => {
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

  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();
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

  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();

  setPortalled(true);

  await waitFor(() => expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull());
  expect(screen.getByRole('menu')).toBeVisible();
});

test('exposes the scroll viewport as an explicit part', () => {
  render(() => (
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

  const viewport = screen.getByRole('menu').firstElementChild;
  expect(viewport).toHaveAttribute('data-scope', 'menu');
  expect(viewport).toHaveAttribute('data-part', 'viewport');
  expect(viewport).toHaveAttribute('data-slot', 'menu-viewport');
  expect(viewport).toHaveClass(/viewport/);
});

test('preserves custom context trigger styling', () => {
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

  const content = screen.getByRole('menu');
  expect(content).toBeVisible();
  expect(content.firstElementChild).toHaveAttribute('data-slot', 'menu-arrow');
});

test('forwards refs through ordinary Ark Solid menu parts', () => {
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
});

test('does not forward refs through native Ark Solid asChild composition', () => {
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
  expect(screen.getByRole('menu')).toHaveProperty('tagName', 'SECTION');
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

  expect(screen.getByText('Open')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Checked')).toBeInTheDocument());
});

test('supports a custom portal mount', () => {
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

  expect(screen.getByTestId('portal')).toContainElement(screen.getByRole('menu'));
});
