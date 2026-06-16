import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  usePagination,
} from 'moduix';
import { useState, type CSSProperties } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

const stackStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 'var(--spacing-3)',
};

const codeStyle: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
};

const customPaginationStyle: CSSProperties = {
  '--pagination-item-radius': 'var(--radius-sm)',
  '--pagination-item-bg-active': 'var(--color-primary)',
  '--pagination-item-color-active': 'var(--color-primary-foreground)',
  '--pagination-item-border-color-active': 'var(--color-primary)',
} as CSSProperties;

export const paginationOverrideCssProperties: CssPropertyInput[] = [
  [
    '--pagination-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled pagination opacity.',
  ],
  ['--pagination-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--pagination-font-size', 'var(--text-sm)', 'Controls pagination font size.'],
  ['--pagination-font-weight', 'var(--weight-medium)', 'Controls pagination font weight.'],
  ['--pagination-gap', 'var(--spacing-1)', 'Controls gap between pagination items.'],
  ['--pagination-icon-size', '1rem', 'Controls previous and next icon size.'],
  ['--pagination-item-bg', 'var(--color-background)', 'Controls item background color.'],
  [
    '--pagination-item-bg-active',
    'var(--color-foreground)',
    'Controls active item background color.',
  ],
  ['--pagination-item-bg-hover', 'var(--color-accent)', 'Controls hover item background color.'],
  ['--pagination-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  [
    '--pagination-item-border-color-active',
    'var(--color-foreground)',
    'Controls active item border color.',
  ],
  ['--pagination-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  ['--pagination-item-color-active', 'var(--color-background)', 'Controls active item text color.'],
  ['--pagination-item-padding-inline', '0.75rem', 'Controls item horizontal padding.'],
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-lg)', 'Controls item minimum width and height.'],
  ['--pagination-line-height', 'var(--line-height-text-sm)', 'Controls pagination line height.'],
];

export const paginationPlaygroundCssProperties: CssPropertyInput[] = [
  ['--pagination-gap', 'var(--spacing-1)', 'Controls gap between pagination items.'],
  ['--pagination-icon-size', '1rem', 'Controls previous and next icon size.'],
  ['--pagination-item-bg', 'var(--color-background)', 'Controls item background color.'],
  [
    '--pagination-item-bg-active',
    'var(--color-foreground)',
    'Controls active item background color.',
  ],
  ['--pagination-item-bg-hover', 'var(--color-accent)', 'Controls hover item background color.'],
  ['--pagination-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  [
    '--pagination-item-border-color-active',
    'var(--color-foreground)',
    'Controls active item border color.',
  ],
  ['--pagination-item-color-active', 'var(--color-background)', 'Controls active item text color.'],
  ['--pagination-item-padding-inline', '0.75rem', 'Controls item horizontal padding.'],
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-lg)', 'Controls item minimum width and height.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function PaginationCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={paginationOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function PaginationCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={paginationPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function PaginationExample() {
  const [page, setPage] = useState(5);
  const pagination = usePagination({ count: 10, page });

  return (
    <div style={stackStyle}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!pagination.canPreviousPage || undefined}
              onClick={() => {
                if (pagination.canPreviousPage) {
                  setPage(pagination.previousPage);
                }
              }}
            />
          </PaginationItem>
          {pagination.items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {typeof item !== 'number' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink isActive={item === pagination.page} onClick={() => setPage(item)}>
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              aria-disabled={!pagination.canNextPage || undefined}
              onClick={() => {
                if (pagination.canNextPage) {
                  setPage(pagination.nextPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div style={codeStyle}>Current page: {page}</div>
    </div>
  );
}

export function PaginationCompactExample() {
  const [page, setPage] = useState(5);

  return (
    <div style={stackStyle}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page === 1 || undefined}
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 4} onClick={() => setPage(4)}>
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 5} onClick={() => setPage(5)}>
              5
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 6} onClick={() => setPage(6)}>
              6
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              aria-disabled={page === 10 || undefined}
              onClick={() => {
                if (page < 10) {
                  setPage(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div style={codeStyle}>Current page: {page}</div>
    </div>
  );
}

export function PaginationControlledExample() {
  const [page, setPage] = useState(5);
  const pagination = usePagination({ count: 10, page });

  return (
    <div style={stackStyle}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!pagination.canPreviousPage || undefined}
              onClick={() => {
                if (pagination.canPreviousPage) {
                  setPage(pagination.previousPage);
                }
              }}
            />
          </PaginationItem>
          {pagination.items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {typeof item !== 'number' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink isActive={item === pagination.page} onClick={() => setPage(item)}>
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              aria-disabled={!pagination.canNextPage || undefined}
              onClick={() => {
                if (pagination.canNextPage) {
                  setPage(pagination.nextPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div style={codeStyle}>Current page: {page}</div>
    </div>
  );
}

export function PaginationDensityExample() {
  const [page, setPage] = useState(12);
  const pagination = usePagination({
    boundaryCount: 2,
    count: 24,
    page,
    siblingCount: 2,
  });

  return (
    <div style={stackStyle}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!pagination.canPreviousPage || undefined}
              onClick={() => {
                if (pagination.canPreviousPage) {
                  setPage(pagination.previousPage);
                }
              }}
            />
          </PaginationItem>
          {pagination.items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {typeof item !== 'number' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink isActive={item === pagination.page} onClick={() => setPage(item)}>
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              aria-disabled={!pagination.canNextPage || undefined}
              onClick={() => {
                if (pagination.canNextPage) {
                  setPage(pagination.nextPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div style={codeStyle}>Current page: {page}</div>
    </div>
  );
}

export function PaginationClassNameExample() {
  const [page, setPage] = useState(5);
  const pagination = usePagination({ count: 10, page });

  return (
    <Pagination className="customPagination" style={customPaginationStyle}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!pagination.canPreviousPage || undefined}
            onClick={() => {
              if (pagination.canPreviousPage) {
                setPage(pagination.previousPage);
              }
            }}
          />
        </PaginationItem>
        {pagination.items.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {typeof item !== 'number' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={item === pagination.page} onClick={() => setPage(item)}>
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            aria-disabled={!pagination.canNextPage || undefined}
            onClick={() => {
              if (pagination.canNextPage) {
                setPage(pagination.nextPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}