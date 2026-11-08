import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import AsChildHarness from './splitter/AsChildHarness.svelte';
import DisabledHarness from './splitter/DisabledHarness.svelte';
import FormHarness from './splitter/FormHarness.svelte';
import ProviderHarness from './splitter/ProviderHarness.svelte';
import RefsHarness from './splitter/RefsHarness.svelte';
import TestSplitter from './splitter/TestSplitter.svelte';

test('resizes with the keyboard and preserves trigger defaults', async () => {
  const { container } = render(TestSplitter);

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  await expect
    .element(page.locator('[data-slot="splitter-resize-trigger-indicator"]'))
    .toBeVisible();
  expect(trigger.getAttribute('aria-valuemin')).toBe('20');
  expect(trigger.getAttribute('aria-valuemax')).toBe('80');
  expect(trigger.getAttribute('tabindex')).toBe('0');

  const resize = page.getByRole('separator', { name: 'Resize panels' });
  await expect.element(resize).toHaveAttribute('aria-valuenow', '40');
  await page.getByRole('button', { name: 'A', exact: true }).press('Tab');
  await expect.element(resize).toBeFocused();
  await expect.element(resize).toHaveAttribute('data-focus');
  const panel = container.querySelector('[data-slot="splitter-panel"]')!;
  await expect.poll(() => panel.getBoundingClientRect().width).toBeGreaterThan(0);
  const initialWidth = panel.getBoundingClientRect().width;
  await resize.press('ArrowRight');
  await expect.element(resize).toHaveAttribute('aria-valuenow', '41');
  await expect.poll(() => panel.getBoundingClientRect().width).toBeGreaterThan(initialWidth);
  await expect.element(resize).toBeFocused();
  await expect
    .element(page.locator('[data-slot="splitter-resize-trigger-indicator"]'))
    .toHaveCSS('outline-width', '2px');
  await page.getByRole('button', { name: 'A', exact: true }).click();
  await expect.element(resize).not.toBeFocused();
  await resize.click();
  await expect.element(resize).toHaveAttribute('data-focus');
  await page.getByText('A', { exact: true }).hover();
  await expect
    .element(page.locator('[data-slot="splitter-resize-trigger-indicator"]'))
    .toHaveCSS('outline-style', 'none');
});

test('keeps custom trigger content and disabled behavior intact', async () => {
  const { container } = render(DisabledHarness);

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  await expect.element(page.getByText('Grip')).toBeVisible();
  expect(container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')).toBeNull();
  expect(trigger.hasAttribute('data-disabled')).toBe(true);
  expect(trigger.hasAttribute('tabindex')).toBe(false);
  const resize = page.getByRole('separator', { name: 'Disabled resize' });
  await resize.press('ArrowRight');
  await expect.element(resize).toHaveAttribute('aria-valuenow', '40');
});

test('keeps an asChild resize trigger as the interactive host', async () => {
  const { container } = render(AsChildHarness);

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  expect(trigger.tagName).toBe('BUTTON');
  expect(trigger.getAttribute('data-slot')).toBe('splitter-resize-trigger');
  expect(container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')).toBeNull();
  const resize = page.getByRole('separator', { name: 'Resize panels' });
  await resize.click();
  await expect.element(resize).toHaveAttribute('data-focus');
  await resize.press('ArrowRight');
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveAttribute('aria-valuenow', '41');
});

test('preserves anatomy, attributes, and refs for every styled part', () => {
  const { component, container } = render(RefsHarness);

  const root = container.querySelector<HTMLElement>('[data-slot="splitter-root"]')!;
  const panel = container.querySelector('[data-slot="splitter-panel"]')!;
  const trigger = container.querySelector('[data-slot="splitter-resize-trigger"]')!;
  const indicator = container.querySelector('[data-slot="splitter-resize-trigger-indicator"]')!;
  const refs = component.getRefs();

  expect(root.getAttribute('data-scope')).toBe('splitter');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(refs.rootRef).toBe(root);
  expect(refs.panelRef).toBe(panel);
  expect(refs.triggerRef).toBe(trigger);
  expect(refs.indicatorRef).toBe(indicator);
});

test('keeps the provider and context connected to the Svelte splitter store', async () => {
  render(ProviderHarness);

  await expect.element(page.getByText('Sizes: 50 / 50')).toBeVisible();
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveAttribute('data-slot', 'splitter-resize-trigger');

  await page.getByRole('button', { name: 'Set A to 25%' }).click();

  await expect.element(page.getByText('Sizes: 25 / 75')).toBeVisible();
  await expect
    .element(page.getByRole('separator', { name: 'Resize panels' }))
    .toHaveAttribute('aria-valuenow', '25');
});

test('never submits a surrounding form from the resize trigger', async () => {
  let submits = 0;
  const { container } = render(FormHarness, { props: { onsubmit: () => (submits += 1) } });

  const trigger = container.querySelector<HTMLElement>('[role="separator"]')!;

  expect(trigger.getAttribute('type')).toBe('button');
  await page.getByRole('separator', { name: 'Resize panels' }).click();
  expect(submits).toBe(0);
});