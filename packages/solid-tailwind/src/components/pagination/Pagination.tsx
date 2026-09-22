import {
  Pagination as PaginationPrimitive,
  usePagination,
  usePaginationContext,
} from '@ark-ui/solid/pagination';
import type { ComponentProps } from 'solid-js';
import { children, For, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';

function Pagination(props: ComponentProps<typeof PaginationPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <PaginationPrimitive.Root
      asChild={local.asChild}
      class={cn(
        'inline-flex max-w-full items-center gap-1 overflow-x-auto text-foreground',
        local.class,
      )}
      {...others}
      data-slot="pagination-root"
    >
      {local.children}
    </PaginationPrimitive.Root>
  );
}

function PaginationRootProvider(props: ComponentProps<typeof PaginationPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <PaginationPrimitive.RootProvider
      asChild={local.asChild}
      class={cn(
        'inline-flex max-w-full items-center gap-1 overflow-x-auto text-foreground',
        local.class,
      )}
      {...others}
      data-slot="pagination-root-provider"
    >
      {local.children}
    </PaginationPrimitive.RootProvider>
  );
}

function PaginationItem(props: ComponentProps<typeof PaginationPrimitive.Item>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PaginationPrimitive.Item
      asChild={local.asChild}
      class={cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-2 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-selected:border-foreground data-selected:bg-foreground data-selected:text-background [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:data-selected:hover:bg-foreground',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        local.class,
      )}
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
      class={cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium text-muted-foreground tabular-nums select-none',
        local.class,
      )}
      {...others}
      data-slot="pagination-ellipsis"
    >
      {resolvedChildren() ?? (!local.asChild && '...')}
    </PaginationPrimitive.Ellipsis>
  );
}

function EdgeIcon(props: { side: 'left' | 'right' }) {
  return (
    <span class="inline-flex items-center justify-center [&_svg+svg]:-ms-2" aria-hidden>
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
      class={cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-3 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        (local.children == null || local.children === false) &&
          'w-control-md p-0 rtl:[&_svg]:-scale-x-100',
        local.class,
      )}
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
      class={cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-3 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        (local.children == null || local.children === false) &&
          'w-control-md p-0 rtl:[&_svg]:-scale-x-100',
        local.class,
      )}
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
      class={cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-3 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        (local.children == null || local.children === false) &&
          'w-control-md p-0 rtl:[&_svg]:-scale-x-100',
        local.class,
      )}
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
      class={cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-3 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        (local.children == null || local.children === false) &&
          'w-control-md p-0 rtl:[&_svg]:-scale-x-100',
        local.class,
      )}
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
