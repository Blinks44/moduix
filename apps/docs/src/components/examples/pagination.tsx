import { createListCollection } from '@ark-ui/react/collection';
import { Pagination, Portal, Select, usePagination } from '@moduix/react';
import { useState, type CSSProperties } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

const stackStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 'var(--spacing-3)',
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-2)',
};

const textStyle: CSSProperties = {
  color: 'var(--color-muted-foreground)',
  fontSize: 'var(--text-sm)',
  lineHeight: 'var(--line-height-text-sm)',
};

const userListStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '24rem',
  maxWidth: '100%',
};

const userItemStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 'var(--spacing-3)',
  border: 'var(--border-width-sm) solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--spacing-3)',
  background: 'var(--color-muted)',
};

const customPaginationStyle = {
  '--pagination-item-radius': 'var(--radius-sm)',
  '--pagination-item-bg-selected': 'var(--color-primary)',
  '--pagination-item-color-selected': 'var(--color-primary-foreground)',
  '--pagination-item-border-color-selected': 'var(--color-primary)',
} as CSSProperties;

const pageSizeSelectStyle = {
  '--select-width': '5.5rem',
} as CSSProperties;

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
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
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

export const paginationPlaygroundCssProperties: CssPropertyInput[] = [
  ['--pagination-gap', 'var(--spacing-1)', 'Controls gap between pagination parts.'],
  ['--pagination-icon-size', '1rem', 'Controls trigger icon size.'],
  ['--pagination-item-bg', 'var(--color-background)', 'Controls item background color.'],
  ['--pagination-item-bg-hover', 'var(--color-accent)', 'Controls hover background.'],
  ['--pagination-item-bg-selected', 'var(--color-foreground)', 'Controls selected background.'],
  ['--pagination-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  [
    '--pagination-item-border-color-selected',
    'var(--color-foreground)',
    'Controls selected border color.',
  ],
  ['--pagination-item-color-selected', 'var(--color-background)', 'Controls selected text color.'],
  ['--pagination-item-padding-inline', '0.75rem', 'Controls item horizontal padding.'],
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-lg)', 'Controls item width and height.'],
];

const paginationCssPropertiesReference = paginationOverrideCssProperties.map(normalizeCssProperty);
const paginationCssPlaygroundReference =
  paginationPlaygroundCssProperties.map(normalizeCssProperty);

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
      collection={pageSizes}
      style={pageSizeSelectStyle}
      value={[String(pageSize)]}
      positioning={{ sameWidth: true }}
      onValueChange={(details) => {
        const nextValue = details.value[0];
        if (nextValue) {
          setPageSize(Number(nextValue));
        }
      }}
    >
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
            <Portal>
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
            </Portal>
          ) : null
        }
      </Select.Context>
      <Select.HiddenSelect />
    </Select>
  );
}

export function PaginationCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={paginationCssPropertiesReference} />;
}

export function PaginationCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={paginationCssPlaygroundReference}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function PaginationExample() {
  return (
    <Pagination count={200} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
    </Pagination>
  );
}

export function PaginationControlledExample() {
  const [page, setPage] = useState(5);

  return (
    <div style={stackStyle}>
      <Pagination
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
      <p style={textStyle}>Current page: {page}</p>
    </div>
  );
}

export function PaginationContextExample() {
  return (
    <Pagination count={200} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div style={rowStyle}>
            <button type="button" onClick={() => pagination.goToFirstPage()}>
              First
            </button>
            <button type="button" onClick={() => pagination.goToPrevPage()}>
              Prev
            </button>
            <p style={{ ...textStyle, minWidth: '7rem', textAlign: 'center' }}>
              Page {pagination.page} of {pagination.totalPages}
            </p>
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
    <Pagination count={users.length} pageSize={4} style={stackStyle}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <div style={userListStyle}>
              {pagination.slice(users).map((user) => (
                <div key={user.id} style={userItemStyle}>
                  <strong>{user.name}</strong>
                  <span style={textStyle}>{user.email}</span>
                </div>
              ))}
            </div>
            <div style={rowStyle}>
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
          </>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationLinkExample() {
  return (
    <Pagination
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
    <Pagination count={200} pageSize={10} style={stackStyle}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <div style={rowStyle}>
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
            <p style={textStyle}>
              Showing {pagination.pageRange.start + 1}-{pagination.pageRange.end} of{' '}
              {pagination.count} results
            </p>
          </>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationPageSizeControlExample() {
  return (
    <Pagination count={200} defaultPageSize={10} style={stackStyle}>
      <Pagination.Context>
        {(pagination) => (
          <>
            <label style={rowStyle}>
              <span style={textStyle}>Items per page</span>
              <PaginationPageSizeSelect
                pageSize={pagination.pageSize}
                setPageSize={pagination.setPageSize}
              />
            </label>
            <div style={rowStyle}>
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
            <p style={textStyle}>
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </>
        )}
      </Pagination.Context>
    </Pagination>
  );
}

export function PaginationRootProviderExample() {
  const pagination = usePagination({ count: 200, pageSize: 10, siblingCount: 2 });

  return (
    <div style={stackStyle}>
      <button type="button" onClick={() => pagination.goToNextPage()}>
        Next page
      </button>
      <Pagination.RootProvider value={pagination}>
        <Pagination.PrevTrigger />
        <PaginationItems />
        <Pagination.NextTrigger />
      </Pagination.RootProvider>
    </div>
  );
}

export function PaginationWithEdgesExample() {
  return (
    <Pagination count={400} pageSize={20} siblingCount={2}>
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
    <Pagination count={200} defaultPage={5} pageSize={10} style={customPaginationStyle}>
      <Pagination.PrevTrigger />
      <PaginationItems />
      <Pagination.NextTrigger />
    </Pagination>
  );
}