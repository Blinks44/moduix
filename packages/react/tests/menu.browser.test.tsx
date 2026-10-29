import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@/index';

test('forwards refs through menu parts', async () => {
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
  const viewport = page.locator('[data-slot="menu-viewport"]');
  await expect.element(viewport).toHaveAttribute('data-scope', 'menu');
  await expect.element(viewport).toHaveAttribute('data-part', 'viewport');
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

test('applies consumer classes alongside component classes', async () => {
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

  expect(screen.getByRole('button', { name: 'Actions' }).className).toBe('consumer-trigger');
  expect(screen.getByRole('menu')?.classList.contains('consumer-content')).toBe(true);
  expect(screen.getByRole('menuitem', { name: 'Edit' })?.classList.contains('consumer-item')).toBe(
    true,
  );
});

test('mounts content on first open and removes it after close', async () => {
  const { container } = render(
    <Menu portalled={false}>
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

  expect(container.querySelector('[data-slot="menu-content"]')).toBeNull();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.element(page.getByRole('menu')).toBeVisible();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.poll(() => container.querySelector('[data-slot="menu-content"]')).toBeNull();
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
});