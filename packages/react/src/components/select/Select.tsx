import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import { Portal } from '@ark-ui/react/portal';
import {
  Select as SelectPrimitive,
  type CollectionItem,
  type SelectRootComponent,
  type SelectRootProps,
  type SelectRootProviderComponent,
  type SelectRootProviderProps,
  useSelect,
  useSelectContext,
  useSelectItemContext,
} from '@ark-ui/react/select';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon, ChevronUpDownIcon, CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Select.module.css';

const SelectRoot = forwardRef(function SelectRoot<T extends CollectionItem>(
  { className, ...props }: SelectRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <SelectPrimitive.Root
      ref={ref}
      data-slot="select-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as SelectRootComponent;

const SelectRootProvider = forwardRef(function SelectRootProvider<T extends CollectionItem>(
  { className, ...props }: SelectRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <SelectPrimitive.RootProvider
      ref={ref}
      data-slot="select-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as SelectRootProviderComponent;

const SelectLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.Label>,
  ComponentProps<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      data-slot="select-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectControl = forwardRef<
  ComponentRef<typeof SelectPrimitive.Control>,
  ComponentProps<typeof SelectPrimitive.Control>
>(function SelectControl({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Control
      ref={ref}
      data-slot="select-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitive.Trigger>,
  ComponentProps<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ asChild, className, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectValueText = forwardRef<
  ComponentRef<typeof SelectPrimitive.ValueText>,
  ComponentProps<typeof SelectPrimitive.ValueText>
>(function SelectValueText({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ValueText
      ref={ref}
      data-slot="select-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectClearTrigger = forwardRef<
  ComponentRef<typeof SelectPrimitive.ClearTrigger>,
  ComponentProps<typeof SelectPrimitive.ClearTrigger>
>(function SelectClearTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.ClearTrigger
      ref={ref}
      data-slot="select-clear-trigger"
      className={clsx(styles.clearTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CloseIcon />}
    </SelectPrimitive.ClearTrigger>
  );
});

const SelectIndicator = forwardRef<
  ComponentRef<typeof SelectPrimitive.Indicator>,
  ComponentProps<typeof SelectPrimitive.Indicator>
>(function SelectIndicator({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Indicator
      ref={ref}
      data-slot="select-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronUpDownIcon />}
    </SelectPrimitive.Indicator>
  );
});

function SelectIndicators({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="select-indicators"
      className={clsx(styles.indicators, normalizeClassName(className))}
      {...props}
    />
  );
}

const SelectPositioner = forwardRef<
  ComponentRef<typeof SelectPrimitive.Positioner>,
  ComponentProps<typeof SelectPrimitive.Positioner>
>(function SelectPositioner({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Positioner
      ref={ref}
      data-slot="select-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectContent = forwardRef<
  ComponentRef<typeof SelectPrimitive.Content>,
  ComponentProps<typeof SelectPrimitive.Content>
>(function SelectContent({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectList = forwardRef<
  ComponentRef<typeof SelectPrimitive.List>,
  ComponentProps<typeof SelectPrimitive.List>
>(function SelectList({ className, ...props }, ref) {
  return (
    <SelectPrimitive.List
      ref={ref}
      data-slot="select-list"
      className={clsx(styles.list, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectItemGroup = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemGroup>,
  ComponentProps<typeof SelectPrimitive.ItemGroup>
>(function SelectItemGroup({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ItemGroup
      ref={ref}
      data-slot="select-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectItemGroupLabel = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemGroupLabel>,
  ComponentProps<typeof SelectPrimitive.ItemGroupLabel>
>(function SelectItemGroupLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ItemGroupLabel
      ref={ref}
      data-slot="select-item-group-label"
      className={clsx(styles.itemGroupLabel, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectItem = forwardRef<
  ComponentRef<typeof SelectPrimitive.Item>,
  ComponentProps<typeof SelectPrimitive.Item>
>(function SelectItem({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectItemText = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemText>,
  ComponentProps<typeof SelectPrimitive.ItemText>
>(function SelectItemText({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ItemText
      ref={ref}
      data-slot="select-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

const SelectItemIndicator = forwardRef<
  ComponentRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentProps<typeof SelectPrimitive.ItemIndicator>
>(function SelectItemIndicator({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      data-slot="select-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </SelectPrimitive.ItemIndicator>
  );
});

const SelectHiddenSelect = forwardRef<
  ComponentRef<typeof SelectPrimitive.HiddenSelect>,
  ComponentProps<typeof SelectPrimitive.HiddenSelect>
>(function SelectHiddenSelect({ className, ...props }, ref) {
  return (
    <SelectPrimitive.HiddenSelect
      ref={ref}
      data-slot="select-hidden-select"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

function SelectItemTextContent({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-content"
      className={clsx(styles.itemTextContent, normalizeClassName(className))}
      {...props}
    />
  );
}

function SelectItemTextIcon({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-icon"
      className={clsx(styles.itemTextIcon, normalizeClassName(className))}
      {...props}
    />
  );
}

function SelectItemTextLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="select-item-text-label"
      className={clsx(styles.itemTextLabel, normalizeClassName(className))}
      {...props}
    />
  );
}

const SelectContext = SelectPrimitive.Context;
const SelectItemContext = SelectPrimitive.ItemContext;

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  RootProvider: SelectRootProvider,
  Label: SelectLabel,
  Control: SelectControl,
  Trigger: SelectTrigger,
  ValueText: SelectValueText,
  ClearTrigger: SelectClearTrigger,
  Indicator: SelectIndicator,
  Indicators: SelectIndicators,
  Positioner: SelectPositioner,
  Content: SelectContent,
  List: SelectList,
  ItemGroup: SelectItemGroup,
  ItemGroupLabel: SelectItemGroupLabel,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  HiddenSelect: SelectHiddenSelect,
  ItemTextContent: SelectItemTextContent,
  ItemTextIcon: SelectItemTextIcon,
  ItemTextLabel: SelectItemTextLabel,
  Context: SelectContext,
  ItemContext: SelectItemContext,
});

export { Select, Portal, useSelect, useSelectContext, useSelectItemContext };
export type {
  SelectFocusOutsideEvent,
  SelectHighlightChangeDetails,
  SelectInteractOutsideEvent,
  SelectOpenChangeDetails,
  SelectPointerDownOutsideEvent,
  SelectRootComponent,
  SelectRootProps,
  SelectRootProviderComponent,
  SelectRootProviderProps,
  SelectValueChangeDetails,
  UseSelectContext,
  UseSelectItemContext,
  UseSelectProps,
  UseSelectReturn,
} from '@ark-ui/react/select';