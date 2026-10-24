'use client';

import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
  type UseSegmentGroupProps,
} from '@ark-ui/react/segment-group';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './SegmentGroup.module.css';

type SegmentGroupSize = 'sm' | 'md' | 'lg';
type SegmentGroupRootProps = ComponentProps<typeof SegmentGroupPrimitive.Root> & {
  size?: SegmentGroupSize;
};
type SegmentGroupRootProviderProps = ComponentProps<typeof SegmentGroupPrimitive.RootProvider> & {
  size?: SegmentGroupSize;
};
type SegmentGroupItemOption = { value: string; label: ReactNode; disabled?: boolean };
type SegmentGroupItemsProps = { items: readonly (string | SegmentGroupItemOption)[] };

function useSegmentGroup({ orientation = 'horizontal', ...props }: UseSegmentGroupProps = {}) {
  return useSegmentGroupPrimitive({ ...props, orientation });
}

const SegmentGroup = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Root>,
  SegmentGroupRootProps
>(function SegmentGroup({ className, orientation = 'horizontal', size = 'md', ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      orientation={orientation}
      data-size={size}
      data-slot="segment-group-root"
    />
  );
});

const SegmentGroupRootProvider = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.RootProvider>,
  SegmentGroupRootProviderProps
>(function SegmentGroupRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <SegmentGroupPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-size={size}
      data-slot="segment-group-root-provider"
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
      className={clsx(styles.label, className)}
      {...props}
      data-slot="segment-group-label"
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
      className={clsx(styles.item, className)}
      {...props}
      data-slot="segment-group-item"
    />
  );
});

const SegmentGroupItemText = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.ItemText>,
  ComponentProps<typeof SegmentGroupPrimitive.ItemText>
>(function SegmentGroupItemText(props, ref) {
  return (
    <SegmentGroupPrimitive.ItemText ref={ref} {...props} data-slot="segment-group-item-text" />
  );
});

const SegmentGroupIndicator = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Indicator>,
  ComponentProps<typeof SegmentGroupPrimitive.Indicator>
>(function SegmentGroupIndicator({ className, ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Indicator
      ref={ref}
      className={clsx(styles.indicator, className)}
      {...props}
      data-slot="segment-group-indicator"
    />
  );
});

const SegmentGroupContext = SegmentGroupPrimitive.Context;
const SegmentGroupItemContext = SegmentGroupPrimitive.ItemContext;
const SegmentGroupItemHiddenInput = SegmentGroupPrimitive.ItemHiddenInput;

function SegmentGroupItems({ items }: SegmentGroupItemsProps) {
  return items.map((item) => {
    const option: SegmentGroupItemOption =
      typeof item === 'string' ? { value: item, label: item } : item;
    return (
      <SegmentGroupItem key={option.value} value={option.value} disabled={option.disabled}>
        <SegmentGroupItemText>{option.label}</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    );
  });
}

export {
  SegmentGroup,
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRootProvider,
  useSegmentGroup,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
};
export type {
  SegmentGroupItemOption,
  SegmentGroupItemsProps,
  SegmentGroupRootProps,
  SegmentGroupRootProviderProps,
  SegmentGroupSize,
};