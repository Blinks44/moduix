import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal, For } from 'solid-js';
import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
  usePaginationContext,
} from '../src';

function PageItems() {
  return (
    <>
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </>
  );
}

test('preserves Ark navigation semantics, refs, and default trigger boundaries', async () => {
  let ref!: HTMLElement;

  render(() => (
    <Pagination ref={(element) => (ref = element)} count={20} defaultPage={1} pageSize={10}>
      <PageItems />
    </Pagination>
  ));

  await expect
    .element(page.getByRole('navigation', { name: 'pagination', exact: true }))
    .toHaveAttribute('data-slot', 'pagination-root');
  expect(ref.getAttribute('data-slot')).toBe('pagination-root');
  await expect
    .element(page.getByRole('button', { name: /previous page/i, exact: true }))
    .toHaveAttribute('data-slot', 'pagination-prev-trigger');
  await expect
    .element(page.getByRole('button', { name: /previous page/i, exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: /next page/i, exact: true }))
    .toHaveAttribute('data-slot', 'pagination-next-trigger');
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

test('uses Ark translations for the navigation landmark label', async () => {
  render(() => (
    <Pagination count={20} pageSize={10} translations={{ rootLabel: 'Page navigation' }}>
      <PageItems />
    </Pagination>
  ));

  await expect
    .element(page.getByRole('navigation', { name: 'Page navigation', exact: true }))
    .toBeAttached();
});

test('renders a long range with ellipses and keeps edge trigger boundaries in sync', async () => {
  render(() => (
    <Pagination count={200} defaultPage={10} pageSize={10} siblingCount={1}>
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>
  ));

  expect(screen.getAllByText('...')).toHaveLength(2);

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

test('keeps controlled page changes and Ark callback details intact', async () => {
  const changes: number[] = [];

  function ControlledPagination() {
    const [page, setPage] = createSignal(1);

    return (
      <Pagination
        count={30}
        page={page()}
        pageSize={10}
        onPageChange={(details) => {
          changes.push(details.page);
          setPage(details.page);
        }}
      >
        <PageItems />
      </Pagination>
    );
  }

  render(() => <ControlledPagination />);
  await page.getByRole('button', { name: /page 2/i, exact: true }).click();

  await expect.poll(() => changes).toEqual([2]);
  await expect
    .element(page.getByRole('button', { name: /page 2/i, exact: true }))
    .toHaveAttribute('data-selected');
});

test('renders Ark link mode with generated page URLs', async () => {
  render(() => (
    <Pagination
      count={30}
      pageSize={10}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <PaginationPrevTrigger
        asChild={(props) => (
          <a {...props()} href="#">
            Previous
          </a>
        )}
      />
      <PaginationContext>
        {(pagination) => (
          <For each={pagination().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <PaginationItem
                  {...page}
                  asChild={(props) => (
                    <a {...props()} href={`?page=${page.value}`}>
                      {page.value}
                    </a>
                  )}
                />
              ) : (
                <PaginationEllipsis index={index()} />
              )
            }
          </For>
        )}
      </PaginationContext>
      <PaginationNextTrigger
        asChild={(props) => (
          <a {...props()} href="#">
            Next
          </a>
        )}
      />
    </Pagination>
  ));

  await expect
    .element(page.getByRole('link', { name: /page 2/i, exact: true }))
    .toHaveAttribute('href', '?page=2');
});

test('exposes usePagination state through RootProvider and context', async () => {
  function PageValue() {
    const pagination = usePaginationContext();
    return <output>Page {pagination().page}</output>;
  }

  function ProviderPagination() {
    const pagination = usePagination({ count: 30, defaultPage: 2, pageSize: 10 });

    return (
      <PaginationRootProvider value={pagination}>
        <PageItems />
        <PageValue />
      </PaginationRootProvider>
    );
  }

  render(() => <ProviderPagination />);

  await expect.element(page.getByText('Page 2')).toBeAttached();
  await page.getByRole('button', { name: /next page/i, exact: true }).click();
  await expect.element(page.getByText('Page 3')).toBeAttached();
});