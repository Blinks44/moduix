import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@ark-ui/react/segment-group';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
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
>(function SegmentGroupItem({ asChild, children, className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Item
      ref={ref}
      asChild={asChild}
      data-slot="segment-group-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    >
      {withItemHiddenInput(children, asChild)}
    </SegmentGroupPrimitive.Item>
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

function withItemHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = (
    <SegmentGroupPrimitive.ItemHiddenInput data-slot="segment-group-item-hidden-input" />
  );

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
}

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

function SegmentGroupItems({
  items,
}: {
  items: readonly { value: string; label: ReactNode; disabled?: boolean }[];
}) {
  return items.map(({ value, label, disabled }) => (
    <SegmentGroupItem key={value} value={value} disabled={disabled}>
      <SegmentGroupItemText>{label}</SegmentGroupItemText>
      <SegmentGroupItemControl />
    </SegmentGroupItem>
  ));
}

const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  RootProvider: SegmentGroupRootProvider,
  Context: SegmentGroupPrimitive.Context,
  ItemContext: SegmentGroupPrimitive.ItemContext,
  Label: SegmentGroupLabel,
  Item: SegmentGroupItem,
  ItemControl: SegmentGroupItemControl,
  ItemText: SegmentGroupItemText,
  Indicator: SegmentGroupIndicator,
  Items: SegmentGroupItems,
});

export { SegmentGroup, useSegmentGroup, useSegmentGroupContext, useSegmentGroupItemContext };