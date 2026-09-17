import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
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

function CheckboxMenu() {
  return (
    <Menu defaultOpen>
      <Menu.Trigger asChild>
        <Button>Actions</Button>
      </Menu.Trigger>
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

  const trigger = screen.getByRole('button', { name: 'Open context menu' });
  expect(trigger.className).toBe('');

  const content = screen.getByRole('menu');
  expect(content).toBeVisible();
  expect(content.firstElementChild).toHaveAttribute('data-slot', 'menu-arrow');
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
  expect(viewport).toHaveClass(/viewport/);
});

test('forwards refs through menu parts', () => {
  const triggerRef = createRef<HTMLButtonElement>();
  const contentRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLDivElement>();

  render(
    <Menu defaultOpen portalled={false}>
      <Menu.Trigger ref={triggerRef}>Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content ref={contentRef}>
          <Menu.Viewport>
            <Menu.Item ref={itemRef} value="edit">
              Edit
            </Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
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

test('reactively moves the Positioner into a portal', async () => {
  function PortalMenu({ portalled }: { portalled: boolean }) {
    return (
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
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Viewport>
              <Menu.Item value="edit">Edit</Menu.Item>
            </Menu.Viewport>
          </Menu.Content>
        </Menu.Positioner>
      </Menu>
    </>,
  );

  expect(screen.getByTestId('portal')).toContainElement(screen.getByRole('menu'));
});

test('applies consumer classes alongside component classes', () => {
  render(
    <Menu defaultOpen portalled={false}>
      <Menu.Trigger className="consumer-trigger">Actions</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className="consumer-content">
          <Menu.Viewport>
            <Menu.Item className="consumer-item" value="edit">
              Edit
            </Menu.Item>
          </Menu.Viewport>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>,
  );

  expect(screen.getByRole('button', { name: 'Actions' })).toHaveClass(
    /trigger/,
    'consumer-trigger',
  );
  expect(screen.getByRole('menu')).toHaveClass(/content/, 'consumer-content');
  expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveClass(/item/, 'consumer-item');
});