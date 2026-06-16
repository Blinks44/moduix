import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import { clsx } from 'clsx';
import { type ComponentProps } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Pagination.module.css';

type PaginationItemType = number | 'ellipsis-start' | 'ellipsis-end';

function clampPage(page: number, count: number) {
  return Math.min(Math.max(page, 1), count);
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPaginationItems(
  count: number,
  page: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItemType[] {
  if (count === 0) {
    return [];
  }

  const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

  if (count <= totalPageNumbers) {
    return range(1, count);
  }

  const startPages = range(1, boundaryCount);
  const endPages = range(count - boundaryCount + 1, count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages[0] - 2,
  );

  const hasStartEllipsis = siblingsStart > boundaryCount + 2;
  const hasEndEllipsis = siblingsEnd < count - boundaryCount - 1;

  return [
    ...startPages,
    ...(hasStartEllipsis
      ? (['ellipsis-start'] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(hasEndEllipsis
      ? (['ellipsis-end'] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];
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
  const items = getPaginationItems(safeCount, safePage, safeSiblingCount, safeBoundaryCount);

  return {
    items,
    page: safePage,
    canNextPage: safeCount > 0 && safePage < safeCount,
    canPreviousPage: safePage > 1,
    nextPage: safeCount === 0 ? 0 : Math.min(safePage + 1, safeCount),
    previousPage: safePage <= 1 ? safePage : safePage - 1,
  };
}

function Pagination({
  'aria-label': ariaLabel = 'Pagination',
  className,
  ...props
}: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="pagination-root"
      aria-label={ariaLabel}
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

function PaginationItem({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="pagination-item" className={clsx(styles.item, className)} {...props} />;
}

function PaginationLink({
  className,
  isActive,
  render,
  ...props
}: ToolbarPrimitive.Link.Props & {
  isActive?: boolean;
}) {
  return (
    <ToolbarPrimitive.Link
      data-slot="pagination-link"
      aria-current={isActive ? 'page' : undefined}
      className={mergeClassName(className, styles.link)}
      render={render ?? (props.href == null ? <button type="button" /> : undefined)}
      {...props}
    />
  );
}

function PaginationPrevious({
  children,
  className,
  render,
  'aria-label': ariaLabel,
  ...props
}: ToolbarPrimitive.Link.Props) {
  return (
    <PaginationLink
      aria-label={children ? ariaLabel : (ariaLabel ?? 'Go to previous page')}
      className={mergeClassName(className, styles.previous, !children && styles.iconOnly)}
      render={render}
      {...props}
    >
      {children ?? <ChevronLeftIcon />}
    </PaginationLink>
  );
}

function PaginationNext({
  children,
  className,
  render,
  'aria-label': ariaLabel,
  ...props
}: ToolbarPrimitive.Link.Props) {
  return (
    <PaginationLink
      aria-label={children ? ariaLabel : (ariaLabel ?? 'Go to next page')}
      className={mergeClassName(className, styles.next, !children && styles.iconOnly)}
      render={render}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
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