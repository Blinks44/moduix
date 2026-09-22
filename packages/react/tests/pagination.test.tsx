import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
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

test('preserves Ark navigation semantics, refs, and default trigger boundaries', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Pagination ref={ref} count={20} defaultPage={1} pageSize={10}>
      <PageItems />
    </Pagination>,
  );

  expect(screen.getByRole('navigation', { name: 'pagination' })).toHaveAttribute(
    'data-slot',
    'pagination-root',
  );
  expect(ref.current).toHaveAttribute('data-slot', 'pagination-root');
  expect(screen.getByRole('button', { name: /previous page/i })).toHaveAttribute(
    'data-slot',
    'pagination-prev-trigger',
  );
  expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
  expect(screen.getByRole('button', { name: /next page/i })).toHaveAttribute(
    'data-slot',
    'pagination-next-trigger',
  );
  expect(screen.getByRole('button', { name: /next page/i })).not.toBeDisabled();
  expect(screen.getByRole('button', { name: /page 1/i })).toHaveAttribute(
    'data-slot',
    'pagination-item',
  );
  expect(screen.getByRole('button', { name: /page 1/i })).toHaveAttribute('data-selected');
});

test('uses Ark translations for the navigation landmark label', () => {
  render(
    <Pagination count={20} pageSize={10} translations={{ rootLabel: 'Page navigation' }}>
      <PageItems />
    </Pagination>,
  );

  expect(screen.getByRole('navigation', { name: 'Page navigation' })).toBeInTheDocument();
});

test('renders a long range with ellipses and keeps edge trigger boundaries in sync', async () => {
  const { container } = render(
    <Pagination count={200} defaultPage={10} pageSize={10} siblingCount={1}>
      <PaginationFirstTrigger />
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
      <PaginationLastTrigger />
    </Pagination>,
  );

  expect(screen.getAllByText('...')).toHaveLength(2);
  const firstTrigger = screen.getByRole('button', { name: 'first page' });
  const lastTrigger = screen.getByRole('button', { name: 'last page' });

  expect(firstTrigger).toHaveAttribute('data-slot', 'pagination-first-trigger');
  expect(lastTrigger).toHaveAttribute('data-slot', 'pagination-last-trigger');

  fireEvent.click(firstTrigger);
  await waitFor(() =>
    expect(
      container.querySelector('[data-slot="pagination-item"][data-selected]'),
    ).toHaveTextContent('1'),
  );
  expect(firstTrigger).toBeDisabled();
  expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();

  fireEvent.click(lastTrigger);
  await waitFor(() =>
    expect(
      container.querySelector('[data-slot="pagination-item"][data-selected]'),
    ).toHaveTextContent('20'),
  );
  expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  expect(lastTrigger).toBeDisabled();
});

test('keeps controlled page changes and Ark callback details intact', async () => {
  const changes: number[] = [];

  function ControlledPagination() {
    const [page, setPage] = useState(1);

    return (
      <Pagination
        count={30}
        page={page}
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

  render(<ControlledPagination />);
  fireEvent.click(screen.getByRole('button', { name: /page 2/i }));

  await waitFor(() => expect(changes).toEqual([2]));
  expect(screen.getByRole('button', { name: /page 2/i })).toHaveAttribute('data-selected');
});

test('renders Ark link mode with generated page URLs', () => {
  render(
    <Pagination
      count={30}
      pageSize={10}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <PaginationPrevTrigger asChild>
        <a>Previous</a>
      </PaginationPrevTrigger>
      <PaginationContext>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={index} asChild {...page}>
                <a>{page.value}</a>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index} />
            ),
          )
        }
      </PaginationContext>
      <PaginationNextTrigger asChild>
        <a>Next</a>
      </PaginationNextTrigger>
    </Pagination>,
  );

  expect(screen.getByRole('link', { name: /page 2/i })).toHaveAttribute('href', '?page=2');
});

test('exposes usePagination state through RootProvider and context', async () => {
  function PageValue() {
    const pagination = usePaginationContext();
    return <output>Page {pagination.page}</output>;
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

  render(<ProviderPagination />);

  expect(screen.getByText('Page 2')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /next page/i }));
  await waitFor(() => expect(screen.getByText('Page 3')).toBeInTheDocument());
});
