import {
  Pagination as PaginationPrimitive,
  usePagination,
  usePaginationContext,
} from '@ark-ui/react/pagination';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui';
import styles from './Pagination.module.css';

const Pagination = forwardRef<
  ComponentRef<typeof PaginationPrimitive.Root>,
  ComponentProps<typeof PaginationPrimitive.Root>
>(function Pagination({ className, ...props }, ref) {
  return (
    <PaginationPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="pagination-root"
    />
  );
});

const PaginationRootProvider = forwardRef<
  ComponentRef<typeof PaginationPrimitive.RootProvider>,
  ComponentProps<typeof PaginationPrimitive.RootProvider>
>(function PaginationRootProvider({ className, ...props }, ref) {
  return (
    <PaginationPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="pagination-root-provider"
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
      className={clsx(styles.item, className)}
      {...props}
      data-slot="pagination-item"
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
      className={clsx(styles.ellipsis, className)}
      {...props}
      data-slot="pagination-ellipsis"
    >
      {children ?? (!props.asChild && '...')}
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
      className={clsx(
        styles.trigger,
        (children == null || children === false) && styles.iconTrigger,
        className,
      )}
      {...props}
      data-slot="pagination-prev-trigger"
    >
      {children ?? (!props.asChild && <ChevronLeftIcon />)}
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
      className={clsx(
        styles.trigger,
        (children == null || children === false) && styles.iconTrigger,
        className,
      )}
      {...props}
      data-slot="pagination-next-trigger"
    >
      {children ?? (!props.asChild && <ChevronRightIcon />)}
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
      className={clsx(
        styles.trigger,
        (children == null || children === false) && styles.iconTrigger,
        className,
      )}
      {...props}
      data-slot="pagination-first-trigger"
    >
      {children ?? (!props.asChild && <EdgeIcon side="left" />)}
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
      className={clsx(
        styles.trigger,
        (children == null || children === false) && styles.iconTrigger,
        className,
      )}
      {...props}
      data-slot="pagination-last-trigger"
    >
      {children ?? (!props.asChild && <EdgeIcon side="right" />)}
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
            <PaginationItem key={page.value} {...page}>
              {page.value}
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={`ellipsis-${index}`} index={index} />
          ),
        )
      }
    </PaginationContext>
  );
}

export {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
  usePaginationContext,
};
