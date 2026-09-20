'use client';

import { useFieldContext } from '@ark-ui/react/field';
import { useFieldsetContext } from '@ark-ui/react/fieldset';
import {
  SegmentGroup as SegmentGroupPrimitive,
  useSegmentGroup as useSegmentGroupPrimitive,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
} from '@ark-ui/react/segment-group';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SegmentGroupMachineProps = Parameters<typeof useSegmentGroupPrimitive>[0];

function omitUndefined<T extends Record<string, unknown>>(props: T) {
  return Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)) as T;
}

function useSegmentGroup(props?: SegmentGroupMachineProps) {
  const field = useFieldContext();
  const fieldset = useFieldsetContext();

  return useSegmentGroupPrimitive({
    orientation: 'horizontal',
    disabled: field?.disabled ?? fieldset?.disabled,
    invalid: field?.invalid ?? fieldset?.invalid,
    readOnly: field?.readOnly,
    required: field?.required,
    ...omitUndefined(props ?? {}),
  });
}

const SegmentGroupRoot = forwardRef<
  ComponentRef<typeof SegmentGroupPrimitive.Root>,
  ComponentProps<typeof SegmentGroupPrimitive.Root>
>(function SegmentGroupRoot(
  {
    className,
    defaultValue,
    disabled,
    form,
    id,
    ids,
    invalid,
    name,
    onValueChange,
    orientation = 'horizontal',
    readOnly,
    required,
    value,
    ...props
  },
  ref,
) {
  const segmentGroup = useSegmentGroup({
    defaultValue,
    disabled,
    form,
    id,
    ids,
    invalid,
    name,
    onValueChange,
    orientation,
    readOnly,
    required,
    value,
  });

  return (
    <SegmentGroupPrimitive.RootProvider
      ref={ref}
      value={segmentGroup}
      className={cn(
        'group/segment-group relative isolate box-border inline-flex max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
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
        'group/segment-group relative isolate box-border inline-flex max-w-full items-stretch gap-1 rounded-lg border border-border bg-muted p-1 text-foreground data-disabled:opacity-50 data-invalid:border-destructive data-[orientation=vertical]:flex-col',
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
      className={cn(
        'relative z-1 text-sm leading-5 font-semibold text-inherit select-none',
        className,
      )}
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
        'relative z-1 box-border inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground outline-0 transition-[color,opacity] duration-200 ease-in-out select-none group-data-disabled/segment-group:!opacity-100 data-disabled:cursor-default data-disabled:opacity-50 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-[state=checked]:text-foreground [@media(hover:hover)]:[&:not([data-readonly]):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...props}
      data-slot="segment-group-item"
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
      className={cn('hidden', className)}
      {...props}
      data-slot="segment-group-item-control"
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
      className={cn('relative z-1', className)}
      {...props}
      data-slot="segment-group-item-text"
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
      className={cn(
        'pointer-events-none absolute top-[var(--top)] left-[var(--left)] z-0 h-[var(--height)] w-[var(--width)] rounded-md bg-background shadow-sm !duration-200 !ease-in-out',
        className,
      )}
      {...props}
      data-slot="segment-group-indicator"
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
      <SegmentGroupPrimitive.ItemHiddenInput />
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
  ItemHiddenInput: SegmentGroupPrimitive.ItemHiddenInput,
  ItemControl: SegmentGroupItemControl,
  ItemText: SegmentGroupItemText,
  Indicator: SegmentGroupIndicator,
  Items: SegmentGroupItems,
});

export { SegmentGroup, useSegmentGroup, useSegmentGroupContext, useSegmentGroupItemContext };