import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronRightLargeIcon } from '@/primitives';
import { Toolbar, ToolbarButton, ToolbarLink } from '../Toolbar';
import styles from './Pagination.module.css';

type PaginationToolbarVariant = 'default' | 'outline' | 'ghost';
type PaginationToolbarSize = 'sm' | 'md' | 'lg';
type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';
type PaginationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type PaginationProps = Omit<React.ComponentProps<'nav'>, 'onChange'> & {
  count: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  visiblePages?: number;
  showPages?: boolean;
  showArrows?: boolean;
  disabled?: boolean;
  getPageHref?: (page: number) => string;
  size?: PaginationSize;
  toolbarVariant?: PaginationToolbarVariant;
  toolbarSize?: PaginationToolbarSize;
  previousLabel?: string;
  nextLabel?: string;
};

function getPageItems(page: number, count: number, visiblePages: number): PaginationItem[] {
  if (count <= visiblePages) {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  const startEdge = visiblePages - 2;
  const endEdge = count - (visiblePages - 2);

  if (page <= startEdge) {
    const initialPages = Array.from({ length: visiblePages }, (_, index) => index + 1);
    return [...initialPages, 'ellipsis-end', count];
  }

  if (page >= endEdge) {
    const endingStart = count - visiblePages + 1;
    const endingPages = Array.from({ length: visiblePages }, (_, index) => endingStart + index);
    return [1, 'ellipsis-start', ...endingPages];
  }

  const middleCount = visiblePages - 2;
  const middleOffset = Math.floor(middleCount / 2);
  const middleStart = page - middleOffset;
  const middlePages = Array.from({ length: middleCount }, (_, index) => middleStart + index);

  return [1, 'ellipsis-start', ...middlePages, 'ellipsis-end', count];
}

function clampPage(page: number, count: number) {
  return Math.min(Math.max(page, 1), count);
}

function resolveToolbarSize(
  size: PaginationSize,
  toolbarSize?: PaginationToolbarSize,
): PaginationToolbarSize {
  if (toolbarSize) {
    return toolbarSize;
  }

  if (size === 'xs' || size === 'sm') {
    return 'sm';
  }

  if (size === 'xl') {
    return 'lg';
  }

  return 'md';
}

function Pagination({
  className,
  count,
  page,
  defaultPage = 1,
  onPageChange,
  visiblePages = 5,
  showPages = true,
  showArrows = true,
  disabled = false,
  getPageHref,
  size = 'md',
  toolbarVariant = 'ghost',
  toolbarSize,
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  ...props
}: PaginationProps) {
  const isControlled = page !== undefined;
  const safeCount = Math.max(1, Math.floor(count));
  const safeVisiblePages = Math.max(3, Math.floor(visiblePages));
  const [uncontrolledPage, setUncontrolledPage] = React.useState(() =>
    clampPage(defaultPage, safeCount),
  );
  const currentPage = clampPage(isControlled ? page : uncontrolledPage, safeCount);

  React.useEffect(() => {
    if (!isControlled) {
      setUncontrolledPage((prev) => clampPage(prev, safeCount));
    }
  }, [isControlled, safeCount]);

  const setPage = React.useCallback(
    (nextPage: number) => {
      const clampedPage = clampPage(nextPage, safeCount);

      if (clampedPage === currentPage || disabled) {
        return;
      }

      if (!isControlled) {
        setUncontrolledPage(clampedPage);
      }

      onPageChange?.(clampedPage);
    },
    [currentPage, disabled, isControlled, onPageChange, safeCount],
  );

  const pageItems = showPages ? getPageItems(currentPage, safeCount, safeVisiblePages) : [];
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isPrevDisabled = disabled || currentPage <= 1;
  const isNextDisabled = disabled || currentPage >= safeCount;
  const hasLinks = Boolean(getPageHref);
  const resolvedToolbarSize = resolveToolbarSize(size, toolbarSize);

  return (
    <nav
      data-slot="pagination-root"
      data-size={size}
      aria-label="Pagination"
      className={clsx(styles.root, className)}
      {...props}
    >
      <Toolbar variant={toolbarVariant} size={resolvedToolbarSize} className={styles.toolbar}>
        {showArrows &&
          (hasLinks ? (
            <ToolbarLink
              data-slot="pagination-item"
              aria-label={previousLabel}
              aria-disabled={isPrevDisabled || undefined}
              tabIndex={isPrevDisabled ? -1 : undefined}
              href={getPageHref!(Math.max(prevPage, 1))}
              onClick={(event) => {
                if (isPrevDisabled) {
                  event.preventDefault();
                  return;
                }
                setPage(prevPage);
              }}
              className={clsx(styles.item, styles.arrow, isPrevDisabled && styles.itemDisabled)}
            >
              <ChevronRightLargeIcon className={styles.arrowLeftIcon} />
            </ToolbarLink>
          ) : (
            <ToolbarButton
              data-slot="pagination-item"
              aria-label={previousLabel}
              disabled={isPrevDisabled}
              onClick={() => setPage(prevPage)}
              className={clsx(styles.item, styles.arrow)}
            >
              <ChevronRightLargeIcon className={styles.arrowLeftIcon} />
            </ToolbarButton>
          ))}

        {pageItems.map((item, index) => {
          if (typeof item !== 'number') {
            return (
              <span
                key={`${item}-${index}`}
                data-slot="pagination-ellipsis"
                className={styles.ellipsis}
              >
                ...
              </span>
            );
          }

          const isActive = item === currentPage;

          if (hasLinks) {
            return (
              <ToolbarLink
                key={item}
                data-slot="pagination-item"
                href={getPageHref!(item)}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(styles.item, isActive && styles.itemActive)}
                onClick={() => setPage(item)}
              >
                {item}
              </ToolbarLink>
            );
          }

          return (
            <ToolbarButton
              key={item}
              data-slot="pagination-item"
              aria-current={isActive ? 'page' : undefined}
              data-active={isActive || undefined}
              disabled={disabled}
              onClick={() => setPage(item)}
              className={clsx(styles.item, isActive && styles.itemActive)}
            >
              {item}
            </ToolbarButton>
          );
        })}

        {showArrows &&
          (hasLinks ? (
            <ToolbarLink
              data-slot="pagination-item"
              aria-label={nextLabel}
              aria-disabled={isNextDisabled || undefined}
              tabIndex={isNextDisabled ? -1 : undefined}
              href={getPageHref!(Math.min(nextPage, safeCount))}
              onClick={(event) => {
                if (isNextDisabled) {
                  event.preventDefault();
                  return;
                }
                setPage(nextPage);
              }}
              className={clsx(styles.item, styles.arrow, isNextDisabled && styles.itemDisabled)}
            >
              <ChevronRightLargeIcon />
            </ToolbarLink>
          ) : (
            <ToolbarButton
              data-slot="pagination-item"
              aria-label={nextLabel}
              disabled={isNextDisabled}
              onClick={() => setPage(nextPage)}
              className={clsx(styles.item, styles.arrow)}
            >
              <ChevronRightLargeIcon />
            </ToolbarButton>
          ))}
      </Toolbar>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps, PaginationToolbarVariant, PaginationToolbarSize, PaginationSize };