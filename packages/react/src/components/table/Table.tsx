import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Table.module.css';

type TableRootProps = HTMLArkProps<'table'> & {
  interactive?: boolean;
  showColumnBorder?: boolean;
  size?: 'sm' | 'md' | 'lg';
  stickyHeader?: boolean;
  striped?: boolean;
  variant?: 'line' | 'outline';
};

type TableScrollAreaProps = HTMLArkProps<'div'>;
type TableCaptionProps = HTMLArkProps<'caption'> & {
  side?: 'top' | 'bottom';
};
type TableColumnGroupProps = HTMLArkProps<'colgroup'>;
type TableColumnProps = HTMLArkProps<'col'> & {
  htmlWidth?: string | number;
};
type TableHeaderProps = HTMLArkProps<'thead'>;
type TableBodyProps = HTMLArkProps<'tbody'>;
type TableFooterProps = HTMLArkProps<'tfoot'>;
type TableRowProps = HTMLArkProps<'tr'>;
type TableColumnHeaderProps = HTMLArkProps<'th'> & {
  numeric?: boolean;
};
type TableCellProps = HTMLArkProps<'td'> & {
  numeric?: boolean;
};
type TableEmptyProps = HTMLArkProps<'td'> & {
  colSpan: number;
};

const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  {
    asChild,
    className,
    interactive = false,
    showColumnBorder = false,
    size = 'md',
    stickyHeader = false,
    striped = false,
    variant = 'line',
    ...props
  },
  ref,
) {
  return (
    <ark.table
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="root"
      data-slot="table-root"
      data-interactive={interactive || undefined}
      data-show-column-border={showColumnBorder || undefined}
      data-size={size}
      data-sticky-header={stickyHeader || undefined}
      data-striped={striped || undefined}
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableScrollArea = forwardRef<HTMLDivElement, TableScrollAreaProps>(function TableScrollArea(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="scroll-area"
      data-slot="table-scroll-area"
      className={clsx(styles.scrollArea, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption(
  { asChild, className, side = 'bottom', ...props },
  ref,
) {
  return (
    <ark.caption
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="caption"
      data-side={side}
      data-slot="table-caption"
      className={clsx(styles.caption, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableColumnGroup = forwardRef<HTMLTableColElement, TableColumnGroupProps>(
  function TableColumnGroup({ asChild, className, ...props }, ref) {
    return (
      <ark.colgroup
        ref={ref}
        asChild={asChild}
        data-scope="table"
        data-part="column-group"
        data-slot="table-column-group"
        className={normalizeClassName(className)}
        {...props}
      />
    );
  },
);

const TableColumn = forwardRef<HTMLTableColElement, TableColumnProps>(function TableColumn(
  { asChild, className, htmlWidth, width, ...props },
  ref,
) {
  return (
    <ark.col
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="column"
      data-slot="table-column"
      width={htmlWidth ?? width}
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(function TableHeader(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.thead
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="header"
      data-slot="table-header"
      className={clsx(styles.header, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.tbody
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="body"
      data-slot="table-body"
      className={clsx(styles.body, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(function TableFooter(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.tfoot
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="footer"
      data-slot="table-footer"
      className={clsx(styles.footer, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.tr
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="row"
      data-slot="table-row"
      className={clsx(styles.row, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableColumnHeader = forwardRef<HTMLTableCellElement, TableColumnHeaderProps>(
  function TableColumnHeader({ asChild, className, numeric = false, ...props }, ref) {
    return (
      <ark.th
        ref={ref}
        asChild={asChild}
        data-scope="table"
        data-part="column-header"
        data-numeric={numeric || undefined}
        data-slot="table-column-header"
        className={clsx(
          styles.columnHeader,
          numeric && styles.numeric,
          normalizeClassName(className),
        )}
        {...props}
      />
    );
  },
);

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { asChild, className, numeric = false, ...props },
  ref,
) {
  return (
    <ark.td
      ref={ref}
      asChild={asChild}
      data-scope="table"
      data-part="cell"
      data-numeric={numeric || undefined}
      data-slot="table-cell"
      className={clsx(styles.cell, numeric && styles.numeric, normalizeClassName(className))}
      {...props}
    />
  );
});

const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(function TableEmpty(
  { asChild, children = 'No results.', className, colSpan, ...props },
  ref,
) {
  return (
    <ark.tr
      data-scope="table"
      data-part="row"
      data-slot="table-row"
      className={clsx(styles.row, styles.emptyRow)}
    >
      <ark.td
        ref={ref}
        asChild={asChild}
        data-scope="table"
        data-part="empty"
        data-slot="table-empty"
        colSpan={colSpan}
        className={clsx(styles.cell, styles.empty, normalizeClassName(className))}
        {...props}
      >
        {children}
      </ark.td>
    </ark.tr>
  );
});

const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  ScrollArea: TableScrollArea,
  Caption: TableCaption,
  ColumnGroup: TableColumnGroup,
  Column: TableColumn,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  ColumnHeader: TableColumnHeader,
  Cell: TableCell,
  Empty: TableEmpty,
});

export { Table };