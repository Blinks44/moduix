import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Button, Menu, useMenu, useMenuContext, useMenuItemContext } from '../src';

function TestMenu() {
  return (
    <Menu defaultOpen>
      <Menu.Trigger asChild>
        <Button>Actions</Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Viewport>
            <Menu.Item value="edit">Edit</Menu.Item>
            <Menu.CheckboxItem checked={false} value="toolbar">
              <Menu.ItemIndicator />
              <Menu.ItemText>Show toolbar</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Viewport>
            <Menu.CheckboxItem checked value="toolbar">
              <Menu.ItemIndicator />
              <Menu.ItemText>Show toolbar</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>,
  );
  const item = screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' });
  expect(item).toHaveAttribute('data-state', 'checked');
  expect(item).toHaveClass('grid-cols-[0.75rem_minmax(0,1fr)]');
});

test('preserves a custom content host with asChild', () => {
  render(
    <Menu defaultOpen>
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content asChild>
          <section aria-label="Actions">
            <Menu.Viewport>
              <Menu.Item value="edit">Edit</Menu.Item>
            </Menu.Viewport>
          </section>
        </Menu.Content>
      </Menu.Positioner>
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
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Viewport>
            <Menu.Item value="edit">Edit</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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
          <Menu.Trigger>Actions</Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Viewport>
                <Menu.Item value="edit">Edit</Menu.Item>
              </Menu.Viewport>
            </Menu.Content>
          </Menu.Positioner>
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
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Viewport>
            <Menu.Item value="edit">Edit</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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
      <Menu.ContextTrigger asChild>
        <button type="button">Open context menu</button>
      </Menu.ContextTrigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Arrow />
          <Menu.Viewport>
            <Menu.Item value="edit">Edit</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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
      <Menu.Trigger
        ref={(element) => {
          triggerRef = element;
        }}
      >
        Actions
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content
          ref={(element) => {
            contentRef = element;
          }}
        >
          <Menu.Viewport>
            <Menu.Item
              ref={(element) => {
                itemRef = element;
              }}
              value="edit"
            >
              Edit
            </Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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
      <Menu.RootProvider value={menu} portalled={false}>
        <MenuState />
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Viewport>
              <Menu.CheckboxItem checked value="toolbar">
                <Menu.ItemIndicator />
                <Menu.ItemText>
                  Show toolbar
                  <ItemState />
                </Menu.ItemText>
              </Menu.CheckboxItem>
            </Menu.Viewport>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.RootProvider>
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
      <Menu.Trigger>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Viewport>
            <Menu.Item value="edit">Edit</Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>,
  );
  expect(portalRef.current).toContainElement(screen.getByRole('menu'));
  portalRef.current.remove();
});

test('lets consumer classes override defaults and keeps empty visual parts visible', () => {
  render(
    <Menu defaultOpen portalled={false}>
      <Menu.Trigger className="bg-primary">Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="py-0">
          <Menu.Arrow className="[--arrow-size:1rem]" />
          <Menu.Viewport>
            <Menu.Item value="edit" tone="destructive" className="px-0 text-primary">
              Edit
            </Menu.Item>
            <Menu.RadioItemGroup value="radio">
              <Menu.RadioItem value="radio" indicator="end" className="grid-cols-1">
                <Menu.ItemIndicator />
                <Menu.ItemText>Radio</Menu.ItemText>
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
            <Menu.Separator className="h-0.5" />
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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