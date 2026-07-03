import { createListCollection } from '@ark-ui/react/collection';
import { usePagination } from '@ark-ui/react/pagination';
import { Pagination, Select } from '@moduix/react';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const users = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com' },
  { id: 2, name: 'Liam Johnson', email: 'liam@example.com' },
  { id: 3, name: 'Olivia Brown', email: 'olivia@example.com' },
  { id: 4, name: 'Noah Davis', email: 'noah@example.com' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com' },
  { id: 6, name: 'Ethan Garcia', email: 'ethan@example.com' },
  { id: 7, name: 'Sophia Rodriguez', email: 'sophia@example.com' },
  { id: 8, name: 'Mason Lee', email: 'mason@example.com' },
  { id: 9, name: 'Isabella Walker', email: 'isabella@example.com' },
  { id: 10, name: 'James Hall', email: 'james@example.com' },
  { id: 11, name: 'Mia Allen', email: 'mia@example.com' },
  { id: 12, name: 'Benjamin Young', email: 'benjamin@example.com' },
];

const pageSizes = createListCollection({
  items: [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
  ],
});

export const paginationExampleCss = `
  .pagination-demo {
    display: flex;
    width: fit-content;
  }

  .pagination-stack {
    display: grid;
    gap: var(--spacing-3);
    justify-items: start;
  }

  .pagination-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-3);
  }

  .pagination-muted {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

  .pagination-users {
    display: grid;
    gap: var(--spacing-2);
    width: 24rem;
    max-width: 100%;
  }

  .pagination-user {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-3);
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-3);
    background: var(--color-muted);
  }

  .pagination-page-size-select {
    --select-width: 5.5rem;
  }
`;

export const paginationCustomStylingCss = `
  .custom-pagination {
    --pagination-item-radius: var(--radius-sm);
    --pagination-item-bg-selected: var(--color-primary);
    --pagination-item-color-selected: var(--color-primary-foreground);
    --pagination-item-border-color-selected: var(--color-primary);
  }
`;

export const paginationUsersData = `const users = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com' },
  { id: 2, name: 'Liam Johnson', email: 'liam@example.com' },
  { id: 3, name: 'Olivia Brown', email: 'olivia@example.com' },
  { id: 4, name: 'Noah Davis', email: 'noah@example.com' },
  { id: 5, name: 'Ava Martinez', email: 'ava@example.com' },
  { id: 6, name: 'Ethan Garcia', email: 'ethan@example.com' },
  { id: 7, name: 'Sophia Rodriguez', email: 'sophia@example.com' },
  { id: 8, name: 'Mason Lee', email: 'mason@example.com' },
  { id: 9, name: 'Isabella Walker', email: 'isabella@example.com' },
  { id: 10, name: 'James Hall', email: 'james@example.com' },
  { id: 11, name: 'Mia Allen', email: 'mia@example.com' },
  { id: 12, name: 'Benjamin Young', email: 'benjamin@example.com' },
];`;

export const paginationNoData = `const data = null;`;

export const paginationOverrideCssProperties: CssPropertyInput[] = [
  ['--pagination-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--pagination-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--pagination-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--pagination-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--pagination-focus-ring-offset', '-1px', 'Controls focus ring offset.'],
  ['--pagination-focus-ring-width', 'var(--border-width-md)', 'Controls focus ring width.'],
  ['--pagination-font-size', 'var(--text-sm)', 'Controls pagination font size.'],
  ['--pagination-font-weight', 'var(--weight-medium)', 'Controls pagination font weight.'],
  ['--pagination-gap', 'var(--spacing-1)', 'Controls gap between pagination parts.'],
  ['--pagination-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--pagination-item-bg', 'var(--color-background)', 'Controls item background color.'],
  [
    '--pagination-item-bg-hover',
    'var(--color-accent)',
    'Controls item and trigger hover background.',
  ],
  [
    '--pagination-item-bg-selected',
    'var(--color-foreground)',
    'Controls selected item background color.',
  ],
  ['--pagination-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  [
    '--pagination-item-border-color-selected',
    'var(--color-foreground)',
    'Controls selected item border color.',
  ],
  ['--pagination-item-border-width', 'var(--border-width-sm)', 'Controls item border width.'],
  ['--pagination-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  [
    '--pagination-item-color-selected',
    'var(--color-background)',
    'Controls selected item text color.',
  ],
  ['--pagination-item-padding-inline', '0.75rem', 'Controls item horizontal padding.'],
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-lg)', 'Controls item width and height.'],
  ['--pagination-line-height', 'var(--line-height-text-sm)', 'Controls pagination line height.'],
  ['--pagination-transition', 'var(--transition-default)', 'Controls state transitions.'],
  ['--pagination-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
];

const paginationCssPropertiesReference = paginationOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function PaginationItems() {
  return (
    <Pagination.Context>
      {(pagination) =>
        pagination.pages.map((page, index) =>
          page.type === 'page' ? (
            <Pagination.Item key={index} {...page}>
              {page.value}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis key={index} index={index} />
          ),
        )
      }
    </Pagination.Context>
  );
}

