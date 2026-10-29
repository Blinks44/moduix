import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@/index';

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

test('mounts content on first open and removes it after close', async () => {
  const { container } = render(() => (
    <Menu portalled={false}>
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

  expect(container.querySelector('[data-slot="menu-content"]')).toBeNull();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.element(page.getByRole('menu')).toBeVisible();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.poll(() => container.querySelector('[data-slot="menu-content"]')).toBeNull();
});

test('forwards refs through ordinary menu parts', async () => {
  let triggerRef!: HTMLButtonElement;
  let contentRef!: HTMLDivElement;
  let itemRef!: HTMLDivElement;
  render(() => (
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
    </Menu>
  ));
  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(contentRef).toBe(screen.getByRole('menu'));
  expect(itemRef).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  const viewport = page.locator('[data-slot="menu-viewport"]');
  await expect.element(viewport).toHaveAttribute('data-scope', 'menu');
  await expect.element(viewport).toHaveAttribute('data-part', 'viewport');
});