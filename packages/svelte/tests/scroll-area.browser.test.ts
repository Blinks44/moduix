import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { ScrollArea } from '@/components/scroll-area';
import AlwaysHarness from './scroll-area/AlwaysHarness.svelte';
import AsChildHarness from './scroll-area/AsChildHarness.svelte';
import ProviderHarness from './scroll-area/ProviderHarness.svelte';
import RefsHarness from './scroll-area/RefsHarness.svelte';

test('renders Ark anatomy with stable styling hooks and forwarded refs', async () => {
  const { component } = render(RefsHarness);

  const refs = component.getRefs();
  const root = refs.rootRef as HTMLElement;
  const viewport = refs.viewportRef as HTMLElement;

  expect('Root' in ScrollArea).toBe(false);
  expect(root.getAttribute('data-scope')).toBe('scroll-area');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root.hasAttribute('data-fade')).toBe(true);
  expect(root.getAttribute('data-variant')).toBe('always');
  expect(viewport.getAttribute('data-part')).toBe('viewport');
  expect(viewport.getAttribute('data-slot')).toBe('scroll-area-viewport');
  await expect
    .element(page.getByText('Scrollable content'))
    .toHaveAttribute('data-slot', 'scroll-area-content');
  await expect.element(page.locator('[data-slot="scroll-area-scrollbar"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-thumb"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-corner"]')).toBeAttached();
});

test('keeps RootProvider composition and context connected', async () => {
  render(ProviderHarness);

  await expect
    .element(page.locator('[data-slot="scroll-area-root-provider"]'))
    .toHaveAttribute('data-scope', 'scroll-area');
  await expect.element(page.getByText('Provider content')).toBeAttached();
  await expect.element(page.getByText('true')).toBeAttached();
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-overflow-y');

  await page.getByRole('button', { name: 'Scroll to bottom', exact: true }).click();

  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-at-bottom');
  await expect.element(page.getByText('false', { exact: true })).toBeAttached();
});

test('preserves asChild composition and refs for every visible part', async () => {
  const { component } = render(AsChildHarness);

  const root = screen.getByRole('region', { name: 'Related articles' });
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  const rootLocator = page.getByRole('region', { name: 'Related articles', exact: true });
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'scroll-area-root');
  await expect.element(rootLocator).not.toHaveAttribute('data-fade');
  await expect.element(rootLocator).toHaveAttribute('data-variant', 'hover');
  expect(refs.viewportRef?.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect(refs.contentRef?.getAttribute('data-slot')).toBe('scroll-area-content');
  expect(refs.scrollbarRef?.getAttribute('data-slot')).toBe('scroll-area-scrollbar');
  expect(refs.thumbRef?.getAttribute('data-slot')).toBe('scroll-area-thumb');
  expect(refs.cornerRef?.getAttribute('data-slot')).toBe('scroll-area-corner');
});

test('shows only the overflowing scrollbar with the always variant', async () => {
  render(AlwaysHarness);

  await expect.element(page.getByTestId('vertical')).toHaveAttribute('data-overflow-y');
  await expect.element(page.getByTestId('horizontal')).not.toHaveAttribute('data-overflow-x');
  const vertical = document.querySelector<HTMLElement>('[data-testid="vertical"]')!;
  const horizontal = document.querySelector<HTMLElement>('[data-testid="horizontal"]')!;
  expect(getComputedStyle(vertical).opacity).toBe('1');
  expect(vertical.offsetWidth).toBe(4);
  expect(vertical.offsetHeight).toBe(92);
  expect(getComputedStyle(horizontal).display).toBe('none');
});