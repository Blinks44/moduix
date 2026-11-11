import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ActionsMenu from './menu/ActionsMenu.svelte';
import AsChildContentMenu from './menu/AsChildContentMenu.svelte';
import CheckboxMenu from './menu/CheckboxMenu.svelte';
import ContextTriggerMenu from './menu/ContextTriggerMenu.svelte';
import NestedMenu from './menu/NestedMenu.svelte';
import PortalRefMenu from './menu/PortalRefMenu.svelte';
import ProviderMenu from './menu/ProviderMenu.svelte';
import ProviderPortalMenu from './menu/ProviderPortalMenu.svelte';
import RadioMenu from './menu/RadioMenu.svelte';
import RefsMenu from './menu/RefsMenu.svelte';
import SimpleMenu from './menu/SimpleMenu.svelte';

test('returns focus to the trigger after escape', async () => {
  const { container } = render(ActionsMenu);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(page.getByRole('button', { name: 'Actions' })).toBeFocused();
  await expect.element(menu).toHaveCount(0);
});

test('preserves a custom content host with asChild', async () => {
  render(AsChildContentMenu);
  await expect.element(page.getByRole('menu')).toHaveJSProperty('tagName', 'SECTION');
});

test.each([undefined, false, true])(
  'preserves RootProvider portal defaults with portalled=%s',
  async (portalled) => {
    const { container } = render(ProviderPortalMenu, {
      props: { providerProps: portalled === undefined ? {} : { portalled } },
    });
    const positioner = container.querySelector('[data-slot="menu-positioner"]');
    if (portalled === false) expect(positioner?.isConnected ?? false).toBe(true);
    else expect(positioner).toBeNull();
    await expect.element(page.getByRole('menu')).toBeVisible();
  },
);

test('supports inline Positioner rendering', async () => {
  const { container } = render(SimpleMenu, { props: { defaultOpen: true, portalled: false } });
  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);
});

test('opens a nested menu from its trigger item', async () => {
  render(NestedMenu);
  await page.getByRole('menuitem', { name: 'Add to Playlist' }).click();
  await expect.element(page.getByRole('menuitem', { name: 'Get Up!' })).toBeVisible();
});

test('preserves custom context trigger styling', async () => {
  render(ContextTriggerMenu, { props: { styled: true } });
  await expect.element(page.getByRole('menu')).toBeVisible();
  await expect
    .element(page.getByRole('menu').locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-arrow');
});

test('preserves component refs through ordinary menu parts', async () => {
  const { component } = render(RefsMenu);
  const refs = component.getRefs();
  expect(refs.trigger).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(refs.content).toBe(screen.getByRole('menu'));
  expect(refs.item).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  const viewport = page.locator('[data-slot="menu-viewport"]');
  await expect.element(viewport).toHaveAttribute('data-scope', 'menu');
  await expect.element(viewport).toHaveAttribute('data-part', 'viewport');
});

test('preserves provider and item context composition', async () => {
  render(ProviderMenu);
  await expect.element(page.getByText('Open', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Open slot')).toBeAttached();
  await expect.element(page.getByText('Checked', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Checked slot')).toBeAttached();
  await expect.element(page.getByRole('menuitemcheckbox')).toHaveAttribute('data-state', 'checked');
});

test('reactively moves the Positioner into a portal', async () => {
  const { container, rerender } = render(SimpleMenu, {
    props: { defaultOpen: true, portalled: false },
  });
  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);
  await rerender({ portalled: true });
  await expect.poll(() => container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  await expect.element(page.getByRole('menu')).toBeVisible();
});

test('supports a custom portal mount', async () => {
  render(PortalRefMenu);
  await expect.element(page.getByTestId('portal').getByRole('menu')).toBeAttached();
});

test('supports controlled open state and forwards each Ark event once', async () => {
  const openChanges: boolean[] = [];
  render(SimpleMenu, {
    props: { portalled: false, onOpenChange: (details) => openChanges.push(details.open) },
  });
  await expect.element(page.getByText('Closed')).toBeAttached();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.element(page.getByText('Open', { exact: true })).toBeAttached();
  expect(openChanges).toEqual([true]);
});

test('forwards selection details from the menu root', async () => {
  const selections: string[] = [];
  render(SimpleMenu, {
    props: {
      defaultOpen: true,
      portalled: false,
      onSelect: (details) => selections.push(details.value),
    },
  });
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect.poll(() => selections).toEqual(['edit']);
});

test('supports bind:checked for checkbox items', async () => {
  render(CheckboxMenu);
  await expect
    .element(page.getByRole('menuitemcheckbox', { name: 'Show toolbar' }))
    .toHaveAttribute('data-state', 'unchecked');
  await page.getByRole('menuitemcheckbox', { name: 'Show toolbar' }).click();
  await expect.element(page.getByText('Checked', { exact: true })).toBeAttached();
  await page.getByRole('button', { name: 'Toggle outside' }).click();
  await expect.element(page.getByText('Unchecked')).toBeAttached();
  await expect
    .element(page.getByRole('menuitemcheckbox', { name: 'Show toolbar' }))
    .toHaveAttribute('data-state', 'unchecked');
});

test('supports bind:value for radio item groups', async () => {
  render(RadioMenu);
  await expect.element(page.getByRole('menu')).toBeFocused();
  await page.getByRole('menuitemradio', { name: 'Second' }).click();
  await expect.element(page.getByText('second', { exact: true })).toBeAttached();
  await page.getByRole('button', { name: 'Reset outside' }).click();
  await expect.element(page.getByText('first', { exact: true })).toBeAttached();
  await expect
    .element(page.getByRole('menuitemradio', { name: 'First' }))
    .toHaveAttribute('data-state', 'checked');
});

test('opens a context menu on right click', async () => {
  render(ContextTriggerMenu);
  await page.getByRole('button', { name: 'Open context menu' }).click({ button: 'right' });
  await expect.element(page.getByRole('menu')).toBeVisible();
});

test('mounts content on first open and removes it after close', async () => {
  const { container } = render(SimpleMenu, { props: { portalled: false } });
  expect(container.querySelector('[data-slot="menu-content"]')).toBeNull();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.element(page.getByRole('menu')).toBeVisible();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.poll(() => container.querySelector('[data-slot="menu-content"]')).toBeNull();
});