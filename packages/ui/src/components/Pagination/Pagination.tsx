import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Pagination.module.css';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="pagination-root"
      aria-label="Pagination"
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="pagination-content"
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="pagination-item" className={clsx(styles.item, className)} {...props} />;
}

function PaginationLink({
  className,
  isActive,
  ...props
}: ToolbarPrimitive.Link.Props & {
  isActive?: boolean;
}) {
  return (
    <ToolbarPrimitive.Link
      data-slot="pagination-link"
      aria-current={isActive ? 'page' : undefined}
      className={mergeClassName(className, styles.link, isActive && styles.linkActive)}
      {...props}
    />
  );
}

function PaginationPrevious({ children, className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={mergeClassName(className, styles.previous, !children && styles.iconOnly)}
      {...props}
    >
      {children ?? <ChevronLeftIcon className={styles.previousIcon} />}
    </PaginationLink>
  );
}

function PaginationNext({ children, className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={mergeClassName(className, styles.next, !children && styles.iconOnly)}
      {...props}
    >
      {children ?? <ChevronRightIcon className={styles.nextIcon} />}
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="pagination-ellipsis" className={clsx(styles.ellipsis, className)} {...props}>
      <span aria-hidden>...</span>
      <span className={styles.visuallyHidden}>More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};