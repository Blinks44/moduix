import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Pagination.module.css';

function clampPage(page: number, count: number) {
  return Math.min(Math.max(page, 1), count);
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function usePagination({
  count,
  page,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  count: number;
  page: number;
  siblingCount?: number;
  boundaryCount?: number;
}) {
  const safeCount = Math.max(0, Math.floor(count));
  const safePage = safeCount === 0 ? 0 : clampPage(Math.floor(page), safeCount);
  const safeSiblingCount = Math.max(0, Math.floor(siblingCount));
  const safeBoundaryCount = Math.max(0, Math.floor(boundaryCount));

  const items = React.useMemo(() => {
    if (safeCount === 0) {
      return [];
    }

    const totalPageNumbers = safeSiblingCount * 2 + 3 + safeBoundaryCount * 2;

    if (safeCount <= totalPageNumbers) {
      return range(1, safeCount);
    }

    const startPages = range(1, safeBoundaryCount);
    const endPages = range(safeCount - safeBoundaryCount + 1, safeCount);

    const siblingsStart = Math.max(
      Math.min(
        safePage - safeSiblingCount,
        safeCount - safeBoundaryCount - safeSiblingCount * 2 - 1,
      ),
      safeBoundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(safePage + safeSiblingCount, safeBoundaryCount + safeSiblingCount * 2 + 2),
      endPages[0] - 2,
    );

    return [
      ...startPages,
      ...(siblingsStart > safeBoundaryCount + 2
        ? ['ellipsis-start' as const]
        : safeBoundaryCount + 1 < safeCount - safeBoundaryCount
          ? [safeBoundaryCount + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < safeCount - safeBoundaryCount - 1
        ? ['ellipsis-end' as const]
        : safeCount - safeBoundaryCount > safeBoundaryCount
          ? [safeCount - safeBoundaryCount]
          : []),
      ...endPages,
    ];
  }, [safeBoundaryCount, safeCount, safePage, safeSiblingCount]);

  return {
    items,
    page: safePage,
    canNextPage: safeCount > 0 && safePage < safeCount,
    canPreviousPage: safePage > 1,
    nextPage: safeCount === 0 ? 0 : Math.min(safePage + 1, safeCount),
    previousPage: safePage <= 1 ? safePage : safePage - 1,
  };
}

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
  usePagination,
};