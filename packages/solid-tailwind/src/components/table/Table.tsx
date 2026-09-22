import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type TableDataProps = {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

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
    'data-size'?: string;
    'data-sticky-header'?: string | boolean;
    'data-striped'?: string | boolean;
    'data-variant'?: string;
  };

type TableScrollAreaProps = HTMLArkProps<'div'> & TableDataProps;
type TableCaptionProps = HTMLArkProps<'caption'> &
  TableDataProps & {
    side?: 'top' | 'bottom';
    'data-side'?: string;
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

const tableVariants = cva(
  'group/table isolate w-full border-collapse border-spacing-0 text-left text-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs leading-4',
        md: 'text-sm leading-5',
        lg: 'text-md leading-6',
      },
      variant: {
        line: '',
        outline: 'border border-border',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'line',
    },
  },
);

function Table(props: TableProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-interactive',
    'data-part',
    'data-scope',
    'data-show-column-border',
    'data-size',
    'data-slot',
    'data-sticky-header',
    'data-striped',
    'data-variant',
    'interactive',
    'showColumnBorder',
    'size',
    'stickyHeader',
    'striped',
    'variant',
  ]);
  const size = () => local.size ?? 'md';
  const variant = () => local.variant ?? 'line';

  return (
    <ark.table
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="root"
      data-slot="table-root"
      data-interactive={local.interactive || undefined}
      data-show-column-border={local.showColumnBorder || undefined}
      data-size={size()}
      data-sticky-header={local.stickyHeader || undefined}
      data-striped={local.striped || undefined}
      data-variant={variant()}
      class={cn(tableVariants({ size: size(), variant: variant() }), local.class)}
    />
  );
}

function TableScrollArea(props: TableScrollAreaProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="scroll-area"
      data-slot="table-scroll-area"
      class={cn(
        'relative isolate w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-card',
        local.class,
      )}
    />
  );
}

function TableCaption(props: TableCaptionProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-side',
    'data-slot',
    'side',
  ]);
  const side = () => local.side ?? 'bottom';

  return (
    <ark.caption
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="caption"
      data-side={side()}
      data-slot="table-caption"
      class={cn(
        'px-4 text-left text-sm leading-5 text-pretty text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=sm]/table:px-3 data-[side=bottom]:caption-bottom data-[side=bottom]:pt-3 data-[side=bottom]:pb-2 data-[side=top]:caption-top data-[side=top]:pt-2 data-[side=top]:pb-3',
        local.class,
      )}
    />
  );
}

function TableColumnGroup(props: TableColumnGroupProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);

  return (
    <ark.colgroup
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="column-group"
      data-slot="table-column-group"
      class={local.class}
    />
  );
}

function TableColumn(props: TableColumnProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
    'htmlWidth',
    'width',
  ]);

  return (
    <ark.col
      asChild={local.asChild}
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
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);

  return (
    <ark.thead
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="header"
      data-slot="table-header"
      class={cn(
        'group/table-header group-data-[sticky-header]/table:sticky group-data-[sticky-header]/table:top-0 group-data-[sticky-header]/table:z-3 group-data-[sticky-header]/table:bg-card',
        local.class,
      )}
    />
  );
}

function TableBody(props: TableBodyProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);

  return (
    <ark.tbody
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="body"
      data-slot="table-body"
      class={cn('group/table-body', local.class)}
    />
  );
}

function TableFooter(props: TableFooterProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);

  return (
    <ark.tfoot
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="footer"
      data-slot="table-footer"
      class={cn('border-t border-border bg-muted font-medium', local.class)}
    />
  );
}

function TableRow(props: TableRowProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-part',
    'data-scope',
    'data-slot',
  ]);

  return (
    <ark.tr
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="row"
      data-slot="table-row"
      class={cn(
        'transition-colors duration-200 ease-in-out group-data-[slot=table-body]/table-body:border-b group-data-[slot=table-body]/table-body:border-border group-data-[slot=table-header]/table-header:border-b group-data-[slot=table-header]/table-header:border-border group-data-[slot=table-body]/table-body:last:border-b-0 motion-reduce:transition-none group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:focus-within:bg-muted group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:hover:bg-muted group-data-[striped]/table:group-data-[slot=table-body]/table-body:[&:nth-child(even):not([data-empty])]:bg-muted/35',
        local.class,
      )}
    />
  );
}

function TableColumnHeader(props: TableColumnHeaderProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-numeric',
    'data-part',
    'data-scope',
    'data-slot',
    'numeric',
  ]);

  return (
    <ark.th
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="column-header"
      data-numeric={local.numeric || undefined}
      data-slot="table-column-header"
      class={cn(
        'relative z-0 px-4 py-3 text-left align-middle font-medium whitespace-nowrap text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 group-data-[sticky-header]/table:data-[sticky]:z-4 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border',
        local.numeric && 'text-end tabular-nums',
        local.class,
      )}
    />
  );
}

function TableCell(props: TableCellProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'data-numeric',
    'data-part',
    'data-scope',
    'data-slot',
    'numeric',
  ]);

  return (
    <ark.td
      asChild={local.asChild}
      {...others}
      data-scope="table"
      data-part="cell"
      data-numeric={local.numeric || undefined}
      data-slot="table-cell"
      class={cn(
        'relative z-0 px-4 py-3 align-middle group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border',
        local.numeric && 'text-end tabular-nums',
        local.class,
      )}
    />
  );
}

function TableEmpty(props: TableEmptyProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'colSpan',
    'data-part',
    'data-scope',
    'data-slot',
  ]);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.tr
      data-scope="table"
      data-part="row"
      data-empty
      data-slot="table-row"
      class="transition-colors duration-200 ease-in-out group-data-[slot=table-body]/table-body:border-b group-data-[slot=table-body]/table-body:border-border group-data-[slot=table-body]/table-body:last:border-b-0 motion-reduce:transition-none"
    >
      <ark.td
        asChild={local.asChild}
        {...others}
        data-scope="table"
        data-part="empty"
        data-slot="table-empty"
        colSpan={local.colSpan}
        class={cn(
          'relative z-0 px-4 py-3 align-middle group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border',
          'py-6 text-center text-muted-foreground group-data-[size=lg]/table:py-8 group-data-[size=sm]/table:py-4',
          local.class,
        )}
      >
        {resolvedChildren() ?? 'No results.'}
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