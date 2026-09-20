import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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

const TableRoot = forwardRef<ComponentRef<typeof ark.table>, TableRootProps>(function TableRoot(
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
      className={cn(tableVariants({ size, variant }), className)}
      {...props}
      data-scope="table"
      data-part="root"
      data-interactive={interactive || undefined}
      data-show-column-border={showColumnBorder || undefined}
      data-size={size}
      data-sticky-header={stickyHeader || undefined}
      data-striped={striped || undefined}
      data-variant={variant}
      data-slot="table-root"
    />
  );
});

const TableScrollArea = forwardRef<ComponentRef<typeof ark.div>, TableScrollAreaProps>(
  function TableScrollArea({ asChild, className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        asChild={asChild}
        className={cn(
          'relative isolate w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-card',
          className,
        )}
        {...props}
        data-scope="table"
        data-part="scroll-area"
        data-slot="table-scroll-area"
      />
    );
  },
);

const TableCaption = forwardRef<ComponentRef<typeof ark.caption>, TableCaptionProps>(
  function TableCaption({ asChild, className, side = 'bottom', ...props }, ref) {
    return (
      <ark.caption
        ref={ref}
        asChild={asChild}
        className={cn(
          'px-4 text-left text-sm leading-5 text-pretty text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=sm]/table:px-3 data-[side=bottom]:caption-bottom data-[side=bottom]:pt-3 data-[side=bottom]:pb-2 data-[side=top]:caption-top data-[side=top]:pt-2 data-[side=top]:pb-3',
          className,
        )}
        {...props}
        data-scope="table"
        data-part="caption"
        data-side={side}
        data-slot="table-caption"
      />
    );
  },
);

const TableColumnGroup = forwardRef<ComponentRef<typeof ark.colgroup>, TableColumnGroupProps>(
  function TableColumnGroup({ asChild, className, ...props }, ref) {
    return (
      <ark.colgroup
        ref={ref}
        asChild={asChild}
        className={className}
        {...props}
        data-scope="table"
        data-part="column-group"
        data-slot="table-column-group"
      />
    );
  },
);

const TableColumn = forwardRef<ComponentRef<typeof ark.col>, TableColumnProps>(function TableColumn(
  { asChild, className, htmlWidth, width, ...props },
  ref,
) {
  return (
    <ark.col
      ref={ref}
      asChild={asChild}
      width={htmlWidth ?? width}
      className={className}
      {...props}
      data-scope="table"
      data-part="column"
      data-slot="table-column"
    />
  );
});

const TableHeader = forwardRef<ComponentRef<typeof ark.thead>, TableHeaderProps>(
  function TableHeader({ asChild, className, ...props }, ref) {
    return (
      <ark.thead
        ref={ref}
        asChild={asChild}
        className={cn(
          'group/table-header group-data-[sticky-header]/table:sticky group-data-[sticky-header]/table:top-0 group-data-[sticky-header]/table:z-3 group-data-[sticky-header]/table:bg-card',
          className,
        )}
        {...props}
        data-scope="table"
        data-part="header"
        data-slot="table-header"
      />
    );
  },
);

const TableBody = forwardRef<ComponentRef<typeof ark.tbody>, TableBodyProps>(function TableBody(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.tbody
      ref={ref}
      asChild={asChild}
      className={cn('group/table-body', className)}
      {...props}
      data-scope="table"
      data-part="body"
      data-slot="table-body"
    />
  );
});

const TableFooter = forwardRef<ComponentRef<typeof ark.tfoot>, TableFooterProps>(
  function TableFooter({ asChild, className, ...props }, ref) {
    return (
      <ark.tfoot
        ref={ref}
        asChild={asChild}
        className={cn('border-t border-border bg-muted font-medium', className)}
        {...props}
        data-scope="table"
        data-part="footer"
        data-slot="table-footer"
      />
    );
  },
);

const TableRow = forwardRef<ComponentRef<typeof ark.tr>, TableRowProps>(function TableRow(
  { asChild, className, ...props },
  ref,
) {
  return (
    <ark.tr
      ref={ref}
      asChild={asChild}
      className={cn(
        'transition-colors duration-200 ease-in-out group-data-[slot=table-body]/table-body:border-b group-data-[slot=table-body]/table-body:border-border group-data-[slot=table-header]/table-header:border-b group-data-[slot=table-header]/table-header:border-border group-data-[slot=table-body]/table-body:last:border-b-0 motion-reduce:transition-none group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:focus-within:bg-muted group-data-[interactive]/table:group-data-[slot=table-body]/table-body:[&:not([data-empty])]:hover:bg-muted group-data-[striped]/table:group-data-[slot=table-body]/table-body:[&:nth-child(even):not([data-empty])]:bg-muted/35',
        className,
      )}
      {...props}
      data-scope="table"
      data-part="row"
      data-slot="table-row"
    />
  );
});

const TableColumnHeader = forwardRef<ComponentRef<typeof ark.th>, TableColumnHeaderProps>(
  function TableColumnHeader({ asChild, className, numeric = false, ...props }, ref) {
    return (
      <ark.th
        ref={ref}
        asChild={asChild}
        className={cn(
          'relative z-0 px-4 py-3 text-left align-middle font-medium whitespace-nowrap text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 group-data-[sticky-header]/table:data-[sticky]:z-4 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border',
          numeric && 'text-end tabular-nums',
          className,
        )}
        {...props}
        data-scope="table"
        data-part="column-header"
        data-numeric={numeric || undefined}
        data-slot="table-column-header"
      />
    );
  },
);

const TableCell = forwardRef<ComponentRef<typeof ark.td>, TableCellProps>(function TableCell(
  { asChild, className, numeric = false, ...props },
  ref,
) {
  return (
    <ark.td
      ref={ref}
      asChild={asChild}
      className={cn(
        'relative z-0 px-4 py-3 align-middle group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border',
        numeric && 'text-end tabular-nums',
        className,
      )}
      {...props}
      data-scope="table"
      data-part="cell"
      data-numeric={numeric || undefined}
      data-slot="table-cell"
    />
  );
});

const TableEmpty = forwardRef<ComponentRef<typeof ark.td>, TableEmptyProps>(function TableEmpty(
  { asChild, children = 'No results.', className, colSpan, ...props },
  ref,
) {
  return (
    <ark.tr
      data-scope="table"
      data-part="row"
      data-empty
      data-slot="table-row"
      className="transition-colors duration-200 ease-in-out group-data-[slot=table-body]/table-body:border-b group-data-[slot=table-body]/table-body:border-border group-data-[slot=table-body]/table-body:last:border-b-0 motion-reduce:transition-none"
    >
      <ark.td
        ref={ref}
        asChild={asChild}
        colSpan={colSpan}
        className={cn(
          'relative z-0 px-4 py-3 align-middle group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-[sticky=end]:sticky data-[sticky=end]:end-0 data-[sticky=end]:z-2 data-[sticky=end]:bg-card data-[sticky=start]:sticky data-[sticky=start]:start-0 data-[sticky=start]:z-2 data-[sticky=start]:bg-card group-data-[show-column-border]/table:[&:not(:last-child)]:border-e group-data-[show-column-border]/table:[&:not(:last-child)]:border-border',
          'py-6 text-center text-muted-foreground group-data-[size=lg]/table:py-8 group-data-[size=sm]/table:py-4',
          className,
        )}
        {...props}
        data-scope="table"
        data-part="empty"
        data-slot="table-empty"
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