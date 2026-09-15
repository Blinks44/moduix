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
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, SearchIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './Listbox.module.css';

const ListboxRoot = forwardRef(function ListboxRoot<T extends CollectionItem>(
  { className, ...props }: ListboxRootProps<T>,
  ref: ForwardedRef<ComponentRef<typeof ListboxPrimitive.Root>>,
) {
  return (
    <ListboxPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.input, className)}
      {...props}
      data-slot="listbox-input"
    />
  );
});

function ListboxFilter({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx(styles.filter, className)} {...props} data-slot="listbox-filter">
      <SearchIcon data-slot="listbox-filter-icon" className={styles.filterIcon} />
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
      <CloseButton.Root
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={clsx(styles.clearTrigger, className)}
        {...props}
        data-slot="listbox-clear-trigger"
      >
        {children}
      </CloseButton.Root>
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
      className={clsx(styles.content, className)}
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
      className={clsx(styles.empty, className)}
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
      className={clsx(styles.itemGroup, className)}
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
      className={clsx(styles.itemGroupLabel, className)}
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
      className={clsx(styles.item, className)}
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
      className={clsx(styles.itemText, className)}
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
      className={clsx(styles.itemIndicator, className)}
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
      className={clsx(styles.valueText, className)}
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
        className={clsx(styles.itemTextContent, className)}
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
        className={clsx(styles.itemTextIcon, className)}
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
        className={clsx(styles.itemTextLabel, className)}
        {...props}
        data-slot="listbox-item-text-label"
      />
    );
  },
);

const Listbox = Object.assign(ListboxRoot, {
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