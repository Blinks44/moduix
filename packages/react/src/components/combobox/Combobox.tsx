import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent,
  type ComboboxRootProps,
  type ComboboxRootProviderComponent,
  type ComboboxRootProviderProps,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
} from '@ark-ui/react/combobox';
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
  ComponentRef<typeof ComboboxPrimitive.Label>,
  ComponentProps<typeof ComboboxPrimitive.Label>
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
  ComponentRef<typeof ComboboxPrimitive.Control>,
  ComponentProps<typeof ComboboxPrimitive.Control>
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
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComponentProps<typeof ComboboxPrimitive.Input>
>(function ComboboxInput({ asChild, className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="combobox-input"
      asChild={asChild}
      className={clsx(!asChild && styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const ComboboxClearTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ClearTrigger>,
  ComponentProps<typeof ComboboxPrimitive.ClearTrigger>
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
  ComponentRef<typeof ComboboxPrimitive.Trigger>,
  ComponentProps<typeof ComboboxPrimitive.Trigger>
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
  ComponentRef<typeof ComboboxPrimitive.Positioner>,
  ComponentProps<typeof ComboboxPrimitive.Positioner>
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
  ComponentRef<typeof ComboboxPrimitive.Content>,
  ComponentProps<typeof ComboboxPrimitive.Content>
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
  ComponentRef<typeof ComboboxPrimitive.Empty>,
  ComponentProps<typeof ComboboxPrimitive.Empty>
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
  ComponentRef<typeof ComboboxPrimitive.List>,
  ComponentProps<typeof ComboboxPrimitive.List>
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
  ComponentRef<typeof ComboboxPrimitive.ItemGroup>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroup>
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
  ComponentRef<typeof ComboboxPrimitive.ItemGroupLabel>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>
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
  ComponentRef<typeof ComboboxPrimitive.Item>,
  ComponentProps<typeof ComboboxPrimitive.Item>
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
  ComponentRef<typeof ComboboxPrimitive.ItemText>,
  ComponentProps<typeof ComboboxPrimitive.ItemText>
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
  ComponentRef<typeof ComboboxPrimitive.ItemIndicator>,
  ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
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

export { Combobox, Portal, useCombobox, useComboboxContext, useComboboxItemContext };
export type {
  CollectionItem as ComboboxCollectionItem,
  ComboboxClearTriggerBaseProps,
  ComboboxClearTriggerProps,
  ComboboxContentBaseProps,
  ComboboxContentProps,
  ComboboxContextProps,
  ComboboxControlBaseProps,
  ComboboxControlProps,
  ComboboxEmptyBaseProps,
  ComboboxEmptyProps,
  ComboboxFocusOutsideEvent,
  ComboboxHighlightChangeDetails,
  ComboboxInputBaseProps,
  ComboboxInputProps,
  ComboboxInputValueChangeDetails,
  ComboboxInteractOutsideEvent,
  ComboboxItemBaseProps,
  ComboboxItemContextProps,
  ComboboxItemGroupBaseProps,
  ComboboxItemGroupLabelBaseProps,
  ComboboxItemGroupLabelProps,
  ComboboxItemGroupProps,
  ComboboxItemIndicatorBaseProps,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxItemTextBaseProps,
  ComboboxItemTextProps,
  ComboboxLabelBaseProps,
  ComboboxLabelProps,
  ComboboxListBaseProps,
  ComboboxListProps,
  ComboboxOpenChangeDetails,
  ComboboxPointerDownOutsideEvent,
  ComboboxPositionerBaseProps,
  ComboboxPositionerProps,
  ComboboxRootBaseProps,
  ComboboxRootComponent,
  ComboboxRootComponentProps,
  ComboboxRootProps,
  ComboboxRootProviderBaseProps,
  ComboboxRootProviderComponent,
  ComboboxRootProviderProps,
  ComboboxSelectionDetails,
  ComboboxTriggerBaseProps,
  ComboboxTriggerProps,
  ComboboxValueChangeDetails,
  UseComboboxContext,
  UseComboboxItemContext,
  UseComboboxProps,
  UseComboboxReturn,
} from '@ark-ui/react/combobox';