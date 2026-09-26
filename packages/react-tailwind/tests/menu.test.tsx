import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
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

test('keeps Tailwind recipes out of Menu entry points', () => {
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

test('returns focus to the trigger after escape', () => {
  render(<TestMenu />);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  trigger.focus();
  fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
  expect(trigger).toHaveFocus();
});

test('renders the controlled checked state for checkbox items', () => {
  render(
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
    </Menu>,
  );
  const item = screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' });
  expect(item).toHaveAttribute('data-state', 'checked');
  expect(item).toHaveClass('grid-cols-[0.75rem_minmax(0,1fr)]');
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

test('reactively moves the Positioner into a portal', async () => {
  function ReactiveMenu() {
    const [portalled, setPortalled] = useState(false);
    return (
      <>
        <button onClick={() => setPortalled(true)}>Portal</button>
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
      </>
    );
  }
  const { container } = render(<ReactiveMenu />);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Portal' }));
  await waitFor(() => expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull());
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
  expect(viewport).toHaveClass('overflow-auto');
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
  expect(screen.getByRole('button', { name: 'Open context menu' }).className).toBe('');
  expect(screen.getByRole('menu').firstElementChild).toHaveAttribute('data-slot', 'menu-arrow');
});

test('forwards refs through ordinary menu parts', () => {
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

test('supports a custom portal mount', () => {
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
  expect(portalRef.current).toContainElement(screen.getByRole('menu'));
  portalRef.current.remove();
});

test('lets consumer classes override defaults and keeps empty visual parts visible', () => {
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
  expect(trigger).toHaveClass('bg-primary');
  expect(trigger).not.toHaveClass('bg-background');
  expect(content).toHaveClass('py-0');
  expect(content).not.toHaveClass('py-1');
  expect(item).toHaveClass('px-0');
  expect(item).not.toHaveClass('px-3');
  expect(item).toHaveClass('text-primary');
  expect(item).not.toHaveClass('text-destructive');
  expect(radioItem).toHaveClass('grid-cols-1');
  expect(radioItem).not.toHaveClass('grid-cols-[minmax(0,1fr)_0.75rem]');
  expect(separator).toHaveClass('h-0.5', 'bg-border');
  expect(arrow).toHaveClass('[--arrow-size:1rem]');
  expect(arrow?.firstElementChild).toHaveClass(
    '[border-block-start:1px_solid_var(--color-border)]',
  );
});