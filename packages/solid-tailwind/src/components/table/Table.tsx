import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { children, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';

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

const tableVariants = cva('group/table isolate w-full border-collapse text-start text-foreground', {
  variants: {
    size: {
      sm: 'text-xs leading-4',
      md: 'text-sm leading-5',
      lg: 'text-md leading-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cellClass =
  'relative z-0 border-border px-4 py-3 group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-sticky:sticky data-sticky:z-2 data-sticky:bg-card data-sticky:bg-[image:linear-gradient(var(--_table-row-bg),var(--_table-row-bg))] data-[sticky=end]:end-0 data-[sticky=start]:start-0 group-data-[show-column-border]/table:not-last:border-e';
const numericClass = 'text-end whitespace-nowrap tabular-nums';

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
      class={cn(tableVariants({ size: local.size }), local.class)}
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
      class={cn(
        'relative w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-card',
        local.class,
      )}
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
      class={cn(
        'px-4 text-start text-sm leading-5 text-pretty text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=sm]/table:px-3 data-[side=bottom]:caption-bottom data-[side=bottom]:pt-3 data-[side=bottom]:pb-2 data-[side=top]:caption-top data-[side=top]:pt-2 data-[side=top]:pb-3',
        local.class,
      )}
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
      class={cn(
        'group-data-[sticky-header]/table:sticky group-data-[sticky-header]/table:top-0 group-data-[sticky-header]/table:z-3 group-data-[sticky-header]/table:bg-card',
        local.class,
      )}
    />
  );
}

function TableBody(props: HTMLArkProps<'tbody'>) {
  return <ark.tbody {...props} data-scope="table" data-part="body" data-slot="table-body" />;
}

function TableFooter(props: HTMLArkProps<'tfoot'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.tfoot
      {...others}
      data-scope="table"
      data-part="footer"
      data-slot="table-footer"
      class={cn('border-t border-border bg-muted font-medium', local.class)}
    />
  );
}

// Sticky cells repaint the row state over their own background through --_table-row-bg.
function TableRow(props: HTMLArkProps<'tr'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.tr
      {...others}
      data-scope="table"
      data-part="row"
      data-slot="table-row"
      class={cn(
        'border-border bg-(--_table-row-bg) [--_table-row-bg:initial] in-data-[slot=table-body]:not-last:border-b group-data-[striped]/table:in-data-[slot=table-body]:even:not-data-empty:[--_table-row-bg:color-mix(in_oklab,var(--color-muted)_35%,transparent)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:focus-within:[--_table-row-bg:var(--color-muted)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:hover:[--_table-row-bg:var(--color-muted)] in-data-[slot=table-header]:border-b',
        local.class,
      )}
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
      class={cn(
        cellClass,
        'text-start font-medium whitespace-nowrap text-muted-foreground',
        local.numeric && numericClass,
        local.class,
      )}
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
      class={cn(cellClass, local.numeric && numericClass, local.class)}
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
        class={cn(
          cellClass,
          'py-6 text-center text-muted-foreground group-data-[size=lg]/table:py-8 group-data-[size=sm]/table:py-4',
          local.class,
        )}
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