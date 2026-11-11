import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import type { FloatingPanelOpenChangeDetails } from '@/components/floating-panel';
import CloseIconFloatingPanel from './floating-panel/CloseIconFloatingPanel.svelte';
import ContextFloatingPanel from './floating-panel/ContextFloatingPanel.svelte';
import ControlledFloatingPanel from './floating-panel/ControlledFloatingPanel.svelte';
import EmptyPartsFloatingPanel from './floating-panel/EmptyPartsFloatingPanel.svelte';
import FooterFloatingPanel from './floating-panel/FooterFloatingPanel.svelte';
import LazyFloatingPanel from './floating-panel/LazyFloatingPanel.svelte';
import PortalFloatingPanel from './floating-panel/PortalFloatingPanel.svelte';
import ProviderFloatingPanel from './floating-panel/ProviderFloatingPanel.svelte';
import RefsFloatingPanel from './floating-panel/RefsFloatingPanel.svelte';
import ResizeFloatingPanel from './floating-panel/ResizeFloatingPanel.svelte';
import SizedFloatingPanel from './floating-panel/SizedFloatingPanel.svelte';
import TranslatedFloatingPanel from './floating-panel/TranslatedFloatingPanel.svelte';

test('preserves Ark open-change detail objects and supports bind:open', async () => {
  const details: FloatingPanelOpenChangeDetails[] = [];
  render(ControlledFloatingPanel, { props: { details } });
  await page.getByRole('button', { name: 'Open controlled inspector', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByText('Bound open: true')).toBeAttached();
  await page.getByRole('button', { name: 'Close Window', exact: true }).click();
  await expect.poll(() => details).toEqual([{ open: true }, { open: false }]);
  await expect.element(page.getByText('Bound open: false')).toBeAttached();
});

test('opens a RootProvider panel through the public state hook', async () => {
  render(ProviderFloatingPanel);
  await page.getByRole('button', { name: 'Open via API', exact: true }).click();
  await expect.element(page.getByRole('dialog')).toBeAttached();
});

test('renders only the requested resize handles through ResizeTriggerGroup', () => {
  render(ResizeFloatingPanel);
  expect(
    Array.from(document.querySelectorAll('[data-slot="floating-panel-resize-trigger"]')).map(
      (handle) => handle.getAttribute('data-axis'),
    ),
  ).toEqual(['e', 's', 'se']);
});

test('exposes the current state through FloatingPanelContext', async () => {
  render(ContextFloatingPanel);
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('preserves refs, anatomy hooks, default icons, and consumer classes', async () => {
  const { component } = render(RefsFloatingPanel);
  const refs = component.getRefs();
  expect(refs.trigger?.getAttribute('data-slot')).toBe('floating-panel-trigger');
  expect(refs.positioner?.getAttribute('data-slot')).toBe('floating-panel-positioner');
  expect(refs.content?.getAttribute('data-slot')).toBe('floating-panel-content');
  expect(refs.header?.getAttribute('data-slot')).toBe('floating-panel-header');
  expect(refs.title?.getAttribute('data-slot')).toBe('floating-panel-title');
  expect(refs.footer?.getAttribute('data-slot')).toBe('floating-panel-footer');
  expect(document.querySelector('[data-slot="floating-panel-drag-indicator"]')).not.toBeNull();
  expect(refs.close?.getAttribute('data-slot')).toBe('floating-panel-close-icon');
  expect(Boolean(refs.close?.querySelector('svg')?.isConnected)).toBe(true);
  expect([...screen.getByRole('button', { name: 'Open' }).classList]).toEqual(
    expect.arrayContaining(['consumer-trigger']),
  );
});

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const { rerender } = render(CloseIconFloatingPanel, { props: { label: 'Dismiss first' } });
  const button = screen.getByTestId('close');
  expect(button.tagName).toBe('BUTTON');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss first');
  expect([...button.classList]).toEqual(expect.arrayContaining(['consumer-close']));
  await expect.element(page.getByTestId('close')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(page.getByTestId('close')).toHaveAttribute('title', 'Dismiss preview');
  expect(Boolean(button.querySelector('svg')?.isConnected)).toBe(true);
  await rerender({ label: 'Dismiss second' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss second');
  await rerender({ label: undefined, labelledby: 'dismiss-label' });
  await expect
    .element(page.getByTestId('close'))
    .toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Close panel');
  await rerender({ label: '', labelledby: 'dismiss-label' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', '');
  await page.getByTestId('close').focus();
  await rerender({ label: '', labelledby: 'dismiss-label', custom: true });
  await expect.element(page.getByTestId('close')).toContainText('Custom close');
  expect(screen.getByTestId('close')).toBe(button);
  await expect.element(page.getByTestId('close')).toBeFocused();
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  await rerender({ label: '', labelledby: 'dismiss-label', custom: false });
  await expect
    .poll(() => Boolean(screen.getByTestId('close').querySelector('svg')?.isConnected))
    .toBe(true);
  expect(screen.getByTestId('close')).toBe(button);
  await expect.element(page.getByTestId('close')).toBeFocused();
});

test('sizes the content from Ark state without a CSS minimum', async () => {
  render(SizedFloatingPanel);
  await expect.element(page.getByRole('dialog')).toBeAttached();

  const content = document.querySelector<HTMLElement>('[data-slot="floating-panel-content"]')!;
  expect([content.offsetWidth, content.offsetHeight]).toEqual([160, 96]);
});

test('marks the footer as minimized with the panel', async () => {
  render(FooterFloatingPanel);
  await page.getByRole('button', { name: 'Minimize window', exact: true }).click();
  await expect.element(page.getByTestId('footer')).toHaveAttribute('data-minimized');
});

test('keeps Ark translations for default stage controls', async () => {
  render(TranslatedFloatingPanel);
  await expect
    .element(page.getByRole('button', { name: 'Minimieren', exact: true }))
    .toBeAttached();
  await expect
    .element(page.getByRole('button', { name: 'Maximieren', exact: true }))
    .toBeAttached();
});

test('lazily mounts, closes on Escape, and restores focus to its trigger', async () => {
  render(LazyFloatingPanel);

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open inspector', exact: true }).click();

  await page.getByRole('dialog').press('Escape');

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open inspector', exact: true }))
    .toBeFocused();
});

test('portals overlays inline and into a custom portal target', async () => {
  render(PortalFloatingPanel);
  await expect
    .element(page.getByTestId('inline-host').getByRole('dialog', { name: 'Inline' }))
    .toBeAttached();
  await expect
    .poll(() =>
      screen.getByTestId('portal-host').contains(screen.getByRole('dialog', { name: 'Portalled' })),
    )
    .toBe(true);
});

test('keeps consumer classes last on component parts', async () => {
  render(EmptyPartsFloatingPanel);
  const content = screen.getByRole('dialog');
  expect([...content.classList]).toEqual(expect.arrayContaining(['rounded-none', 'bg-muted']));
  await expect.element(page.getByTestId('header')).toBeAttached();
  await expect.element(page.getByTestId('drag-indicator')).toBeAttached();
  await expect.element(page.getByTestId('control')).toBeAttached();
  await expect.element(page.getByTestId('body')).toBeAttached();
  await expect.element(page.getByTestId('footer')).toBeAttached();
});