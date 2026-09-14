import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
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
} from '@ark-ui/solid/listbox';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, SearchIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';

const ListboxRoot = function ListboxRoot<T extends CollectionItem>(props: ListboxRootProps<T>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Root
      data-slot="listbox-root"
      class={cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-3 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    />
  );
} as ListboxRootComponent;

const ListboxRootProvider = function ListboxRootProvider<T extends CollectionItem>(
  props: ListboxRootProviderProps<T>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.RootProvider
      data-slot="listbox-root-provider"
      class={cn(
        'box-border flex w-64 max-w-full min-w-0 flex-col gap-3 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    />
  );
} as ListboxRootProviderComponent;

function ListboxLabel(props: ComponentProps<typeof ListboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Label
      data-slot="listbox-label"
      class={cn('text-sm leading-5 font-medium text-foreground select-none', local.class)}
      {...others}
    />
  );
}

function ListboxInput(props: ComponentProps<typeof ListboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Input
      data-slot="listbox-input"
      class={cn(
        'm-0 box-border min-h-control-md w-full rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:ps-9 group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:pe-10 group-has-[+_[data-slot=listbox-content]]/listbox-filter:rounded-b-none group-has-[+_[data-slot=listbox-content]]/listbox-filter:border-b-0 placeholder:text-muted-foreground focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ListboxFilter(props: ComponentProps<'div'>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <div
      data-slot="listbox-filter"
      class={cn('group/listbox-filter peer/listbox-filter relative box-border w-full', local.class)}
      {...others}
    >
      <SearchIcon
        data-slot="listbox-filter-icon"
        class="pointer-events-none absolute start-3 top-1/2 z-1 size-4 -translate-y-1/2 text-muted-foreground"
      />
      {local.children}
    </div>
  );
}

function ListboxClearTrigger(props: HTMLArkProps<'button'>) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class', 'type']);
  const resolvedChildren = children(() => local.children);

  return (
    <CloseButton.Root
      data-slot="listbox-clear-trigger"
      class={cn(
        'absolute end-3 top-1/2 size-control-xs -translate-y-1/2 rounded-sm bg-transparent text-muted-foreground [&>svg]:size-4 [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-foreground',
        local.class,
      )}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? 'Clear search'}
      {...others}
    >
      {resolvedChildren()}
    </CloseButton.Root>
  );
}

