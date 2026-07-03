import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import {
  Listbox as ListboxPrimitive,
  type CollectionItem,
  type ListboxRootComponent,
  type ListboxRootProps,
  type ListboxRootProviderComponent,
  type ListboxRootProviderProps,
} from '@ark-ui/react/listbox';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Listbox.module.css';

const ListboxRoot = forwardRef(function ListboxRoot<T extends CollectionItem>(
  { className, ...props }: ListboxRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ListboxPrimitive.Root
      ref={ref}
      data-slot="listbox-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as ListboxRootComponent;

const ListboxRootProvider = forwardRef(function ListboxRootProvider<T extends CollectionItem>(
  { className, ...props }: ListboxRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ListboxPrimitive.RootProvider
      ref={ref}
      data-slot="listbox-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const ListboxContent = forwardRef<
  ComponentRef<typeof ListboxPrimitive.Content>,
  ComponentProps<typeof ListboxPrimitive.Content>
>(function ListboxContent({ className, ...props }, ref) {
  return (
    <ListboxPrimitive.Content
      ref={ref}
      data-slot="listbox-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-empty"
      className={clsx(styles.empty, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-item-group-label"
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
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
      data-slot="listbox-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

function ListboxItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="listbox-item-text-content"
      className={clsx(styles.itemTextContent, normalizeClassName(className))}
      {...props}
    />
  );
}

function ListboxItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="listbox-item-text-icon"
      className={clsx(styles.itemTextIcon, normalizeClassName(className))}
      {...props}
    />
  );
}

function ListboxItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="listbox-item-text-label"
      className={clsx(styles.itemTextLabel, normalizeClassName(className))}
      {...props}
    />
  );
}

const Listbox = Object.assign(ListboxRoot, {
  Root: ListboxRoot,
  RootProvider: ListboxRootProvider,
  Label: ListboxLabel,
  Input: ListboxInput,
  Content: ListboxContent,
  Empty: ListboxEmpty,
  ItemGroup: ListboxItemGroup,
  ItemGroupLabel: ListboxItemGroupLabel,
  Item: ListboxItem,
  ItemText: ListboxItemText,
  ItemIndicator: ListboxItemIndicator,
  ValueText: ListboxValueText,
  ItemTextContent: ListboxItemTextContent,
  ItemTextIcon: ListboxItemTextIcon,
  ItemTextLabel: ListboxItemTextLabel,
});

export { Listbox };