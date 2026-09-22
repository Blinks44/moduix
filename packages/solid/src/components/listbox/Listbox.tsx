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

const Listbox = function Listbox<T extends CollectionItem>(props: ListboxRootProps<T>) {
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
    <CloseButton
      class={clsx(styles.clearTrigger, local.class)}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? 'Clear search'}
      {...others}
      data-slot="listbox-clear-trigger"
    >
      {resolvedChildren()}
    </CloseButton>
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
