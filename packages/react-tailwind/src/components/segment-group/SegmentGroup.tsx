'use client';

import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
  type UseSegmentGroupProps,
} from '@ark-ui/react/segment-group';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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
      className={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]',
        className,
      )}
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
      className={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]',
        className,
      )}
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
      className={cn('text-sm leading-5 font-semibold', className)}
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
      className={cn(
        'inline-flex min-h-[calc(var(--_segment-group-size)-2*var(--moduix-spacing-1)-2*var(--moduix-border-width-sm))] cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-[color] duration-normal ease-in-out select-none group-data-[size=lg]/segment-group:px-4 group-data-[size=lg]/segment-group:text-md group-data-[size=sm]/segment-group:px-3 data-disabled:cursor-default group-not-data-disabled/segment-group:data-disabled:opacity-50 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:text-foreground',
        className,
      )}
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
      className={cn(
        'pointer-events-none top-[var(--top)] left-[var(--left)] -z-1 h-[var(--height)] w-[var(--width)] rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)]',
        className,
      )}
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