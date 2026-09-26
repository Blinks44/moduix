'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  Listbox as ListboxPrimitive,
  type CollectionItem,
  type ListboxRootComponent,
  type ListboxRootProps,
  type ListboxRootProviderComponent,
  type ListboxRootProviderProps,
  useListbox,
  useListboxContext,
  useListboxItemContext,
} from '@ark-ui/react/listbox';
import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, SearchIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';

const Listbox = forwardRef(function Listbox<T extends CollectionItem>(
  { className, ...props }: ListboxRootProps<T>,
  ref: ForwardedRef<ComponentRef<typeof ListboxPrimitive.Root>>,
) {
  return (
    <ListboxPrimitive.Root
      ref={ref}
      className={cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-3 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="listbox-root"
    />
  );
}) as ListboxRootComponent;

const ListboxRootProvider = forwardRef(function ListboxRootProvider<T extends CollectionItem>(
  { className, ...props }: ListboxRootProviderProps<T>,
  ref: ForwardedRef<ComponentRef<typeof ListboxPrimitive.RootProvider>>,
) {
  return (
    <ListboxPrimitive.RootProvider
      ref={ref}
      className={cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-3 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="listbox-root-provider"
    />
  );
}) as ListboxRootProviderComponent;

const ListboxLabel = forwardRef<
  ComponentRef<typeof ListboxPrimitive.Label>,
  ComponentProps<typeof ListboxPrimitive.Label>
>(function ListboxLabel({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.Label
      ref={ref}
      className={cn('text-sm leading-5 font-medium text-foreground select-none', className)}
      {...props}
      data-slot="listbox-label"
    />
  );
});

const ListboxInput = forwardRef<
  ComponentRef<typeof ListboxPrimitive.Input>,
  ComponentProps<typeof ListboxPrimitive.Input>
>(function ListboxInput({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.Input
      ref={ref}
      className={cn(
        'm-0 box-border min-h-control-md w-full rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:ps-9 group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:pe-10 group-has-[+_[data-slot=listbox-content]]/listbox-filter:rounded-b-none group-has-[+_[data-slot=listbox-content]]/listbox-filter:border-b-0 placeholder:text-muted-foreground focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="listbox-input"
    />
  );
});

function ListboxFilter({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group/listbox-filter peer/listbox-filter relative box-border w-full',
        className,
      )}
      {...props}
      data-slot="listbox-filter"
    >
      <SearchIcon
        data-slot="listbox-filter-icon"
        className="pointer-events-none absolute start-3 top-1/2 z-1 size-4 -translate-y-1/2 text-muted-foreground"
      />
      {children}
    </div>
  );
}

const ListboxClearTrigger = forwardRef<ComponentRef<typeof ark.button>, HTMLArkProps<'button'>>(
  function ListboxClearTrigger(
    { 'aria-label': ariaLabel = 'Clear search', className, children, type = 'button', ...props },
    ref,
  ) {
    return (
      <CloseButton
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={cn(
          'absolute end-3 top-1/2 size-control-xs -translate-y-1/2 rounded-sm bg-transparent text-muted-foreground [&>svg]:size-4 [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-foreground',
          className,
        )}
        {...props}
        data-slot="listbox-clear-trigger"
      >
        {children}
      </CloseButton>
    );
  },
);

const ListboxContent = forwardRef<
  ComponentRef<typeof ListboxPrimitive.Content>,
  ComponentProps<typeof ListboxPrimitive.Content>
>(function ListboxContent({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.Content
      ref={ref}
      className={cn(
        'box-border flex max-h-56 min-h-0 scroll-py-1 [scrollbar-gutter:stable] flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-md border border-border bg-background py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out peer-data-[slot=listbox-filter]/listbox-filter:-mt-3 peer-data-[slot=listbox-filter]/listbox-filter:rounded-t-none focus-visible:outline-ring data-[layout=grid]:grid data-[layout=grid]:grid-cols-[repeat(var(--column-count),minmax(0,1fr))] data-[layout=grid]:gap-1 data-[layout=grid]:p-2 data-[orientation=horizontal]:not-data-[layout=grid]:max-h-none data-[orientation=horizontal]:not-data-[layout=grid]:flex-row data-[orientation=horizontal]:not-data-[layout=grid]:gap-2 data-[orientation=horizontal]:not-data-[layout=grid]:overflow-x-auto data-[orientation=horizontal]:not-data-[layout=grid]:overflow-y-hidden data-[orientation=horizontal]:not-data-[layout=grid]:px-1 motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="listbox-content"
    />
  );
});

const ListboxEmpty = forwardRef<
  ComponentRef<typeof ListboxPrimitive.Empty>,
  ComponentProps<typeof ListboxPrimitive.Empty>
>(function ListboxEmpty({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.Empty
      ref={ref}
      className={cn('px-3 py-1 text-center text-sm leading-5 text-muted-foreground', className)}
      {...props}
      data-slot="listbox-empty"
    />
  );
});

const ListboxItemGroup = forwardRef<
  ComponentRef<typeof ListboxPrimitive.ItemGroup>,
  ComponentProps<typeof ListboxPrimitive.ItemGroup>
>(function ListboxItemGroup({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.ItemGroup
      ref={ref}
      className={cn('flex flex-col [&+&]:mt-2', className)}
      {...props}
      data-slot="listbox-item-group"
    />
  );
});

const ListboxItemGroupLabel = forwardRef<
  ComponentRef<typeof ListboxPrimitive.ItemGroupLabel>,
  ComponentProps<typeof ListboxPrimitive.ItemGroupLabel>
>(function ListboxItemGroupLabel({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.ItemGroupLabel
      ref={ref}
      className={cn(
        'px-2 py-1 text-xs leading-4 font-normal text-muted-foreground select-none',
        className,
      )}
      {...props}
      data-slot="listbox-item-group-label"
    />
  );
});

const ListboxItem = forwardRef<
  ComponentRef<typeof ListboxPrimitive.Item>,
  ComponentProps<typeof ListboxPrimitive.Item>
>(function ListboxItem({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.Item
      ref={ref}
      className={cn(
        'relative mx-1 box-border grid min-h-control-sm w-[calc(100%-0.5rem)] cursor-pointer grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-sm bg-transparent px-3 py-1 text-sm leading-5 text-foreground outline-0 transition-[background-color,color] duration-200 ease-in-out select-none data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[layout=grid]:mx-0 data-[layout=grid]:w-full data-[layout=grid]:min-w-0 data-[layout=grid]:grid-cols-1 data-[layout=grid]:justify-items-center data-[layout=grid]:text-center data-[layout=grid]:data-selected:bg-muted data-[layout=grid]:data-selected:text-foreground data-[orientation=horizontal]:not-data-[layout=grid]:w-44 data-[orientation=horizontal]:not-data-[layout=grid]:min-w-44 data-[orientation=horizontal]:not-data-[layout=grid]:items-start motion-reduce:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground',
        className,
      )}
      {...props}
      data-slot="listbox-item"
    />
  );
});

const ListboxItemText = forwardRef<
  ComponentRef<typeof ListboxPrimitive.ItemText>,
  ComponentProps<typeof ListboxPrimitive.ItemText>
>(function ListboxItemText({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.ItemText
      ref={ref}
      className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="listbox-item-text"
    />
  );
});

const ListboxItemIndicator = forwardRef<
  ComponentRef<typeof ListboxPrimitive.ItemIndicator>,
  ComponentProps<typeof ListboxPrimitive.ItemIndicator>
>(function ListboxItemIndicator({ className, children, ...props }, ref) {
  return (
    <ListboxPrimitive.ItemIndicator
      ref={ref}
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center data-[state=unchecked]:invisible [&>svg]:size-3',
        className,
      )}
      {...props}
      data-slot="listbox-item-indicator"
    >
      {children ?? <CheckIcon />}
    </ListboxPrimitive.ItemIndicator>
  );
});

const ListboxValueText = forwardRef<
  ComponentRef<typeof ListboxPrimitive.ValueText>,
  ComponentProps<typeof ListboxPrimitive.ValueText>
>(function ListboxValueText({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.ValueText
      ref={ref}
      className={cn('text-sm leading-5 text-muted-foreground', className)}
      {...props}
      data-slot="listbox-value-text"
    />
  );
});

const ListboxItemTextContent = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function ListboxItemTextContent({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', className)}
        {...props}
        data-slot="listbox-item-text-content"
      />
    );
  },
);

const ListboxItemTextIcon = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function ListboxItemTextIcon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn('inline-flex size-4 shrink-0 items-center justify-center', className)}
        {...props}
        data-slot="listbox-item-text-icon"
      />
    );
  },
);

const ListboxItemTextLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function ListboxItemTextLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
        {...props}
        data-slot="listbox-item-text-label"
      />
    );
  },
);

const ListboxContext = ListboxPrimitive.Context;
const ListboxItemContext = ListboxPrimitive.ItemContext;

export {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxContext,
  ListboxEmpty,
  ListboxFilter,
  ListboxInput,
  ListboxItem,
  ListboxItemContext,
  ListboxItemGroup,
  ListboxItemGroupLabel,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxItemTextContent,
  ListboxItemTextIcon,
  ListboxItemTextLabel,
  ListboxLabel,
  ListboxRootProvider,
  ListboxValueText,
  useListbox,
  useListboxContext,
  useListboxItemContext,
};