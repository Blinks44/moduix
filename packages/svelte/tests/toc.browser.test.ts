import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import { TocRail } from '@/components/toc';
import ArkIdsHarness from './toc/ArkIdsHarness.svelte';
import AsChildHarness from './toc/AsChildHarness.svelte';
import ControlledHarness from './toc/ControlledHarness.svelte';
import HookHarness from './toc/HookHarness.svelte';
import IndicatorHarness from './toc/IndicatorHarness.svelte';
import { items } from './toc/items';
import PlacementHarness from './toc/PlacementHarness.svelte';
import ProviderHarness from './toc/ProviderHarness.svelte';
import RailHarness from './toc/RailHarness.svelte';
import ScrollableHarness from './toc/ScrollableHarness.svelte';
import SemanticsHarness from './toc/SemanticsHarness.svelte';

test('sizes the rail in CSS pixels and reacts to depth changes', async () => {
  const { component } = render(RailHarness);

  const rail = component.getRail();

  expect(rail.style.width).toBe('14px');
  expect(rail.querySelector('path')?.getAttribute('d')).toBe('M 0.5 0 C 0.5 8 12.5 4 12.5 12');

  component.setDepth(4);

  await expect.poll(() => rail.style.width).toBe('26px');
  expect(rail.querySelector('line')?.getAttribute('x1')).toBe('24.5');
});

test('preserves consumer rail style overrides', () => {
  const { container } = render(TocRail, {
    props: { depth: 3, style: 'width: 40px; height: 80px; color: red' },
  });

  const rail = container.querySelector('svg')!;

  expect(rail.style.width).toBe('40px');
  expect(rail.style.height).toBe('80px');
  expect(rail.style.color).toBe('red');
});

test('preserves reactive hook props and its callback', async () => {
  const onActiveChange = rs.fn();
  const { component } = render(HookHarness, { props: { onActiveChange } });

  await expect.element(page.getByRole('status')).toContainText('introduction');

  await page.getByRole('button', { name: 'Activate configuration' }).click();

  expect(onActiveChange).toHaveBeenCalledTimes(1);
  expect(onActiveChange).toHaveBeenCalledWith(
    expect.objectContaining({ activeIds: ['configuration'] }),
  );
  await expect.element(page.getByRole('status')).toContainText('configuration');

  component.setActiveIds(['introduction']);

  await expect.element(page.getByRole('status')).toContainText('introduction');
});

test('preserves Ark navigation semantics, active state, anatomy, attributes, and refs', async () => {
  const { component } = render(SemanticsHarness);

  const nav = page.getByRole('navigation', { name: 'On this page' });
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });
  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;

  expect(root.getAttribute('data-slot')).toBe('toc-root');
  expect(root.getAttribute('data-scope')).toBe('toc');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(refs.contentRef?.getAttribute('data-slot')).toBe('toc-content');
  await expect.element(nav).toBeAttached();
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
  expect(document.querySelector('[data-slot="toc-rail"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
});

test('controlled active-change reports the requested ids', async () => {
  const change = rs.fn();
  render(ControlledHarness, { props: { change } });

  await page.getByRole('button', { name: 'Activate configuration' }).click();

  await expect
    .element(page.getByRole('link', { name: 'configuration' }))
    .toHaveAttribute('aria-current', 'location');
  expect(change).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledWith(
    expect.objectContaining({
      activeIds: ['configuration'],
      activeItems: [items[1]],
    }),
  );
  await expect
    .element(page.getByRole('link', { name: 'configuration' }))
    .toHaveAttribute('data-slot', 'toc-link');
});

test('direct Ark root and navigation have distinct ids', () => {
  const { container } = render(ArkIdsHarness);

  const root = container.querySelector('[data-part="root"]')!;
  const nav = container.querySelector('nav')!;

  expect(nav.id).not.toBe(root.id);
});

test('keeps the RootProvider store and context available to surrounding composition', async () => {
  render(ProviderHarness);

  await page.getByRole('button', { name: 'Set active section' }).click();

  await expect.element(page.getByRole('status')).toContainText('configuration');
  const rootProvider = page.locator('[data-slot="toc-root-provider"]');
  await expect.element(rootProvider).toHaveAttribute('data-scope', 'toc');
  await expect.element(rootProvider).toHaveAttribute('data-part', 'root');
});

test('supports placement and scrolls the supplied reading pane', async () => {
  const { unmount } = render(ScrollableHarness);

  const reader = document.querySelector<HTMLElement>('[aria-label="Reader"]')!;
  const heading = document.getElementById('configuration')!;
  const windowScroll = window.scrollY;

  await page.getByRole('link', { name: 'configuration' }).click();

  await expect.poll(() => reader.scrollTop).toBeGreaterThan(0);
  await expect
    .poll(() => heading.getBoundingClientRect().top - reader.getBoundingClientRect().top)
    .toBeCloseTo(0, 0);
  expect(window.scrollY).toBe(windowScroll);

  unmount();
  render(PlacementHarness);

  await expect
    .element(page.getByRole('navigation', { name: 'Left navigation' }))
    .toHaveAttribute('data-placement', 'left');
});

test('preserves semantic asChild composition and component refs', () => {
  const { component } = render(AsChildHarness);

  const root = document.querySelector<HTMLElement>('[data-slot="toc-root"]')!;
  const refs = component.getRefs();

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('toc-root');
  expect(refs.rootRef).toBe(root);
  expect(refs.contentRef?.getAttribute('data-slot')).toBe('toc-content');
});

test('keeps the indicator on Ark measurements inside a parent that sets --top and --height', async () => {
  const { container } = render(IndicatorHarness);

  const indicator = container.querySelector<HTMLElement>('[data-slot="toc-indicator"]')!;
  // Distance between the indicator box and the active items inset by 2px on each end.
  const getIndicatorOffset = () => {
    const activeItems = [
      ...container.querySelectorAll<HTMLElement>('[data-slot="toc-item"][data-active]'),
    ];
    const first = activeItems[0]!.getBoundingClientRect();
    const last = activeItems.at(-1)!.getBoundingClientRect();
    const box = indicator.getBoundingClientRect();
    return Math.max(Math.abs(box.top - first.top - 2), Math.abs(box.bottom - last.bottom + 2));
  };

  await expect.poll(getIndicatorOffset).toBeLessThanOrEqual(1);
});