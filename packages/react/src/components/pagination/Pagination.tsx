import type { ComponentProps, ComponentRef } from 'react';
import {
  Pagination as PaginationPrimitive,
  usePagination,
  usePaginationContext,
} from '@ark-ui/react/pagination';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Pagination.module.css';

const PaginationRoot = forwardRef<
  ComponentRef<typeof PaginationPrimitive.Root>,
  ComponentProps<typeof PaginationPrimitive.Root>
>(function PaginationRoot({ 'aria-label': ariaLabel = 'Pagination', className, ...props }, ref) {
  return (
    <PaginationPrimitive.Root
      ref={ref}
      data-slot="pagination-root"
      aria-label={ariaLabel}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const PaginationRootProvider = forwardRef<
  ComponentRef<typeof PaginationPrimitive.RootProvider>,
  ComponentProps<typeof PaginationPrimitive.RootProvider>
>(function PaginationRootProvider(
  { 'aria-label': ariaLabel = 'Pagination', className, ...props },
  ref,
) {
  return (
    <PaginationPrimitive.RootProvider
      ref={ref}
      data-slot="pagination-root-provider"
      aria-label={ariaLabel}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const PaginationItem = forwardRef<
  ComponentRef<typeof PaginationPrimitive.Item>,
  ComponentProps<typeof PaginationPrimitive.Item>
>(function PaginationItem({ className, ...props }, ref) {
  return (
    <PaginationPrimitive.Item
      ref={ref}
      data-slot="pagination-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const PaginationEllipsis = forwardRef<
  ComponentRef<typeof PaginationPrimitive.Ellipsis>,
  ComponentProps<typeof PaginationPrimitive.Ellipsis>
>(function PaginationEllipsis({ className, children, ...props }, ref) {
  return (
    <PaginationPrimitive.Ellipsis
      ref={ref}
      data-slot="pagination-ellipsis"
      className={clsx(styles.ellipsis, normalizeClassName(className))}
      {...props}
    >
      {children ?? '...'}
    </PaginationPrimitive.Ellipsis>
  );
});

function EdgeIcon({ side }: { side: 'left' | 'right' }) {
  const Icon = side === 'left' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <span className={styles.edgeIcon} aria-hidden>
      <Icon />
      <Icon />
    </span>
  );
}

const PaginationPrevTrigger = forwardRef<
  ComponentRef<typeof PaginationPrimitive.PrevTrigger>,
  ComponentProps<typeof PaginationPrimitive.PrevTrigger>
>(function PaginationPrevTrigger({ className, children, ...props }, ref) {
  return (
    <PaginationPrimitive.PrevTrigger
      ref={ref}
      data-slot="pagination-prev-trigger"
      className={clsx(
        styles.trigger,
        children == null && styles.iconTrigger,
        normalizeClassName(className),
      )}
      {...props}
    >
      {children ?? <ChevronLeftIcon />}
    </PaginationPrimitive.PrevTrigger>
  );
});

const PaginationNextTrigger = forwardRef<
  ComponentRef<typeof PaginationPrimitive.NextTrigger>,
  ComponentProps<typeof PaginationPrimitive.NextTrigger>
>(function PaginationNextTrigger({ className, children, ...props }, ref) {
  return (
    <PaginationPrimitive.NextTrigger
      ref={ref}
      data-slot="pagination-next-trigger"
      className={clsx(
        styles.trigger,
        children == null && styles.iconTrigger,
        normalizeClassName(className),
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </PaginationPrimitive.NextTrigger>
  );
});

const PaginationFirstTrigger = forwardRef<
  ComponentRef<typeof PaginationPrimitive.FirstTrigger>,
  ComponentProps<typeof PaginationPrimitive.FirstTrigger>
>(function PaginationFirstTrigger({ className, children, ...props }, ref) {
  return (
    <PaginationPrimitive.FirstTrigger
      ref={ref}
      data-slot="pagination-first-trigger"
      className={clsx(
        styles.trigger,
        children == null && styles.iconTrigger,
        normalizeClassName(className),
      )}
      {...props}
    >
      {children ?? <EdgeIcon side="left" />}
    </PaginationPrimitive.FirstTrigger>
  );
});

const PaginationLastTrigger = forwardRef<
  ComponentRef<typeof PaginationPrimitive.LastTrigger>,
  ComponentProps<typeof PaginationPrimitive.LastTrigger>
>(function PaginationLastTrigger({ className, children, ...props }, ref) {
  return (
    <PaginationPrimitive.LastTrigger
      ref={ref}
      data-slot="pagination-last-trigger"
      className={clsx(
        styles.trigger,
        children == null && styles.iconTrigger,
        normalizeClassName(className),
      )}
      {...props}
    >
      {children ?? <EdgeIcon side="right" />}
    </PaginationPrimitive.LastTrigger>
  );
});

const PaginationContext = PaginationPrimitive.Context;

function PaginationItems() {
  return (
    <PaginationContext>
      {(pagination) =>
        pagination.pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationItem key={index} {...page}>
              {page.value}
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index} index={index} />
          ),
        )
      }
    </PaginationContext>
  );
}

const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  RootProvider: PaginationRootProvider,
  Item: PaginationItem,
  Ellipsis: PaginationEllipsis,
  PrevTrigger: PaginationPrevTrigger,
  NextTrigger: PaginationNextTrigger,
  FirstTrigger: PaginationFirstTrigger,
  LastTrigger: PaginationLastTrigger,
  Context: PaginationContext,
  Items: PaginationItems,
  usePagination,
  usePaginationContext,
});

export { Pagination };