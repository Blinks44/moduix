import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import type { DrawerOpenChangeDetails } from '@/components/drawer';
import AsChildContentDrawer from './drawer/AsChildContentDrawer.svelte';
import BasicDrawer from './drawer/BasicDrawer.svelte';
import CloseIconDrawer from './drawer/CloseIconDrawer.svelte';
import ControlledDrawer from './drawer/ControlledDrawer.svelte';
import DragDrawer from './drawer/DragDrawer.svelte';
import IslandDrawer from './drawer/IslandDrawer.svelte';
import NonModalDrawer from './drawer/NonModalDrawer.svelte';
import PortalProviderDrawer from './drawer/PortalProviderDrawer.svelte';
import PortalRefDrawer from './drawer/PortalRefDrawer.svelte';
import ProviderLifecycleDrawer from './drawer/ProviderLifecycleDrawer.svelte';
import RefsDrawer from './drawer/RefsDrawer.svelte';

test('keeps page interaction available for a non-modal drawer', async () => {
  const { container } = render(NonModalDrawer);
  expect(container.querySelector('[role="dialog"]')).not.toBeNull();

  await page.getByRole('button', { name: 'Toggle drawer' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Toggle drawer' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close drawer' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
});

test('lazily mounts in the default portal, preserves open-change details, and restores focus after Escape', async () => {
  const details: DrawerOpenChangeDetails[] = [];
  const { container } = render(BasicDrawer, {
    props: { onOpenChange: (detail) => details.push(detail) },
  });
  const trigger = page.getByRole('button', { name: 'Open drawer' });
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await trigger.click();
  await expect.element(page.getByRole('dialog')).toBeFocused();
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  expect(details).toEqual([{ open: true }]);
  await page.getByRole('dialog').press('Escape');
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('supports controlled open state and bind:open', async () => {
  const details: DrawerOpenChangeDetails[] = [];
  render(ControlledDrawer, { props: { details } });
  await page.getByRole('button', { name: 'Open drawer' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Bound open: true')).toBeAttached();
  await expect.poll(() => details).toEqual([{ open: true }]);
  const close = page.getByRole('button', { name: 'Close drawer' });
  await expect.element(close).toBeFocused();
  await close.click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(page.getByText('Bound open: false')).toBeAttached();
});

test('portals overlays into portalRef when provided', async () => {
  render(PortalRefDrawer);
  await expect.element(page.getByTestId('drawer-portal').getByRole('dialog')).toBeVisible();
});

test('opens a RootProvider drawer through its API and preserves context/presence callbacks', async () => {
  const enterComplete = rs.fn();
  const exitComplete = rs.fn();
  render(ProviderLifecycleDrawer, { props: { enterComplete, exitComplete } });
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  expect(enterComplete).not.toHaveBeenCalled();
  expect(exitComplete).not.toHaveBeenCalled();
  for (const count of [1, 2]) {
    await page.getByRole('button', { name: 'Open via API' }).click();
    await expect.element(page.getByRole('dialog', { name: 'Provider lifecycle' })).toBeVisible();
    await expect.element(page.getByText('Open: true')).toBeVisible();
    // Ark Presence skips enter completion for its first mount.
    if (count > 1) {
      await expect.poll(() => enterComplete.mock.calls.length).toBe(count - 1);
    } else {
      expect(enterComplete).not.toHaveBeenCalled();
    }
    await page.getByRole('button', { name: 'Close drawer' }).click();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
    await expect.poll(() => exitComplete.mock.calls.length).toBe(count);
  }
});

test.each(['touch', 'mouse'])(
  'drags content outside the grabber and dismisses it (%s)',
  async (pointerType) => {
    const details: DrawerOpenChangeDetails[] = [];
    render(DragDrawer, { props: { details } });
    await expect.element(page.getByRole('dialog')).toBeFocused();
    const content = document.querySelector('[role="dialog"]')!;
    const body = document.querySelector('[data-testid="drawer-body"]')!;
    const { left, top, width } = body.getBoundingClientRect();
    const y = top + 2;
    const height = content.getBoundingClientRect().height;
    expect(height).toBeGreaterThan(0);
    // Rstest locators do not expose a pointer sequence with an explicit pointerType.
    const pointer = {
      bubbles: true,
      cancelable: true,
      button: 0,
      buttons: 1,
      pointerId: 1,
      pointerType,
      clientX: left + width / 2,
    };
    body.dispatchEvent(new PointerEvent('pointerdown', { ...pointer, clientY: y }));
    body.dispatchEvent(new PointerEvent('pointermove', { ...pointer, clientY: y + 60 }));
    await expect.element(page.getByRole('dialog')).toHaveAttribute('data-dragging', '');
    body.dispatchEvent(new PointerEvent('pointermove', { ...pointer, clientY: y + height }));
    body.dispatchEvent(
      new PointerEvent('pointerup', { ...pointer, buttons: 0, clientY: y + height }),
    );
    await expect.poll(() => details).toEqual([{ open: false }]);
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
  },
);

test('forwards a ref through native asChild composition', () => {
  const { component } = render(AsChildContentDrawer);
  const contentRef = component.getContentRef();
  expect(contentRef).toBe(document.querySelector('[role="dialog"]'));
  expect(contentRef?.tagName).toBe('SECTION');
});

test('forwards refs through every public part and supports asChild', () => {
  const { component } = render(RefsDrawer);
  const refs = component.getRefs();
  for (const [name, slot] of Object.entries({
    trigger: 'drawer-trigger',
    backdrop: 'drawer-backdrop',
    positioner: 'drawer-positioner',
    content: 'drawer-content',
    grabber: 'drawer-grabber',
    indicator: 'drawer-grabber-indicator',
    title: 'drawer-title',
    description: 'drawer-description',
    closeTrigger: 'drawer-close-trigger',
    closeIcon: 'drawer-close-icon',
    swipeArea: 'drawer-swipe-area',
    indent: 'drawer-indent',
    indentBackground: 'drawer-indent-background',
    header: 'drawer-header',
    body: 'drawer-body',
    footer: 'drawer-footer',
  })) {
    expect(refs[name]?.getAttribute('data-slot')).toBe(slot);
  }
  expect(document.querySelector('[data-testid="composed"]')?.getAttribute('data-slot')).toBe(
    'drawer-trigger',
  );
});

test('marks an island drawer and closes it through its accessible close icon', async () => {
  render(IslandDrawer);
  const trigger = page.getByRole('button', { name: 'Open drawer' });
  await trigger.click();

  await expect.element(page.getByRole('dialog')).toHaveAttribute('data-variant', 'island');
  expect(document.querySelector('[data-testid="drawer-state"]')?.textContent?.trim()).toBe(
    'down:1:1',
  );
  await expect
    .element(page.locator('[data-slot="drawer-positioner"]'))
    .toHaveAttribute('data-swipe-direction', 'down');
  await page.getByRole('button', { name: 'Close drawer' }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const { rerender } = render(CloseIconDrawer, { props: { label: 'Dismiss first' } });
  const button = page.getByTestId('close');
  await expect.element(button).toBeVisible();
  const host = document.querySelector('[data-testid="close"]')!;
  expect(host.tagName).toBe('BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect([...host.classList]).toContain('consumer-close');
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toHaveCount(1);
  await rerender({ label: 'Dismiss second' });
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  await rerender({ label: undefined, labelledby: 'dismiss-label' });
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close drawer');
  await rerender({ label: '', labelledby: 'dismiss-label' });
  await expect.element(button).toHaveAttribute('aria-label', '');
  await rerender({ label: '', labelledby: 'dismiss-label', custom: true });
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  await rerender({ label: '', labelledby: 'dismiss-label', custom: false });
  await expect.element(button.locator('svg')).toHaveCount(1);
});

test('supports custom portals, context and refs through RootProvider', async () => {
  const { component } = render(PortalProviderDrawer);
  await expect.element(page.getByTestId('portal').getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Open: true')).toBeVisible();
  expect(component.getContentRef()).toBe(document.querySelector('[role="dialog"]'));
});