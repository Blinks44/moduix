import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildHarness from './navigation-menu/AsChildHarness.svelte';
import BindHarness from './navigation-menu/BindHarness.svelte';
import FullHarness from './navigation-menu/FullHarness.svelte';
import ProviderHarness from './navigation-menu/ProviderHarness.svelte';
import RefsHarness from './navigation-menu/RefsHarness.svelte';
import TestNavigationMenu from './navigation-menu/TestNavigationMenu.svelte';

test('preserves Ark value changes and navigation semantics', async () => {
  const changes: Array<string | null> = [];
  render(TestNavigationMenu, {
    props: {
      defaultValue: 'products',
      onValueChange: (details: { value: string | null }) => changes.push(details.value),
    },
  });

  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect.element(page.getByRole('link', { name: 'Analytics', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'open');
  expect(changes).toEqual(['docs']);
  await expect.element(page.getByRole('link', { name: 'Guides', exact: true })).toBeVisible();
  const sharedList = document.querySelector('[data-slot="navigation-menu-list"]');
  const indicator = document.querySelector('[data-slot="navigation-menu-indicator"]');
  expect(sharedList?.lastElementChild).toBe(indicator);
  expect(
    document.querySelector(
      '[data-slot="navigation-menu-content"] [data-slot="navigation-menu-indicator"]',
    ),
  ).toBeNull();
  await expect
    .element(page.locator('[data-slot="navigation-menu-indicator"]'))
    .toHaveAttribute('data-state', 'open');

  await page.getByRole('button', { name: 'Docs', exact: true }).click();

  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"]'))
    .not.toBeVisible();
  expect(changes).toEqual(['docs', '']);
});

test('supports controlled bind:value state', async () => {
  render(BindHarness);

  // Park the pointer away from the triggers so a pointer left by an earlier test cannot open Docs.
  await page.getByRole('button', { name: 'Before menu', exact: true }).hover();
  await page.getByRole('button', { name: 'Products', exact: true }).press('Enter');
  await expect.element(page.getByTestId('controlled-value')).toContainText('products');

  await page.getByRole('button', { name: 'Docs', exact: true }).press('Enter');
  await expect.element(page.getByTestId('controlled-value')).toContainText('docs');
});

test('starts closed by default', async () => {
  render(TestNavigationMenu);

  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
});

test('renders every public part and preserves Content children without a wrapper', async () => {
  render(FullHarness);

  // Ark Svelte moves Content into the viewport after mount.
  const productsContent = await screen.findByTestId('products-content');

  expect(productsContent.children).toHaveLength(2);
  expect(productsContent.firstElementChild).toBe(screen.getByTestId('content-heading'));
  await expect.element(page.getByTestId('trigger-icon')).toBeAttached();
  await expect.element(page.getByTestId('item-indicator')).toBeAttached();
  await expect.element(page.getByTestId('indicator')).toBeAttached();
  await expect.element(page.getByTestId('arrow')).toBeAttached();
  await expect.element(page.getByTestId('viewport')).toBeAttached();
  await expect
    .element(page.getByRole('link', { name: 'Documentation', exact: true }))
    .toHaveAttribute('href', '/docs');
});

test('preserves asChild and current link styling hooks', async () => {
  render(AsChildHarness);

  await expect.element(page.getByTestId('home-link')).toHaveAttribute('data-current');
  await expect
    .element(page.getByTestId('home-link'))
    .toHaveAttribute('data-slot', 'navigation-menu-link');
});

test('supports refs on regular parts', () => {
  const { component } = render(RefsHarness);

  const refs = component.getRefs();

  expect(refs.rootRef).toBe(screen.getByRole('navigation'));
  expect(refs.triggerRef).toBe(screen.getByRole('button', { name: 'Products' }));
});

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  render(ProviderHarness);

  await expect.element(page.getByTestId('navigation-menu-value')).toContainText('products');
  await expect.element(page.getByTestId('hook-value')).toContainText('products');
  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root-provider');
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport-positioner"]'))
    .toBeAttached();
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport"]'))
    .toHaveAttribute('data-state', 'open');

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"][data-motion]'))
    .toBeAttached();
});