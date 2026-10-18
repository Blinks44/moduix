import {
  Pagination as PaginationPrimitive,
  usePagination,
  usePaginationContext,
} from '@ark-ui/solid/pagination';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from '@/lib/moduix/icons/ui';
import styles from './Pagination.module.css';

function Pagination(props: ComponentProps<typeof PaginationPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PaginationPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="pagination-root"
    />
  );
}

function PaginationRootProvider(props: ComponentProps<typeof PaginationPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PaginationPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="pagination-root-provider"
    />
  );
}

function PaginationItem(props: ComponentProps<typeof PaginationPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PaginationPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="pagination-item"
    />
  );
}

function PaginationEllipsis(props: ComponentProps<typeof PaginationPrimitive.Ellipsis>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PaginationPrimitive.Ellipsis
      asChild={local.asChild}
      class={clsx(styles.ellipsis, local.class)}
      {...others}
      data-slot="pagination-ellipsis"
      aria-hidden="true"
    >
      {resolvedChildren() ?? (!local.asChild && <EllipsisIcon />)}
    </PaginationPrimitive.Ellipsis>
  );
}

function EdgeIcon(props: { side: 'left' | 'right' }) {
  return (
    <span class={styles.edgeIcon} aria-hidden>
      {props.side === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      {props.side === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </span>
  );
}

function PaginationPrevTrigger(props: ComponentProps<typeof PaginationPrimitive.PrevTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PaginationPrimitive.PrevTrigger
      asChild={local.asChild}
      class={clsx(styles.trigger, resolvedChildren() == null && styles.iconTrigger, local.class)}
      {...others}
      data-slot="pagination-prev-trigger"
    >
      {resolvedChildren() ?? (!local.asChild && <ChevronLeftIcon />)}
    </PaginationPrimitive.PrevTrigger>
  );
}

function PaginationNextTrigger(props: ComponentProps<typeof PaginationPrimitive.NextTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PaginationPrimitive.NextTrigger
      asChild={local.asChild}
      class={clsx(styles.trigger, resolvedChildren() == null && styles.iconTrigger, local.class)}
      {...others}
      data-slot="pagination-next-trigger"
    >
      {resolvedChildren() ?? (!local.asChild && <ChevronRightIcon />)}
    </PaginationPrimitive.NextTrigger>
  );
}

function PaginationFirstTrigger(props: ComponentProps<typeof PaginationPrimitive.FirstTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PaginationPrimitive.FirstTrigger
      asChild={local.asChild}
      class={clsx(styles.trigger, resolvedChildren() == null && styles.iconTrigger, local.class)}
      {...others}
      data-slot="pagination-first-trigger"
    >
      {resolvedChildren() ?? (!local.asChild && <EdgeIcon side="left" />)}
    </PaginationPrimitive.FirstTrigger>
  );
}

function PaginationLastTrigger(props: ComponentProps<typeof PaginationPrimitive.LastTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PaginationPrimitive.LastTrigger
      asChild={local.asChild}
      class={clsx(styles.trigger, resolvedChildren() == null && styles.iconTrigger, local.class)}
      {...others}
      data-slot="pagination-last-trigger"
    >
      {resolvedChildren() ?? (!local.asChild && <EdgeIcon side="right" />)}
    </PaginationPrimitive.LastTrigger>
  );
}

const PaginationContext = PaginationPrimitive.Context;

function PaginationItems() {
  return (
    <PaginationContext>
      {(pagination) => (
        <For each={pagination().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <PaginationItem {...page}>{page.value}</PaginationItem>
            ) : (
              <PaginationEllipsis index={index()} />
            )
          }
        </For>
      )}
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
export type {
  PaginationContextProps,
  PaginationEllipsisProps,
  PaginationFirstTriggerProps,
  PaginationItemLabelDetails,
  PaginationItemProps,
  PaginationLastTriggerProps,
  PaginationNextTriggerProps,
  PaginationPageChangeDetails,
  PaginationPageSizeChangeDetails,
  PaginationPageUrlDetails,
  PaginationPrevTriggerProps,
  PaginationRootProps,
  PaginationRootProviderProps,
  UsePaginationContext,
  UsePaginationProps,
  UsePaginationReturn,
} from '@ark-ui/solid/pagination';