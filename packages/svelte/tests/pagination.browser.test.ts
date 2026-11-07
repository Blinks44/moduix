import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildPagination from './pagination/AsChildPagination.svelte';
import LinkPagination from './pagination/LinkPagination.svelte';
import ModelPagination from './pagination/ModelPagination.svelte';
import Nav from './pagination/Nav.svelte';
import PaginationConsumer from './pagination/PaginationConsumer.svelte';
import ProviderPagination from './pagination/ProviderPagination.svelte';

test('preserves Ark navigation semantics, refs, attrs, and default trigger boundaries', async () => {
  const { component } = render(Nav, {
    props: {
      id: 'page-navigation',
      class: 'consumer-root',
      'data-probe': 'root',
      count: 20,
      defaultPage: 1,
      pageSize: 10,
      prevLabel: 'Go to the previous page',
    },
  });

  const navigation = screen.getByRole('navigation', { name: 'pagination' });
  const navigationLocator = page.getByRole('navigation', { name: 'pagination', exact: true });
  await expect.element(navigationLocator).toHaveAttribute('data-slot', 'pagination-root');
  await expect.element(navigationLocator).toHaveAttribute('id', 'pagination:page-navigation');
  await expect.element(navigationLocator).toHaveAttribute('data-probe', 'root');
  expect([...navigation.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect(component.getRefs().root).toBe(navigation);

  const previousTrigger = screen.getByRole('button', { name: 'Go to the previous page' });
  await expect
    .element(page.getByRole('button', { name: 'Go to the previous page', exact: true }))
    .toHaveAttribute('data-slot', 'pagination-prev-trigger');
  await expect
    .element(page.getByRole('button', { name: 'Go to the previous page', exact: true }))
    .toBeDisabled();
  expect(component.getRefs().trigger).toBe(previousTrigger);
  await expect
    .element(page.getByRole('button', { name: /next page/i, exact: true }))
    .not.toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: /page 1/i, exact: true }))
    .toHaveAttribute('data-slot', 'pagination-item');
  await expect
    .element(page.getByRole('button', { name: /page 1/i, exact: true }))
    .toHaveAttribute('data-selected');
});

test('lets Ark translations set the navigation landmark label', async () => {
  render(Nav, {
    props: { count: 20, pageSize: 10, translations: { rootLabel: 'Page navigation' } },
  });

  await expect
    .element(page.getByRole('navigation', { name: 'Page navigation', exact: true }))
    .toBeAttached();
});

test('renders ellipses and keeps first and last trigger boundaries in sync', async () => {
  render(Nav, {
    props: { count: 200, defaultPage: 10, pageSize: 10, siblingCount: 1, edges: true },
  });

  const ellipses = document.querySelectorAll('[data-slot="pagination-ellipsis"]');
  expect(ellipses).toHaveLength(2);
  for (const ellipsis of ellipses) {
    expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
    expect(ellipsis.querySelector('svg')).not.toBeNull();
  }

  const firstPageTrigger = page.getByRole('button', { name: 'first page', exact: true });
  await expect.element(firstPageTrigger).toHaveAttribute('data-slot', 'pagination-first-trigger');
  const lastPageTrigger = page.getByRole('button', { name: 'last page', exact: true });
  await expect.element(lastPageTrigger).toHaveAttribute('data-slot', 'pagination-last-trigger');

  await firstPageTrigger.click();
  await expect
    .element(page.locator('[data-slot="pagination-item"][data-selected]'))
    .toContainText('1');
  await expect.element(firstPageTrigger).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: /previous page/i, exact: true }))
    .toBeDisabled();

  await lastPageTrigger.click();
  await expect
    .element(page.locator('[data-slot="pagination-item"][data-selected]'))
    .toContainText('20');
  await expect
    .element(page.getByRole('button', { name: /next page/i, exact: true }))
    .toBeDisabled();
  await expect.element(lastPageTrigger).toBeDisabled();
});

test('supports Svelte page models and preserves Ark page-change details', async () => {
  const changes: number[] = [];
  const { component } = render(ModelPagination, { props: { changes } });
  await page.getByRole('button', { name: /page 2/i, exact: true }).click();
  await expect.poll(() => component.read().page).toBe(2);
  expect(changes).toEqual([2]);
  await expect.element(page.getByText('Page 2 of 3')).toBeAttached();

  await page.getByRole('button', { name: 'Change page size', exact: true }).click();
  await expect.poll(() => component.read().pageSize).toBe(5);
  await expect.element(page.getByText('Page 2 of 6')).toBeAttached();
});

test('composes link mode with semantic anchors through asChild', async () => {
  render(LinkPagination);

  await expect
    .element(page.getByRole('link', { name: /page 2/i, exact: true }))
    .toHaveAttribute('href', '?page=2');
});

test('exposes usePagination state through RootProvider and its context snippet', async () => {
  render(ProviderPagination);
  await expect.element(page.getByText('Page 2')).toBeAttached();
  await expect.element(page.getByText('Range 10-20')).toBeAttached();
  await page.getByRole('button', { name: /next page/i, exact: true }).click();
  await expect.element(page.getByText('Page 3')).toBeAttached();
});

test('keeps root asChild semantics and refs on the consumer host', async () => {
  const { component } = render(AsChildPagination);
  const navigation = screen.getByRole('navigation', { name: 'Custom page navigation' });
  await expect
    .element(page.getByRole('navigation', { name: 'Custom page navigation', exact: true }))
    .toHaveAttribute('data-slot', 'pagination-root');
  expect(component.getRoot()).toBe(navigation);
});

test('keeps the public flat API usable from a Svelte consumer component', async () => {
  render(PaginationConsumer);

  await expect.element(page.getByText('2 of 3')).toBeAttached();
  await page
    .locator('[data-slot="pagination-root"] [data-slot="pagination-item"][data-index="3"]')
    .click();
  await expect.element(page.getByText('3 of 3')).toBeAttached();
});