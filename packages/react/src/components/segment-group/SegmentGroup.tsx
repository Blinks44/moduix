import type { ComponentProps, ComponentRef } from 'react';
import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@ark-ui/react/segment-group';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './SegmentGroup.module.css';

const SegmentGroupRoot = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Root>,
  ComponentProps<typeof SegmentGroupPrimitive.Root>
>(function SegmentGroupRoot({ className, orientation = 'horizontal', ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      data-slot="segment-group-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupRootProvider = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.RootProvider>,
  ComponentProps<typeof SegmentGroupPrimitive.RootProvider>
>(function SegmentGroupRootProvider({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.RootProvider
      ref={ref}
      data-slot="segment-group-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupLabel = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Label>,
  ComponentProps<typeof SegmentGroupPrimitive.Label>
>(function SegmentGroupLabel({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Label
      ref={ref}
      data-slot="segment-group-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupItem = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Item>,
  ComponentProps<typeof SegmentGroupPrimitive.Item>
>(function SegmentGroupItem({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Item
      ref={ref}
      data-slot="segment-group-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupItemControl = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.ItemControl>,
  ComponentProps<typeof SegmentGroupPrimitive.ItemControl>
>(function SegmentGroupItemControl({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.ItemControl
      ref={ref}
      data-slot="segment-group-item-control"
      className={clsx(styles.itemControl, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupItemText = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.ItemText>,
  ComponentProps<typeof SegmentGroupPrimitive.ItemText>
>(function SegmentGroupItemText({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.ItemText
      ref={ref}
      data-slot="segment-group-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupItemHiddenInput = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.ItemHiddenInput>,
  ComponentProps<typeof SegmentGroupPrimitive.ItemHiddenInput>
>(function SegmentGroupItemHiddenInput(props, ref) {
  return (
    <SegmentGroupPrimitive.ItemHiddenInput
      ref={ref}
      data-slot="segment-group-item-hidden-input"
      {...props}
    />
  );
});

const SegmentGroupIndicator = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Indicator>,
  ComponentProps<typeof SegmentGroupPrimitive.Indicator>
>(function SegmentGroupIndicator({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Indicator
      ref={ref}
      data-slot="segment-group-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const SegmentGroupContext = SegmentGroupPrimitive.Context;
const SegmentGroupItemContext = SegmentGroupPrimitive.ItemContext;

function useSegmentGroup(props: Parameters<typeof useSegmentGroupPrimitive>[0] = {}) {
  return useSegmentGroupPrimitive({ orientation: 'horizontal', ...props });
}

const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  RootProvider: SegmentGroupRootProvider,
  Label: SegmentGroupLabel,
  Item: SegmentGroupItem,
  ItemControl: SegmentGroupItemControl,
  ItemText: SegmentGroupItemText,
  ItemHiddenInput: SegmentGroupItemHiddenInput,
  Indicator: SegmentGroupIndicator,
  Context: SegmentGroupContext,
  ItemContext: SegmentGroupItemContext,
});

export { SegmentGroup, useSegmentGroup, useSegmentGroupContext, useSegmentGroupItemContext };
export type {
  SegmentGroupContextProps,
  SegmentGroupIndicatorBaseProps,
  SegmentGroupIndicatorProps,
  SegmentGroupItemBaseProps,
  SegmentGroupItemContextProps,
  SegmentGroupItemControlBaseProps,
  SegmentGroupItemControlProps,
  SegmentGroupItemHiddenInputBaseProps,
  SegmentGroupItemHiddenInputProps,
  SegmentGroupItemProps,
  SegmentGroupItemTextBaseProps,
  SegmentGroupItemTextProps,
  SegmentGroupLabelBaseProps,
  SegmentGroupLabelProps,
  SegmentGroupRootBaseProps,
  SegmentGroupRootProps,
  SegmentGroupRootProviderBaseProps,
  SegmentGroupRootProviderProps,
  SegmentGroupValueChangeDetails,
  UseSegmentGroupContext,
  UseSegmentGroupItemContext,
  UseSegmentGroupProps,
  UseSegmentGroupReturn,
} from '@ark-ui/react/segment-group';