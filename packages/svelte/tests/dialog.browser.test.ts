import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import type { DialogOpenChangeDetails } from '@/components/dialog';
import BasicDialog from './dialog/BasicDialog.svelte';
import CloseIconDialog from './dialog/CloseIconDialog.svelte';
import ComposedDialog from './dialog/ComposedDialog.svelte';
import ControlledDialog from './dialog/ControlledDialog.svelte';
import LayoutDialog from './dialog/LayoutDialog.svelte';
import NonModalDialog from './dialog/NonModalDialog.svelte';
import PortalRefDialog from './dialog/PortalRefDialog.svelte';
import ProviderDialog from './dialog/ProviderDialog.svelte';
import RefsDialog from './dialog/RefsDialog.svelte';

test('keeps page interaction available for a non-modal dialog rendered inline', async () => {
  const clicks: string[] = [];
  render(NonModalDialog, { props: { clicks } });
  await expect.element(page.getByTestId('host').getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Open: true')).toBeAttached();
  await page.getByRole('button', { name: 'Inside' }).click();
  await page.getByRole('button', { name: 'Outside' }).click();
  expect(clicks).toEqual(['inside', 'outside']);
  await page.getByRole('button', { name: 'Toggle dialog' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('closes on Escape, preserves open-change details, and restores focus to its trigger', async () => {
  const details: DialogOpenChangeDetails[] = [];
  render(BasicDialog, { props: { onOpenChange: (detail) => details.push(detail) } });
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await expect.poll(() => details).toEqual([{ open: true }]);
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('supports controlled open state and bind:open', async () => {
  const details: DialogOpenChangeDetails[] = [];
  render(ControlledDialog, { props: { details } });
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Bound open: true')).toBeAttached();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(page.getByText('Bound open: false')).toBeAttached();
});

test('renders overlays inline when portalled is false', async () => {
  render(BasicDialog, { props: { defaultOpen: true, portalled: false } });
  await expect.element(page.getByTestId('dialog-host').getByRole('dialog')).toBeAttached();
});

test('portals overlays outside the root tree by default', async () => {
  const { container } = render(BasicDialog, { props: { defaultOpen: true } });
  await expect.element(page.getByRole('dialog')).toBeAttached();
  expect(container.querySelector('[role="dialog"]')).toBeNull();
});

test('opens a RootProvider dialog from external state and updates context', async () => {
  render(ProviderDialog);
  await expect.element(page.getByText('Open: false')).toBeAttached();
  await page.getByRole('button', { name: 'Open via API' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('closes with the close icon and restores focus to the trigger', async () => {
  render(BasicDialog, { props: { closeIcon: true } });
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('forwards refs through every public part and supports asChild', async () => {
  const { component } = render(RefsDialog);
  const refs = component.getRefs();
  for (const [name, slot] of Object.entries({
    trigger: 'dialog-trigger',
    backdrop: 'dialog-backdrop',
    positioner: 'dialog-positioner',
    content: 'dialog-content',
    title: 'dialog-title',
    description: 'dialog-description',
    closeTrigger: 'dialog-close-trigger',
    closeIcon: 'dialog-close-icon',
  })) {
    expect(refs[name]?.getAttribute('data-slot')).toBe(slot);
  }
  await expect
    .element(page.getByRole('button', { name: 'Composed trigger', includeHidden: true }))
    .toHaveAttribute('data-slot', 'dialog-trigger');
});

test('keeps close-icon labels, attributes and fallback content reactive', async () => {
  const { rerender } = render(CloseIconDialog, { props: { label: 'Dismiss first' } });
  const button = page.getByTestId('close');
  await expect.element(button).toHaveJSProperty('tagName', 'BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toBeAttached();
  await rerender({ label: 'Dismiss second' });
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  await rerender({ label: undefined, labelledby: 'dismiss-label' });
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close dialog');
  await rerender({ label: '', labelledby: 'dismiss-label' });
  await expect.element(button).toHaveAttribute('aria-label', '');
  await rerender({ label: '', labelledby: 'dismiss-label', custom: true });
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  await rerender({ label: '', labelledby: 'dismiss-label', custom: false });
  await expect.element(button.locator('svg')).toBeAttached();
});

test('mounts the content lazily and unmounts it after closing by default', async () => {
  render(BasicDialog);

  const content = page.locator('[data-slot="dialog-content"]');
  await expect.element(content).toHaveCount(0);
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect.element(content).toHaveCount(1);
  // An Escape pressed before Ark moves focus into the dialog is lost.
  await expect.element(page.getByRole('dialog')).toBeFocused();
  await page.getByRole('dialog').press('Escape');
  await expect.element(content).toHaveCount(0);
});

test('keeps tall content inside the dialog surface and scrolls the positioner', async () => {
  render(LayoutDialog, { props: { variant: 'tall' } });

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const positioner = document.querySelector<HTMLElement>('[data-slot="dialog-positioner"]')!;
  const content = document.querySelector('[role="dialog"]')!.getBoundingClientRect();
  const lastLine = document.querySelector('[data-testid="last-line"]')!.getBoundingClientRect();

  expect(content.top).toBeGreaterThanOrEqual(0);
  expect(lastLine.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(positioner.scrollHeight).toBeGreaterThan(positioner.clientHeight);
});

test('exposes the default recipe values on the content', async () => {
  render(LayoutDialog, { props: { variant: 'recipe' } });

  const dialog = page.getByRole('dialog');
  await expect.element(dialog).toHaveAttribute('data-size', 'md');
  await expect.element(dialog).toHaveAttribute('data-placement', 'center');
  await expect.element(dialog).toHaveAttribute('data-scroll-behavior', 'outside');
});

test('scrolls the body inside and keeps the footer visible with scrollBehavior inside', async () => {
  render(LayoutDialog, { props: { variant: 'inside' } });

  await expect.element(page.getByRole('dialog')).toBeVisible();
  const positioner = document.querySelector<HTMLElement>('[data-slot="dialog-positioner"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="dialog-body"]')!;
  const content = document.querySelector('[role="dialog"]')!.getBoundingClientRect();
  const footer = document.querySelector('[data-slot="dialog-footer"]')!.getBoundingClientRect();

  expect(content.bottom).toBeLessThanOrEqual(window.innerHeight + 1);
  expect(footer.bottom).toBeLessThanOrEqual(content.bottom + 1);
  expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  expect(positioner.scrollHeight).toBeLessThanOrEqual(positioner.clientHeight + 1);
});

test('preserves dialog behavior and Svelte composition', async () => {
  const details: DialogOpenChangeDetails[] = [];
  render(ComposedDialog, { props: { details } });
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.locator('[data-slot="dialog-close-trigger"]').click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(trigger).toBeFocused();
  await trigger.click();
  const closeIcon = page.locator('[data-slot="dialog-close-icon"]');
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }, { open: true }, { open: false }]);
});

test.each(['element', 'getter'] as const)(
  'supports portalRef, context, RootProvider, refs, and asChild (%s)',
  async (targetType) => {
    const { component } = render(PortalRefDialog, { props: { targetType } });
    await expect.element(page.getByTestId('portal').getByRole('dialog')).toBeAttached();
    await expect.element(page.getByText('Open: true')).toBeAttached();
    expect(component.getContentRef()).toBe(document.querySelector('[role="dialog"]'));
  },
);