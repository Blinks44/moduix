import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import { children, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Table.module.css';

type TableSize = 'sm' | 'md' | 'lg';
type TableRootProps = HTMLArkProps<'table'> & {
  interactive?: boolean;
  showColumnBorder?: boolean;
  size?: TableSize;
  stickyHeader?: boolean;
  striped?: boolean;
  'data-interactive'?: string | boolean;
  'data-show-column-border'?: string | boolean;
  'data-sticky-header'?: string | boolean;
  'data-striped'?: string | boolean;
};
type TableCaptionProps = HTMLArkProps<'caption'> & {
  side?: 'top' | 'bottom';
};
type TableColumnHeaderProps = HTMLArkProps<'th'> & {
  numeric?: boolean;
  'data-numeric'?: string | boolean;
};
type TableCellProps = HTMLArkProps<'td'> & {
  numeric?: boolean;
  'data-numeric'?: string | boolean;
};
type TableEmptyProps = HTMLArkProps<'td'> & {
  colSpan: number;
};

function Table(props: TableRootProps) {
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
      class={clsx(styles.root, local.class)}
    />
  );
}

function TableScrollArea(props: HTMLArkProps<'div'>) {
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

function TableColumnGroup(props: HTMLArkProps<'colgroup'>) {
  return (
    <ark.colgroup
      {...props}
      data-scope="table"
      data-part="column-group"
      data-slot="table-column-group"
    />
  );
}

function TableColumn(props: HTMLArkProps<'col'>) {
  return <ark.col {...props} data-scope="table" data-part="column" data-slot="table-column" />;
}

function TableHeader(props: HTMLArkProps<'thead'>) {
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

function TableBody(props: HTMLArkProps<'tbody'>) {
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

function TableFooter(props: HTMLArkProps<'tfoot'>) {
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

function TableRow(props: HTMLArkProps<'tr'>) {
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
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TableRow data-empty>
      <ark.td
        {...others}
        data-scope="table"
        data-part="empty"
        data-slot="table-empty"
        class={clsx(styles.cell, styles.empty, local.class)}
      >
        {resolvedChildren() ?? a11yLabels.noResults}
      </ark.td>
    </TableRow>
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
export type { TableRootProps, TableSize };