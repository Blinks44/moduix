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
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CheckIcon, SearchIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './Listbox.module.css';

const Listbox = forwardRef(function Listbox<T extends CollectionItem>(
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
    {
      'aria-label': ariaLabel = a11yLabels.clearSearch,
      className,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) {
    return (
      <CloseButton
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={clsx(styles.clearTrigger, className)}
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