function ListboxContent(props: ComponentProps<typeof ListboxPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Content
      data-slot="listbox-content"
      class={cn(
        'box-border flex max-h-56 min-h-0 scroll-py-1 [scrollbar-gutter:stable] flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-md border border-border bg-background py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out peer-data-[slot=listbox-filter]/listbox-filter:-mt-3 peer-data-[slot=listbox-filter]/listbox-filter:rounded-t-none focus-visible:outline-ring data-[layout=grid]:grid data-[layout=grid]:grid-cols-[repeat(var(--column-count),minmax(0,1fr))] data-[layout=grid]:gap-1 data-[layout=grid]:p-2 data-[orientation=horizontal]:not-data-[layout=grid]:max-h-none data-[orientation=horizontal]:not-data-[layout=grid]:flex-row data-[orientation=horizontal]:not-data-[layout=grid]:gap-2 data-[orientation=horizontal]:not-data-[layout=grid]:overflow-x-auto data-[orientation=horizontal]:not-data-[layout=grid]:overflow-y-hidden data-[orientation=horizontal]:not-data-[layout=grid]:px-1 motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ListboxEmpty(props: ComponentProps<typeof ListboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Empty
      data-slot="listbox-empty"
      class={cn('px-3 py-1 text-center text-sm leading-5 text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function ListboxItemGroup(props: ComponentProps<typeof ListboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemGroup
      data-slot="listbox-item-group"
      class={cn('flex flex-col [&+&]:mt-2', local.class)}
      {...others}
    />
  );
}

function ListboxItemGroupLabel(props: ComponentProps<typeof ListboxPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemGroupLabel
      data-slot="listbox-item-group-label"
      class={cn(
        'px-2 py-1 text-xs leading-4 font-normal text-muted-foreground select-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ListboxItem(props: ComponentProps<typeof ListboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Item
      data-slot="listbox-item"
      class={cn(
        'relative mx-1 box-border grid min-h-control-sm w-[calc(100%-0.5rem)] cursor-pointer grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-sm bg-transparent px-3 py-1 text-sm leading-5 text-foreground outline-0 transition-[background-color,color] duration-200 ease-in-out select-none data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[layout=grid]:mx-0 data-[layout=grid]:w-full data-[layout=grid]:min-w-0 data-[layout=grid]:grid-cols-1 data-[layout=grid]:justify-items-center data-[layout=grid]:text-center data-[layout=grid]:data-selected:bg-muted data-[layout=grid]:data-selected:text-foreground data-[orientation=horizontal]:not-data-[layout=grid]:w-44 data-[orientation=horizontal]:not-data-[layout=grid]:min-w-44 data-[orientation=horizontal]:not-data-[layout=grid]:items-start motion-reduce:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function ListboxItemText(props: ComponentProps<typeof ListboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemText
      data-slot="listbox-item-text"
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
    />
  );
}

function ListboxItemIndicator(props: ComponentProps<typeof ListboxPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ListboxPrimitive.ItemIndicator
      data-slot="listbox-item-indicator"
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center data-[state=unchecked]:invisible [&>svg]:size-3',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <CheckIcon />}
    </ListboxPrimitive.ItemIndicator>
  );
}

function ListboxValueText(props: ComponentProps<typeof ListboxPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ValueText
      data-slot="listbox-value-text"
      class={cn('text-sm leading-5 text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function ListboxItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="listbox-item-text-content"
      class={cn('inline-flex max-w-full min-w-0 items-center gap-2 align-top', local.class)}
      {...others}
    />
  );
}

function ListboxItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="listbox-item-text-icon"
      class={cn('inline-flex size-4 shrink-0 items-center justify-center', local.class)}
      {...others}
    />
  );
}

function ListboxItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="listbox-item-text-label"
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
    />
  );
}

type ListboxComponent = ListboxRootComponent & {
  Root: typeof ListboxRoot;
  RootProvider: typeof ListboxRootProvider;
  Label: typeof ListboxLabel;
  Input: typeof ListboxInput;
  Filter: typeof ListboxFilter;
  ClearTrigger: typeof ListboxClearTrigger;
  Content: typeof ListboxContent;
  Empty: typeof ListboxEmpty;
  ItemGroup: typeof ListboxItemGroup;
  ItemGroupLabel: typeof ListboxItemGroupLabel;
  Item: typeof ListboxItem;
  ItemText: typeof ListboxItemText;
  ItemIndicator: typeof ListboxItemIndicator;
  ValueText: typeof ListboxValueText;
  Context: typeof ListboxPrimitive.Context;
  ItemContext: typeof ListboxPrimitive.ItemContext;
  ItemTextContent: typeof ListboxItemTextContent;
  ItemTextIcon: typeof ListboxItemTextIcon;
  ItemTextLabel: typeof ListboxItemTextLabel;
  useListbox: typeof useListbox;
  useListboxContext: typeof useListboxContext;
  useListboxItemContext: typeof useListboxItemContext;
};

const Listbox: ListboxComponent = Object.assign(ListboxRoot, {
  Root: ListboxRoot,
  RootProvider: ListboxRootProvider,
  Label: ListboxLabel,
  Input: ListboxInput,
  Filter: ListboxFilter,
  ClearTrigger: ListboxClearTrigger,
  Content: ListboxContent,
  Empty: ListboxEmpty,
  ItemGroup: ListboxItemGroup,
  ItemGroupLabel: ListboxItemGroupLabel,
  Item: ListboxItem,
  ItemText: ListboxItemText,
  ItemIndicator: ListboxItemIndicator,
  ValueText: ListboxValueText,
  Context: ListboxPrimitive.Context,
  ItemContext: ListboxPrimitive.ItemContext,
  ItemTextContent: ListboxItemTextContent,
  ItemTextIcon: ListboxItemTextIcon,
  ItemTextLabel: ListboxItemTextLabel,
  useListbox,
  useListboxContext,
  useListboxItemContext,
});

export { Listbox, useListbox, useListboxContext, useListboxItemContext };