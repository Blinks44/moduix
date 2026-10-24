import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';

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

const Table = forwardRef<ComponentRef<typeof ark.table>, TableRootProps>(function Table(
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
      className={cn(tableVariants({ size }), className)}
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

const TableScrollArea = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function TableScrollArea({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn(
          'relative w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-card',
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
  function TableCaption({ className, side = 'bottom', ...props }, ref) {
    return (
      <ark.caption
        ref={ref}
        className={cn(
          'px-4 text-start text-sm leading-5 text-pretty text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=sm]/table:px-3 data-[side=bottom]:caption-bottom data-[side=bottom]:pt-3 data-[side=bottom]:pb-2 data-[side=top]:caption-top data-[side=top]:pt-2 data-[side=top]:pb-3',
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

const TableColumnGroup = forwardRef<ComponentRef<typeof ark.colgroup>, HTMLArkProps<'colgroup'>>(
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

const TableColumn = forwardRef<ComponentRef<typeof ark.col>, HTMLArkProps<'col'>>(
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

const TableHeader = forwardRef<ComponentRef<typeof ark.thead>, HTMLArkProps<'thead'>>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <ark.thead
        ref={ref}
        className={cn(
          'group-data-[sticky-header]/table:sticky group-data-[sticky-header]/table:top-0 group-data-[sticky-header]/table:z-3 group-data-[sticky-header]/table:bg-card',
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

const TableBody = forwardRef<ComponentRef<typeof ark.tbody>, HTMLArkProps<'tbody'>>(
  function TableBody(props, ref) {
    return (
      <ark.tbody ref={ref} {...props} data-scope="table" data-part="body" data-slot="table-body" />
    );
  },
);

const TableFooter = forwardRef<ComponentRef<typeof ark.tfoot>, HTMLArkProps<'tfoot'>>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <ark.tfoot
        ref={ref}
        className={cn('border-t border-border bg-muted font-medium', className)}
        {...props}
        data-scope="table"
        data-part="footer"
        data-slot="table-footer"
      />
    );
  },
);

// Sticky cells repaint the row state over their own background through --_table-row-bg.
const TableRow = forwardRef<ComponentRef<typeof ark.tr>, HTMLArkProps<'tr'>>(function TableRow(
  { className, ...props },
  ref,
) {
  return (
    <ark.tr
      ref={ref}
      className={cn(
        'border-border bg-(--_table-row-bg) [--_table-row-bg:initial] in-data-[slot=table-body]:not-last:border-b group-data-[striped]/table:in-data-[slot=table-body]:even:not-data-empty:[--_table-row-bg:color-mix(in_oklab,var(--color-muted)_35%,transparent)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:focus-within:[--_table-row-bg:var(--color-muted)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:hover:[--_table-row-bg:var(--color-muted)] in-data-[slot=table-header]:border-b',
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
  function TableColumnHeader({ className, numeric = false, ...props }, ref) {
    return (
      <ark.th
        ref={ref}
        className={cn(
          cellClass,
          'text-start font-medium whitespace-nowrap text-muted-foreground',
          numeric && numericClass,
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
  { className, numeric = false, ...props },
  ref,
) {
  return (
    <ark.td
      ref={ref}
      className={cn(cellClass, numeric && numericClass, className)}
      {...props}
      data-scope="table"
      data-part="cell"
      data-numeric={numeric || undefined}
      data-slot="table-cell"
    />
  );
});

const TableEmpty = forwardRef<ComponentRef<typeof ark.td>, TableEmptyProps>(function TableEmpty(
  { children = a11yLabels.noResults, className, ...props },
  ref,
) {
  return (
    <TableRow data-empty>
      <ark.td
        ref={ref}
        className={cn(
          cellClass,
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