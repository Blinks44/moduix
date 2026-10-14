import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { children, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Table.module.css';

type TableDataProps = {};

type TableProps = HTMLArkProps<'table'> &
  TableDataProps & {
    interactive?: boolean;
    showColumnBorder?: boolean;
    size?: 'sm' | 'md' | 'lg';
    stickyHeader?: boolean;
    striped?: boolean;
    variant?: 'line' | 'outline';
    'data-interactive'?: string | boolean;
    'data-show-column-border'?: string | boolean;
    'data-sticky-header'?: string | boolean;
    'data-striped'?: string | boolean;
  };

type TableScrollAreaProps = HTMLArkProps<'div'> & TableDataProps;
type TableCaptionProps = HTMLArkProps<'caption'> &
  TableDataProps & {
    side?: 'top' | 'bottom';
  };
type TableColumnGroupProps = HTMLArkProps<'colgroup'> & TableDataProps;
type TableColumnProps = HTMLArkProps<'col'> &
  TableDataProps & {
    htmlWidth?: string | number;
  };
type TableHeaderProps = HTMLArkProps<'thead'> & TableDataProps;
type TableBodyProps = HTMLArkProps<'tbody'> & TableDataProps;
type TableFooterProps = HTMLArkProps<'tfoot'> & TableDataProps;
type TableRowProps = HTMLArkProps<'tr'> & TableDataProps;
type TableColumnHeaderProps = HTMLArkProps<'th'> &
  TableDataProps & {
    numeric?: boolean;
    'data-numeric'?: string | boolean;
  };
type TableCellProps = HTMLArkProps<'td'> &
  TableDataProps & {
    numeric?: boolean;
    'data-numeric'?: string | boolean;
  };
type TableEmptyProps = HTMLArkProps<'td'> &
  TableDataProps & {
    colSpan: number;
  };

function Table(props: TableProps) {
  const [local, others] = splitProps(props, [
    'class',
    'data-interactive',
    'data-show-column-border',
    'data-sticky-header',
    'data-striped',
    'interactive',
    'showColumnBorder',
    'size',
    'stickyHeader',
    'striped',
    'variant',
  ]);

  return (
    <ark.table
      {...others}
      data-scope="table"
      data-part="root"
      data-slot="table-root"
      data-interactive={local.interactive || undefined}
      data-show-column-border={local.showColumnBorder || undefined}
      data-size={local.size ?? 'md'}
      data-sticky-header={local.stickyHeader || undefined}
      data-striped={local.striped || undefined}
      data-variant={local.variant ?? 'line'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function TableScrollArea(props: TableScrollAreaProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      {...others}
      data-scope="table"
      data-part="scroll-area"
      data-slot="table-scroll-area"
      class={clsx(styles.scrollArea, local.class)}
    />
  );
}

function TableCaption(props: TableCaptionProps) {
  const [local, others] = splitProps(props, ['class', 'side']);

  return (
    <ark.caption
      {...others}
      data-scope="table"
      data-part="caption"
      data-side={local.side ?? 'bottom'}
      data-slot="table-caption"
      class={clsx(styles.caption, local.class)}
    />
  );
}

function TableColumnGroup(props: TableColumnGroupProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.colgroup
      {...others}
      data-scope="table"
      data-part="column-group"
      data-slot="table-column-group"
      class={local.class}
    />
  );
}

function TableColumn(props: TableColumnProps) {
  const [local, others] = splitProps(props, ['class', 'htmlWidth', 'width']);

  return (
    <ark.col
      {...others}
      data-scope="table"
      data-part="column"
      data-slot="table-column"
      width={local.htmlWidth ?? local.width}
      class={local.class}
    />
  );
}

function TableHeader(props: TableHeaderProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.thead
      {...others}
      data-scope="table"
      data-part="header"
      data-slot="table-header"
      class={clsx(styles.header, local.class)}
    />
  );
}

function TableBody(props: TableBodyProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.tbody
      {...others}
      data-scope="table"
      data-part="body"
      data-slot="table-body"
      class={clsx(styles.body, local.class)}
    />
  );
}

function TableFooter(props: TableFooterProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.tfoot
      {...others}
      data-scope="table"
      data-part="footer"
      data-slot="table-footer"
      class={clsx(styles.footer, local.class)}
    />
  );
}

function TableRow(props: TableRowProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.tr
      {...others}
      data-scope="table"
      data-part="row"
      data-slot="table-row"
      class={clsx(styles.row, local.class)}
    />
  );
}

function TableColumnHeader(props: TableColumnHeaderProps) {
  const [local, others] = splitProps(props, ['class', 'data-numeric', 'numeric']);

  return (
    <ark.th
      {...others}
      data-scope="table"
      data-part="column-header"
      data-numeric={local.numeric || undefined}
      data-slot="table-column-header"
      class={clsx(styles.columnHeader, local.numeric && styles.numeric, local.class)}
    />
  );
}

function TableCell(props: TableCellProps) {
  const [local, others] = splitProps(props, ['class', 'data-numeric', 'numeric']);

  return (
    <ark.td
      {...others}
      data-scope="table"
      data-part="cell"
      data-numeric={local.numeric || undefined}
      data-slot="table-cell"
      class={clsx(styles.cell, local.numeric && styles.numeric, local.class)}
    />
  );
}

function TableEmpty(props: TableEmptyProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'colSpan']);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.tr data-scope="table" data-part="row" data-empty data-slot="table-row" class={styles.row}>
      <ark.td
        {...others}
        data-scope="table"
        data-part="empty"
        data-slot="table-empty"
        colSpan={local.colSpan}
        class={clsx(styles.cell, styles.empty, local.class)}
      >
        {resolvedChildren() ?? a11yLabels.noResults}
      </ark.td>
    </ark.tr>
  );
}

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