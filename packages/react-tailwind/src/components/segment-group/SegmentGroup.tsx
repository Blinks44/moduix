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

function useSegmentGroup({ orientation = 'horizontal', ...props }: UseSegmentGroupProps = {}) {
  return useSegmentGroupPrimitive({ ...props, orientation });
}

const SegmentGroup = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Root>,
  ComponentProps<typeof SegmentGroupPrimitive.Root>
>(function SegmentGroup({ className, orientation = 'horizontal', ...props }, ref) {
  return (
    <SegmentGroupPrimitive.Root
      ref={ref}
      className={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
      orientation={orientation}
      data-slot="segment-group-root"
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
      className={cn(
        'group/segment-group isolate box-border inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
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
        'inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground transition-[color] duration-normal ease-in-out select-none data-disabled:cursor-default group-not-data-disabled/segment-group:data-disabled:opacity-50 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:text-foreground',
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

function SegmentGroupItems({
  items,
}: {
  items: readonly { value: string; label: ReactNode; disabled?: boolean }[];
}) {
  return items.map(({ value, label, disabled }) => (
    <SegmentGroupItem key={value} value={value} disabled={disabled}>
      <SegmentGroupItemText>{label}</SegmentGroupItemText>
      <SegmentGroupItemHiddenInput />
    </SegmentGroupItem>
  ));
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