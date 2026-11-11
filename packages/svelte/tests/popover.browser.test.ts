import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import type { PopoverOpenChangeDetails } from '@/components/popover';
import BasicPopover from './popover/BasicPopover.svelte';
import ClassPopover from './popover/ClassPopover.svelte';
import CloseIconPopover from './popover/CloseIconPopover.svelte';
import ControlledPopover from './popover/ControlledPopover.svelte';
import LabelledPopover from './popover/LabelledPopover.svelte';
import PortalRefPopover from './popover/PortalRefPopover.svelte';
import ProviderPopover from './popover/ProviderPopover.svelte';
import RefsPopover from './popover/RefsPopover.svelte';
import TriggerValuePopover from './popover/TriggerValuePopover.svelte';

test('labels lazily mounted content with its title', async () => {
  render(LabelledPopover);
  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
});

test('preserves open-change details, bind:open, and focus restoration', async () => {
  const details: PopoverOpenChangeDetails[] = [];
  render(ControlledPopover, { props: { details } });
  const trigger = page.getByRole('button', { name: 'Open popover' });
  await trigger.click();
  await expect.element(page.getByTestId('content')).toBeVisible();
  await expect.element(page.getByText('Bound open: true')).toBeAttached();
  await page.locator('[data-slot="popover-close-trigger"]').click();
  await expect.element(page.getByTestId('content')).toHaveCount(0);
  await expect.element(page.getByText('Bound open: false')).toBeAttached();
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
  await page.getByRole('button', { name: 'Toggle from outside' }).click();
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('closes on Escape and restores focus to its trigger', async () => {
  render(BasicPopover);
  const trigger = page.getByRole('button', { name: 'Open popover' });
  await trigger.click();
  const closeIcon = page.getByRole('button', { name: 'Close popover' });
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.press('Escape');
  await expect.element(page.getByTestId('content')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});

test('portals overlays outside the root tree by default', async () => {
  const { container } = render(BasicPopover, { props: { defaultOpen: true } });
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  await expect.element(page.getByTestId('content')).toBeAttached();
});

test('follows runtime changes to portalled', async () => {
  const { rerender } = render(BasicPopover, { props: { defaultOpen: true } });
  await expect.element(page.getByTestId('content')).toBeAttached();
  expect(document.querySelector('[data-testid="host"] [data-testid="content"]')).toBeNull();
  await rerender({ portalled: false });
  await expect.element(page.getByTestId('host').getByTestId('content')).toBeAttached();
});

test.each(['element', 'getter'] as const)(
  'supports a custom portal target (%s) and renders inline when disabled',
  async (targetType) => {
    const { unmount } = render(PortalRefPopover, { props: { targetType } });
    await expect.element(page.getByTestId('portal').getByTestId('content')).toBeAttached();
    unmount();

    render(BasicPopover, { props: { defaultOpen: true, portalled: false } });
    await expect.element(page.getByTestId('host').getByTestId('content')).toBeAttached();
  },
);

test('keeps modal popovers portalled and exposes modal accessibility state', async () => {
  const { container } = render(BasicPopover, {
    props: { defaultOpen: true, modal: true, portalled: false },
  });
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  await expect.element(page.getByTestId('content')).toHaveAttribute('aria-modal', 'true');
});

test('reports the active trigger value and marks the current trigger', async () => {
  render(TriggerValuePopover);
  const first = page.getByRole('button', { name: 'First' });
  const second = page.getByRole('button', { name: 'Second' });
  await second.click();
  await expect.element(page.getByText('second', { exact: true })).toBeAttached();
  await expect.element(second).toHaveAttribute('data-current');
  await expect.element(first).not.toHaveAttribute('data-current');
  await first.click();
  await expect.element(page.getByText('first', { exact: true })).toBeAttached();
  await expect.element(first).toHaveAttribute('data-current');
  await expect.element(second).not.toHaveAttribute('data-current');
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('keeps close-icon labels, attributes and fallback content reactive', async () => {
  const { rerender } = render(CloseIconPopover, { props: { label: 'Dismiss first' } });
  const button = page.getByTestId('close');
  await expect.element(button).toHaveJSProperty('tagName', 'BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect(Array.from(document.querySelector('[data-testid="close"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-close']),
  );
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toBeAttached();
  await rerender({ label: 'Dismiss second' });
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  await rerender({ label: undefined, labelledby: 'dismiss-label' });
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close popover');
  await rerender({ label: '', labelledby: 'dismiss-label' });
  await expect.element(button).toHaveAttribute('aria-label', '');
  await rerender({ label: '', labelledby: 'dismiss-label', custom: true });
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  await rerender({ label: '', labelledby: 'dismiss-label', custom: false });
  await expect.element(button.locator('svg')).toBeAttached();
});

test('forwards consumer classes to the styled parts', () => {
  render(ClassPopover);
  for (const [slot, className] of [
    ['popover-trigger', 'consumer-trigger'],
    ['popover-content', 'consumer-content'],
    ['popover-close-icon', 'consumer-close'],
    ['popover-body', 'consumer-body'],
    ['popover-footer', 'consumer-footer'],
  ]) {
    expect(
      document.querySelector('[data-slot="' + slot + '"]')!.classList.contains(className),
    ).toBe(true);
  }
});

test('connects RootProvider, hook state, and Context snippets', async () => {
  render(ProviderPopover);
  await expect.element(page.getByText('Slot: closed')).toBeAttached();
  await expect.element(page.getByText('Hook: closed')).toBeAttached();
  await page.getByRole('button', { name: 'Open from API' }).click();
  await expect.element(page.getByText('Slot: open')).toBeAttached();
  await expect.element(page.getByText('Hook: open')).toBeAttached();
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('forwards refs through every public part and supports asChild', async () => {
  const { component } = render(RefsPopover);
  const refs = component.getRefs();
  for (const [name, slot] of Object.entries({
    anchor: 'popover-anchor',
    arrow: 'popover-arrow',
    arrowTip: 'popover-arrow-tip',
    body: 'popover-body',
    closeIcon: 'popover-close-icon',
    closeTrigger: 'popover-close-trigger',
    content: 'popover-content',
    description: 'popover-description',
    footer: 'popover-footer',
    header: 'popover-header',
    indicator: 'popover-indicator',
    positioner: 'popover-positioner',
    title: 'popover-title',
    trigger: 'popover-trigger',
  })) {
    expect(refs[name]?.getAttribute('data-slot')).toBe(slot);
  }
  await expect
    .element(page.getByRole('link', { name: 'Composed trigger' }))
    .toHaveAttribute('data-slot', 'popover-trigger');
});