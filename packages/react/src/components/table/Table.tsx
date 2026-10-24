import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Table.module.css';

type TableSize = 'sm' | 'md' | 'lg';
type TableRootProps = HTMLArkProps<'table'> & {
  interactive?: boolean;
  showColumnBorder?: boolean;
  size?: TableSize;
  stickyHeader?: boolean;
  striped?: boolean;
};
type TableCaptionProps = HTMLArkProps<'caption'> & {
  side?: 'top' | 'bottom';
};
type TableColumnHeaderProps = HTMLArkProps<'th'> & {
  numeric?: boolean;
};
type TableCellProps = HTMLArkProps<'td'> & {
  numeric?: boolean;
};
type TableEmptyProps = HTMLArkProps<'td'> & {
  colSpan: number;
};

const Table = forwardRef<HTMLTableElement, TableRootProps>(function Table(
  {
    className,
    interactive = false,
    showColumnBorder = false,
    size = 'md',
    stickyHeader = false,
    striped = false,
    ...props
  },
  ref,
) {
  return (
    <ark.table
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-scope="table"
      data-part="root"
      data-interactive={interactive || undefined}
      data-show-column-border={showColumnBorder || undefined}
      data-size={size}
      data-sticky-header={stickyHeader || undefined}
      data-striped={striped || undefined}
      data-slot="table-root"
    />
  );
});

const TableScrollArea = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function TableScrollArea(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      className={clsx(styles.scrollArea, className)}
      {...props}
      data-scope="table"
      data-part="scroll-area"
      data-slot="table-scroll-area"
    />
  );
});

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(function TableCaption(
  { className, side = 'bottom', ...props },
  ref,
) {
  return (
    <ark.caption
      ref={ref}
      className={clsx(styles.caption, className)}
      {...props}
      data-scope="table"
      data-part="caption"
      data-side={side}
      data-slot="table-caption"
    />
  );
});

const TableColumnGroup = forwardRef<HTMLTableColElement, HTMLArkProps<'colgroup'>>(
  function TableColumnGroup(props, ref) {
    return (
      <ark.colgroup
        ref={ref}
        {...props}
        data-scope="table"
        data-part="column-group"
        data-slot="table-column-group"
      />
    );
  },
);

const TableColumn = forwardRef<HTMLTableColElement, HTMLArkProps<'col'>>(
  function TableColumn(props, ref) {
    return (
      <ark.col
        ref={ref}
        {...props}
        data-scope="table"
        data-part="column"
        data-slot="table-column"
      />
    );
  },
);

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLArkProps<'thead'>>(function TableHeader(
  { className, ...props },
  ref,
) {
  return (
    <ark.thead
      ref={ref}
      className={clsx(styles.header, className)}
      {...props}
      data-scope="table"
      data-part="header"
      data-slot="table-header"
    />
  );
});

const TableBody = forwardRef<HTMLTableSectionElement, HTMLArkProps<'tbody'>>(function TableBody(
  { className, ...props },
  ref,
) {
  return (
    <ark.tbody
      ref={ref}
      className={clsx(styles.body, className)}
      {...props}
      data-scope="table"
      data-part="body"
      data-slot="table-body"
    />
  );
});

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLArkProps<'tfoot'>>(function TableFooter(
  { className, ...props },
  ref,
) {
  return (
    <ark.tfoot
      ref={ref}
      className={clsx(styles.footer, className)}
      {...props}
      data-scope="table"
      data-part="footer"
      data-slot="table-footer"
    />
  );
});

const TableRow = forwardRef<HTMLTableRowElement, HTMLArkProps<'tr'>>(function TableRow(
  { className, ...props },
  ref,
) {
  return (
    <ark.tr
      ref={ref}
      className={clsx(styles.row, className)}
      {...props}
      data-scope="table"
      data-part="row"
      data-slot="table-row"
    />
  );
});

const TableColumnHeader = forwardRef<HTMLTableCellElement, TableColumnHeaderProps>(
  function TableColumnHeader({ className, numeric = false, ...props }, ref) {
    return (
      <ark.th
        ref={ref}
        className={clsx(styles.columnHeader, numeric && styles.numeric, className)}
        {...props}
        data-scope="table"
        data-part="column-header"
        data-numeric={numeric || undefined}
        data-slot="table-column-header"
      />
    );
  },
);

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, numeric = false, ...props },
  ref,
) {
  return (
    <ark.td
      ref={ref}
      className={clsx(styles.cell, numeric && styles.numeric, className)}
      {...props}
      data-scope="table"
      data-part="cell"
      data-numeric={numeric || undefined}
      data-slot="table-cell"
    />
  );
});

const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(function TableEmpty(
  { children = a11yLabels.noResults, className, ...props },
  ref,
) {
  return (
    <TableRow data-empty>
      <ark.td
        ref={ref}
        className={clsx(styles.cell, styles.empty, className)}
        {...props}
        data-scope="table"
        data-part="empty"
        data-slot="table-empty"
      >
        {children}
      </ark.td>
    </TableRow>
  );
});

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableColumnHeader,
  TableEmpty,
  TableFooter,
  TableHeader,
  TableRow,
  TableScrollArea,
};
export type { TableRootProps, TableSize };