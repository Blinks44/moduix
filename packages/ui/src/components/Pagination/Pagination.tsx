import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronRightLargeIcon } from '@/primitives';
import { Toolbar, ToolbarButton, ToolbarLink } from '../Toolbar';
import styles from './Pagination.module.css';

type PaginationToolbarVariant = 'default' | 'outline' | 'ghost';
type PaginationToolbarSize = 'sm' | 'md' | 'lg';
type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';
type PaginationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PaginationDirection = 'previous' | 'next';

type PaginationProps = Omit<React.ComponentProps<'nav'>, 'onChange'> & {
  count: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  visiblePages?: number;
  withPages?: boolean;
  withArrows?: boolean;
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

type PaginationControlProps = {
  itemKey?: React.Key;
  targetPage: number;
  ariaLabel?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

type PaginationArrowProps = {
  direction: PaginationDirection;
  targetPage: number;
  disabled: boolean;
  ariaLabel: string;
};

function Pagination({
  className,
  count,
  page,
  defaultPage = 1,
  onPageChange,
  visiblePages = 5,
  withPages = true,
  withArrows = true,
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

  const pageItems = withPages ? getPageItems(currentPage, safeCount, safeVisiblePages) : [];
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isPrevDisabled = disabled || currentPage <= 1;
  const isNextDisabled = disabled || currentPage >= safeCount;
  const hasLinks = Boolean(getPageHref);
  const resolvedToolbarSize = resolveToolbarSize(size, toolbarSize);

  const renderControl = ({
    itemKey,
    targetPage,
    ariaLabel,
    active = false,
    disabled: isDisabled = false,
    className,
    children,
  }: PaginationControlProps) => {
    const itemClassName = clsx(styles.item, className, active && styles.itemActive);

    if (hasLinks) {
      return (
        <ToolbarLink
          key={itemKey}
          data-slot="pagination-item"
          href={getPageHref?.(targetPage)}
          aria-label={ariaLabel}
          aria-current={active ? 'page' : undefined}
          aria-disabled={isDisabled || undefined}
          tabIndex={isDisabled ? -1 : undefined}
          className={clsx(itemClassName, isDisabled && styles.itemDisabled)}
          onClick={(event) => {
            if (isDisabled || active) {
              event.preventDefault();
              return;
            }

            setPage(targetPage);
          }}
        >
          {children}
        </ToolbarLink>
      );
    }

    return (
      <ToolbarButton
        key={itemKey}
        data-slot="pagination-item"
        aria-label={ariaLabel}
        aria-current={active ? 'page' : undefined}
        data-active={active || undefined}
        disabled={isDisabled}
        onClick={() => setPage(targetPage)}
        className={itemClassName}
      >
        {children}
      </ToolbarButton>
    );
  };

  const renderArrowControl = ({
    direction,
    targetPage,
    disabled: isDisabled,
    ariaLabel,
  }: PaginationArrowProps) =>
    renderControl({
      targetPage,
      disabled: isDisabled,
      ariaLabel,
      className: styles.arrow,
      children: (
        <ChevronRightLargeIcon
          className={direction === 'previous' ? styles.arrowLeftIcon : undefined}
        />
      ),
    });

  return (
    <nav
      data-slot="pagination-root"
      data-size={size}
      aria-label="Pagination"
      className={clsx(styles.root, className)}
      {...props}
    >
      <Toolbar variant={toolbarVariant} size={resolvedToolbarSize} className={styles.toolbar}>
        {withArrows &&
          renderArrowControl({
            direction: 'previous',
            targetPage: Math.max(prevPage, 1),
            disabled: isPrevDisabled,
            ariaLabel: previousLabel,
          })}

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

          return renderControl({
            itemKey: item,
            targetPage: item,
            active: item === currentPage,
            disabled,
            children: item,
          });
        })}

        {withArrows &&
          renderArrowControl({
            direction: 'next',
            targetPage: Math.min(nextPage, safeCount),
            disabled: isNextDisabled,
            ariaLabel: nextLabel,
          })}
      </Toolbar>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps, PaginationToolbarVariant, PaginationToolbarSize, PaginationSize };