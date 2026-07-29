import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Pagination, usePagination, usePaginationContext } from '../src';

function PageItems() {
  return (
    <>
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
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

  expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveAttribute(
    'data-slot',
    'pagination-root',
  );
  expect(ref.current).toHaveAttribute('data-slot', 'pagination-root');
  expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
  expect(screen.getByRole('button', { name: /next page/i })).not.toBeDisabled();
  expect(screen.getByRole('button', { name: /page 1/i })).toHaveAttribute('data-selected');
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
      <Pagination.PrevTrigger asChild>
        <a>Previous</a>
      </Pagination.PrevTrigger>
      <Pagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <Pagination.Item key={index} asChild {...page}>
                <a>{page.value}</a>
              </Pagination.Item>
            ) : (
              <Pagination.Ellipsis key={index} index={index} />
            ),
          )
        }
      </Pagination.Context>
      <Pagination.NextTrigger asChild>
        <a>Next</a>
      </Pagination.NextTrigger>
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
      <Pagination.RootProvider value={pagination}>
        <PageItems />
        <PageValue />
      </Pagination.RootProvider>
    );
  }

  render(<ProviderPagination />);

  expect(screen.getByText('Page 2')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /next page/i }));
  await waitFor(() => expect(screen.getByText('Page 3')).toBeInTheDocument());
});