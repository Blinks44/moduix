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
      data-slot="listbox-root"
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
} as ListboxRootProviderComponent;

function ListboxLabel(props: ComponentProps<typeof ListboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Label
      data-slot="listbox-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function ListboxInput(props: ComponentProps<typeof ListboxPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Input
      data-slot="listbox-input"
      class={clsx(styles.input, local.class)}
      {...others}
    />
  );
}

function ListboxFilter(props: ComponentProps<'div'>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <div data-slot="listbox-filter" class={clsx(styles.filter, local.class)} {...others}>
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
      data-slot="listbox-clear-trigger"
      class={clsx(styles.clearTrigger, local.class)}
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
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function ListboxEmpty(props: ComponentProps<typeof ListboxPrimitive.Empty>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Empty
      data-slot="listbox-empty"
      class={clsx(styles.empty, local.class)}
      {...others}
    />
  );
}

function ListboxItemGroup(props: ComponentProps<typeof ListboxPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemGroup
      data-slot="listbox-item-group"
      class={clsx(styles.itemGroup, local.class)}
      {...others}
    />
  );
}

function ListboxItemGroupLabel(props: ComponentProps<typeof ListboxPrimitive.ItemGroupLabel>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemGroupLabel
      data-slot="listbox-item-group-label"
      class={clsx(styles.itemGroupLabel, local.class)}
      {...others}
    />
  );
}

function ListboxItem(props: ComponentProps<typeof ListboxPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.Item
      data-slot="listbox-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function ListboxItemText(props: ComponentProps<typeof ListboxPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ListboxPrimitive.ItemText
      data-slot="listbox-item-text"
      class={clsx(styles.itemText, local.class)}
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
      class={clsx(styles.itemIndicator, local.class)}
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
      class={clsx(styles.valueText, local.class)}
      {...others}
    />
  );
}

function ListboxItemTextContent(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="listbox-item-text-content"
      class={clsx(styles.itemTextContent, local.class)}
      {...others}
    />
  );
}

function ListboxItemTextIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="listbox-item-text-icon"
      class={clsx(styles.itemTextIcon, local.class)}
      {...others}
    />
  );
}

function ListboxItemTextLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-slot="listbox-item-text-label"
      class={clsx(styles.itemTextLabel, local.class)}
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