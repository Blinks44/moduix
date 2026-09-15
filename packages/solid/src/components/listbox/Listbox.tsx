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
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, SearchIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';
import styles from './Listbox.module.css';

const ListboxRoot = function ListboxRoot<T extends CollectionItem>(props: ListboxRootProps<T>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="listbox-root"
    />
  );
} as ListboxRootComponent;

const ListboxRootProvider = function ListboxRootProvider<T extends CollectionItem>(
  props: ListboxRootProviderProps<T>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="listbox-root-provider"
    />
  );
} as ListboxRootProviderComponent;

function ListboxLabel(props: ComponentProps<typeof ListboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="listbox-label"
    />
  );
}

function ListboxInput(props: ComponentProps<typeof ListboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Input
      class={clsx(styles.input, local.class)}
      {...others}
      data-slot="listbox-input"
    />
  );
}

function ListboxFilter(props: ComponentProps<'div'>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <div class={clsx(styles.filter, local.class)} {...others} data-slot="listbox-filter">
      <SearchIcon data-slot="listbox-filter-icon" class={styles.filterIcon} />
      {local.children}
    </div>
  );
}

function ListboxClearTrigger(props: HTMLArkProps<'button'>) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class', 'type']);
  const resolvedChildren = children(() => local.children);

  return (
    <CloseButton.Root
      class={clsx(styles.clearTrigger, local.class)}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? 'Clear search'}
      {...others}
      data-slot="listbox-clear-trigger"
    >
      {resolvedChildren()}
    </CloseButton.Root>
  );
}

function ListboxContent(props: ComponentProps<typeof ListboxPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="listbox-content"
    />
  );
}

function ListboxEmpty(props: ComponentProps<typeof ListboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Empty
      class={clsx(styles.empty, local.class)}
      {...others}
      data-slot="listbox-empty"
    />
  );
}

function ListboxItemGroup(props: ComponentProps<typeof ListboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
      {...others}
      data-slot="listbox-item-group"
    />
  );
}

function ListboxItemGroupLabel(props: ComponentProps<typeof ListboxPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemGroupLabel
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
      data-slot="listbox-item-group-label"
    />
  );
}

function ListboxItem(props: ComponentProps<typeof ListboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="listbox-item"
    />
  );
}

function ListboxItemText(props: ComponentProps<typeof ListboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
      {...others}
      data-slot="listbox-item-text"
    />
  );
}

function ListboxItemIndicator(props: ComponentProps<typeof ListboxPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ListboxPrimitive.ItemIndicator
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="listbox-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </ListboxPrimitive.ItemIndicator>
  );
}

function ListboxValueText(props: ComponentProps<typeof ListboxPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="listbox-value-text"
    />
  );
}

function ListboxItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextContent, local.class)}
      {...others}
      data-slot="listbox-item-text-content"
    />
  );
}

function ListboxItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextIcon, local.class)}
      {...others}
      data-slot="listbox-item-text-icon"
    />
  );
}

function ListboxItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.itemTextLabel, local.class)}
      {...others}
      data-slot="listbox-item-text-label"
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