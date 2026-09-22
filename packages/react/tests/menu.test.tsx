import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
} from '../src';

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

function CheckboxMenu() {
  return (
    <Menu defaultOpen>
      <MenuTrigger asChild>
        <Button>Actions</Button>
      </MenuTrigger>
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

test('returns focus to the trigger after escape', () => {
  render(<TestMenu />);

  const trigger = screen.getByRole('button', { name: 'Actions' });
  trigger.focus();

  expect(screen.getByRole('menu')).toBeVisible();

  fireEvent.keyDown(document.activeElement!, { key: 'Escape' });

  expect(trigger).toHaveFocus();
});

test('renders the controlled checked state for checkbox items', () => {
  render(<CheckboxMenu />);

  const item = screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' });

  expect(item).toHaveAttribute('data-state', 'checked');
  expect(screen.getByRole('menu')).toBeVisible();
});

test('preserves a custom content host with asChild', () => {
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

  expect(screen.getByRole('menu')).toHaveProperty('tagName', 'SECTION');
});

test('portals Positioner by default', () => {
  const { container } = render(<TestMenu />);

  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  expect(screen.getByRole('menu')).toBeVisible();
});

test('supports inline Positioner rendering', () => {
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

  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();
});

test('preserves custom context trigger styling', () => {
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

  const trigger = screen.getByRole('button', { name: 'Open context menu' });
  expect(trigger.className).toBe('');

  const content = screen.getByRole('menu');
  expect(content).toBeVisible();
  expect(content.firstElementChild).toHaveAttribute('data-slot', 'menu-arrow');
});

test('exposes the scroll viewport as an explicit part', () => {
  render(
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

  const viewport = screen.getByRole('menu').firstElementChild;
  expect(viewport).toHaveAttribute('data-scope', 'menu');
  expect(viewport).toHaveAttribute('data-part', 'viewport');
  expect(viewport).toHaveAttribute('data-slot', 'menu-viewport');
  expect(viewport).toHaveClass(/viewport/);
});

test('forwards refs through menu parts', () => {
  const triggerRef = createRef<HTMLButtonElement>();
  const contentRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLDivElement>();

  render(
    <Menu defaultOpen portalled={false}>
      <MenuTrigger ref={triggerRef}>Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent ref={contentRef}>
          <MenuViewport>
            <MenuItem ref={itemRef} value="edit">
              Edit
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );

  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(contentRef.current).toBe(screen.getByRole('menu'));
  expect(itemRef.current).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
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

  expect(screen.getByText('Open')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Checked')).toBeInTheDocument());
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

  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();

  rerender(<PortalMenu portalled />);

  await waitFor(() => expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull());
  expect(screen.getByRole('menu')).toBeVisible();
});

test('supports a custom portal mount', () => {
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

  expect(screen.getByTestId('portal')).toContainElement(screen.getByRole('menu'));
});

test('applies consumer classes alongside component classes', () => {
  render(
    <Menu defaultOpen portalled={false}>
      <MenuTrigger className="consumer-trigger">Actions</MenuTrigger>
      <MenuPositioner>
        <MenuContent className="consumer-content">
          <MenuViewport>
            <MenuItem className="consumer-item" value="edit">
              Edit
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>,
  );

  expect(screen.getByRole('button', { name: 'Actions' })).toHaveClass(
    /trigger/,
    'consumer-trigger',
  );
  expect(screen.getByRole('menu')).toHaveClass(/content/, 'consumer-content');
  expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveClass(/item/, 'consumer-item');
});