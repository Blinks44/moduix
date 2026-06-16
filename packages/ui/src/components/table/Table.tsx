import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Table.module.css';

function TableContainer({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div data-slot="table-container" className={clsx(styles.container, className)} {...props} />
  );
}

function Table({
  className,
  striped = false,
  ...props
}: ComponentPropsWithoutRef<'table'> & {
  striped?: boolean;
}) {
  return (
    <table
      data-striped={striped || undefined}
      data-slot="table"
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: ComponentPropsWithoutRef<'thead'>) {
  return <thead data-slot="table-header" className={clsx(styles.header, className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) {
  return <tbody data-slot="table-body" className={clsx(styles.body, className)} {...props} />;
}

function TableFooter({ className, ...props }: ComponentPropsWithoutRef<'tfoot'>) {
  return <tfoot data-slot="table-footer" className={clsx(styles.footer, className)} {...props} />;
}

function TableRow({ className, ...props }: ComponentPropsWithoutRef<'tr'>) {
  return <tr data-slot="table-row" className={clsx(styles.row, className)} {...props} />;
}

function TableHead({
  className,
  numeric = false,
  ...props
}: ComponentPropsWithoutRef<'th'> & {
  numeric?: boolean;
}) {
  return (
    <th
      data-numeric={numeric || undefined}
      data-slot="table-head"
      className={clsx(styles.head, numeric && styles.numeric, className)}
      {...props}
    />
  );
}

function TableCell({
  className,
  numeric = false,
  ...props
}: ComponentPropsWithoutRef<'td'> & {
  numeric?: boolean;
}) {
  return (
    <td
      data-numeric={numeric || undefined}
      data-slot="table-cell"
      className={clsx(styles.cell, numeric && styles.numeric, className)}
      {...props}
    />
  );
}

function TableEmpty({
  children = 'No results.',
  className,
  colSpan,
  ...props
}: ComponentPropsWithoutRef<'td'> & {
  colSpan: number;
}) {
  return (
    <tr data-slot="table-row" className={clsx(styles.row, styles.emptyRow)}>
      <td
        data-slot="table-empty"
        colSpan={colSpan}
        className={clsx(styles.cell, styles.empty, className)}
        {...props}
      >
        {children}
      </td>
    </tr>
  );
}

function TableCaption({
  className,
  side = 'bottom',
  ...props
}: ComponentPropsWithoutRef<'caption'> & {
  side?: 'top' | 'bottom';
}) {
  return (
    <caption
      data-side={side}
      data-slot="table-caption"
      className={clsx(styles.caption, className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};