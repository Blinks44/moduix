import { Pagination, type PaginationProps } from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './pagination.module.css';

export const paginationOverrideCssProperties: CssPropertyInput[] = [
  [
    '--pagination-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled pagination opacity.',
  ],
  ['--pagination-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--pagination-font-size', 'var(--text-sm)', 'Controls pagination font size.'],
  ['--pagination-font-weight', 'var(--weight-medium)', 'Controls pagination font weight.'],
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
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-lg)', 'Controls item width and height.'],
  ['--pagination-line-height', 'var(--line-height-text-sm)', 'Controls pagination line height.'],
  ['--pagination-toolbar-gap', 'var(--spacing-1)', 'Controls gap between items.'],
  ['--pagination-toolbar-padding', '0', 'Controls toolbar padding for all variants.'],
  [
    '--pagination-toolbar-padding-filled',
    '0.125rem',
    'Controls toolbar padding for default and outline variants.',
  ],
];

export const paginationPlaygroundCssProperties: CssPropertyInput[] = [
  ['--pagination-item-bg', 'var(--color-background)', 'Controls item background color.'],
  [
    '--pagination-item-bg-active',
    'var(--color-foreground)',
    'Controls active item background color.',
  ],
  ['--pagination-item-color-active', 'var(--color-background)', 'Controls active item text color.'],
  ['--pagination-item-border-color', 'var(--color-border)', 'Controls item border color.'],
  ['--pagination-item-radius', 'var(--radius-md)', 'Controls item corner radius.'],
  ['--pagination-item-size', 'var(--size-lg)', 'Controls item width and height.'],
  ['--pagination-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--pagination-toolbar-padding-filled', '0.125rem', 'Controls filled toolbar padding.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
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

export function PaginationExample(props: Omit<PaginationProps, 'count'>) {
  return <Pagination defaultPage={1} count={10} {...props} />;
}

export function PaginationNumbersOnlyExample() {
  return <Pagination count={10} defaultPage={5} showArrows={false} />;
}

export function PaginationArrowsOnlyExample() {
  return <Pagination count={10} defaultPage={5} showPages={false} />;
}

export function PaginationControlledLinksExample() {
  const [page, setPage] = React.useState(5);

  return (
    <div className={styles.stack}>
      <Pagination
        count={10}
        page={page}
        onPageChange={setPage}
        getPageHref={(next) => `?page=${next}`}
      />
      <div className={styles.code}>Current page: {page}</div>
    </div>
  );
}

export function PaginationVariantsExample() {
  return (
    <div className={styles.stack}>
      <Pagination count={10} defaultPage={5} toolbarVariant="default" />
      <Pagination count={10} defaultPage={5} toolbarVariant="outline" />
      <Pagination count={10} defaultPage={5} toolbarVariant="ghost" />
    </div>
  );
}

export function PaginationSizesExample() {
  return (
    <div className={styles.stack}>
      <Pagination count={10} defaultPage={5} size="xs" />
      <Pagination count={10} defaultPage={5} size="sm" />
      <Pagination count={10} defaultPage={5} size="md" />
      <Pagination count={10} defaultPage={5} size="lg" />
      <Pagination count={10} defaultPage={5} size="xl" />
    </div>
  );
}

export function PaginationClassNameExample() {
  return (
    <Pagination
      count={10}
      defaultPage={5}
      toolbarVariant="outline"
      className={styles.customPagination}
    />
  );
}