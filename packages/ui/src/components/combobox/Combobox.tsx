import type { ForwardedRef } from 'react';
import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
  type ComboboxRootProviderComponent,
  type ComboboxRootProviderProps,
  createListCollection,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
  useListCollection,
} from '@ark-ui/react/combobox';
import { useFilter } from '@ark-ui/react/locale';
import { Portal } from '@ark-ui/react/portal';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon, ChevronUpDownIcon, CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Combobox.module.css';

const ComboboxRoot = forwardRef(function ComboboxRoot<T extends CollectionItem>(
  { className, ...props }: ComboboxRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ComboboxPrimitive.Root
      ref={ref}
      data-slot="combobox-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as ComboboxRootComponent;

const ComboboxRootProvider = forwardRef(function ComboboxRootProvider<T extends CollectionItem>(
  { className, ...props }: ComboboxRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <ComboboxPrimitive.RootProvider
      ref={ref}
      data-slot="combobox-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as ComboboxRootProviderComponent;

const ComboboxLabel = forwardRef<
  HTMLLabelElement,
  React.ComponentProps<typeof ComboboxPrimitive.Label>
>(function ComboboxLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Label
      ref={ref}
      data-slot="combobox-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxControl = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Control>
>(function ComboboxControl({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Control
      ref={ref}
      data-slot="combobox-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof ComboboxPrimitive.Input>
>(function ComboboxInput({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="combobox-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxClearTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ComboboxPrimitive.ClearTrigger>
>(function ComboboxClearTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      data-slot="combobox-clear-trigger"
      className={clsx(styles.clearTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CloseIcon />}
    </ComboboxPrimitive.ClearTrigger>
  );
});

const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ComboboxPrimitive.Trigger>
>(function ComboboxTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      data-slot="combobox-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronUpDownIcon />}
    </ComboboxPrimitive.Trigger>
  );
});

const ComboboxPositioner = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Positioner>
>(function ComboboxPositioner({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Positioner
      ref={ref}
      data-slot="combobox-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Content>
>(function ComboboxContent({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Content
      ref={ref}
      data-slot="combobox-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Empty>
>(function ComboboxEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      data-slot="combobox-empty"
      className={clsx(styles.empty, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxList = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.List>
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      data-slot="combobox-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxItemGroup = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.ItemGroup>
>(function ComboboxItemGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroup
      ref={ref}
      data-slot="combobox-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxItemGroupLabel = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>
>(function ComboboxItemGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroupLabel
      ref={ref}
      data-slot="combobox-item-group-label"
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxItem = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Item>
>(function ComboboxItem({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      data-slot="combobox-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxItemText = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.ItemText>
>(function ComboboxItemText({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemText
      ref={ref}
      data-slot="combobox-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxItemIndicator = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
>(function ComboboxItemIndicator({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      data-slot="combobox-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
});

const ComboboxContext = ComboboxPrimitive.Context;
const ComboboxItemContext = ComboboxPrimitive.ItemContext;

const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  RootProvider: ComboboxRootProvider,
  Label: ComboboxLabel,
  Control: ComboboxControl,
  Input: ComboboxInput,
  ClearTrigger: ComboboxClearTrigger,
  Trigger: ComboboxTrigger,
  Positioner: ComboboxPositioner,
  Content: ComboboxContent,
  Empty: ComboboxEmpty,
  List: ComboboxList,
  ItemGroup: ComboboxItemGroup,
  ItemGroupLabel: ComboboxItemGroupLabel,
  Item: ComboboxItem,
  ItemText: ComboboxItemText,
  ItemIndicator: ComboboxItemIndicator,
  Context: ComboboxContext,
  ItemContext: ComboboxItemContext,
});

export {
  Combobox,
  Portal,
  createListCollection,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
  useFilter,
  useListCollection,
};
export type {
  CollectionItem,
  ComboboxFocusOutsideEvent,
  ComboboxHighlightChangeDetails,
  ComboboxInputValueChangeDetails,
  ComboboxInteractOutsideEvent,
  ComboboxOpenChangeDetails,
  ComboboxPointerDownOutsideEvent,
  ComboboxSelectionDetails,
  ComboboxValueChangeDetails,
  ListCollection,
  UseComboboxContext,
  UseComboboxItemContext,
  UseComboboxProps,
  UseComboboxReturn,
  UseListCollectionProps,
} from '@ark-ui/react/combobox';