function PaginationPageSizeSelect({
  pageSize,
  setPageSize,
}: {
  pageSize: number;
  setPageSize: (nextPageSize: number) => void;
}) {
  return (
    <Select
      className="pagination-page-size-select"
      collection={pageSizes}
      value={[String(pageSize)]}
      positioning={{ sameWidth: true }}
      onValueChange={(details) => {
        const nextValue = details.value[0];
        if (nextValue) {
          setPageSize(Number(nextValue));
        }
      }}
    >
      <Select.Label>Items per page</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Page size" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Context>
        {(select) =>
          select.open ? (
            <Select.Positioner>
              <Select.Content>
                {pageSizes.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          ) : null
        }
      </Select.Context>
      <Select.HiddenSelect />
    </Select>
  );
}

export function PaginationCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={paginationCssPropertiesReference} />;
}

export function PaginationExample() {
  return (
    <Pagination className="pagination-demo" count={200} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
    </Pagination>
  );
}

export function PaginationControlledExample() {
  const [page, setPage] = useState(5);

  return (
    <div className="pagination-stack">
      <Pagination
        className="pagination-demo"
        count={200}
        page={page}
        pageSize={10}
        siblingCount={2}
        onPageChange={(details) => setPage(details.page)}
      >
        <Pagination.PrevTrigger />
        <PaginationItems />
        <Pagination.NextTrigger />
      </Pagination>
      <p className="pagination-muted">Current page: {page}</p>
    </div>
  );
}

export function PaginationContextExample() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-row">
            <button type="button" onClick={() => pagination.goToFirstPage()}>
              First
            </button>
            <button type="button" onClick={() => pagination.goToPrevPage()}>
              Prev
            </button>
            <span className="pagination-muted">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button type="button" onClick={() => pagination.goToNextPage()}>
              Next
            </button>
            <button type="button" onClick={() => pagination.goToLastPage()}>
              Last
            </button>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationCustomizedExample() {
  return (
    <Pagination
      className="pagination-demo"
      count={400}
      pageSize={20}
      siblingCount={3}
      translations={{
        nextTriggerLabel: 'Next page',
        prevTriggerLabel: 'Previous page',
        itemLabel: (details) => `Page ${details.page}`,
      }}
    >
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
    </Pagination>
  );
}

export function PaginationDataSlicingExample() {
  return (
    <Pagination count={users.length} pageSize={4}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-stack">
            <div className="pagination-users">
              {pagination.slice(users).map((user) => (
                <div key={user.id} className="pagination-user">
                  <strong>{user.name}</strong>
                  <span className="pagination-muted">{user.email}</span>
                </div>
              ))}
            </div>
            <div className="pagination-row">
              <Pagination.PrevTrigger />
              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} />
                ),
              )}
              <Pagination.NextTrigger />
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationLinkExample() {
  return (
    <Pagination
      className="pagination-demo"
      count={200}
      pageSize={10}
      siblingCount={2}
      type="link"
      getPageUrl={(details) => `?page=${details.page}`}
    >
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
    </Pagination>
  );
}

export function PaginationPageRangeExample() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-stack">
            <div className="pagination-row">
              <Pagination.PrevTrigger />
              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} />
                ),
              )}
              <Pagination.NextTrigger />
            </div>
            <p className="pagination-muted">
              Showing {pagination.pageRange.start + 1}-{pagination.pageRange.end} of{' '}
              {pagination.count} results
            </p>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationPageSizeControlExample() {
  return (
    <Pagination count={200} defaultPageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div className="pagination-stack">
            <div className="pagination-row">
              <PaginationPageSizeSelect
                pageSize={pagination.pageSize}
                setPageSize={pagination.setPageSize}
              />
            </div>
            <div className="pagination-row">
              <Pagination.PrevTrigger />
              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index} />
                ),
              )}
              <Pagination.NextTrigger />
            </div>
            <p className="pagination-muted">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </div>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationRootProviderExample() {
  const pagination = usePagination({ count: 200, pageSize: 10, siblingCount: 2 });

  return (
    <div className="pagination-stack">
      <button type="button" onClick={() => pagination.goToNextPage()}>
        Next page
      </button>
      <Pagination.RootProvider className="pagination-demo" value={pagination}>
        <Pagination.PrevTrigger />
        <PaginationItems />
        <Pagination.NextTrigger />
      </Pagination.RootProvider>
    </div>
  );
}

export function PaginationWithEdgesExample() {
  return (
    <Pagination className="pagination-demo" count={400} pageSize={20} siblingCount={2}>
      <Pagination.FirstTrigger />
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
      <Pagination.LastTrigger />
    </Pagination>
  );
}

export function PaginationCustomStylingExample() {
  return (
    <Pagination className="custom-pagination" count={200} defaultPage={5} pageSize={10}>
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
    </Pagination>
  );
}