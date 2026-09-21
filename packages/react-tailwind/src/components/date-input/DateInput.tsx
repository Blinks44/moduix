'use client';

import {
  DateInput as DateInputPrimitive,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/react/date-input';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const DateInput = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Root>,
  ComponentProps<typeof DateInputPrimitive.Root>
>(function DateInput({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="date-input-root"
    />
  );
});

const DateInputRootProvider = forwardRef<
  ComponentRef<typeof DateInputPrimitive.RootProvider>,
  ComponentProps<typeof DateInputPrimitive.RootProvider>
>(function DateInputRootProvider({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.RootProvider
      ref={ref}
      className={cn(
        'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="date-input-root-provider"
    />
  );
});

const DateInputLabel = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Label>,
  ComponentProps<typeof DateInputPrimitive.Label>
>(function DateInputLabel({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Label
      ref={ref}
      className={cn('text-sm leading-5 font-medium text-foreground', className)}
      {...props}
      data-slot="date-input-label"
    />
  );
});

const DateInputControl = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Control>,
  ComponentProps<typeof DateInputPrimitive.Control>
>(function DateInputControl({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Control
      ref={ref}
      className={cn(
        'box-border inline-flex min-h-control-md w-full items-center rounded-md border border-border bg-background px-3 py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive data-invalid:data-focus:outline-destructive motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="date-input-control"
    />
  );
});

const DateInputSegmentGroup = forwardRef<
  ComponentRef<typeof DateInputPrimitive.SegmentGroup>,
  ComponentProps<typeof DateInputPrimitive.SegmentGroup>
>(function DateInputSegmentGroup({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.SegmentGroup
      ref={ref}
      className={cn('inline-flex items-center gap-0.5 tabular-nums', className)}
      {...props}
      data-slot="date-input-segment-group"
    />
  );
});

const DateInputSegment = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Segment>,
  ComponentProps<typeof DateInputPrimitive.Segment>
>(function DateInputSegment({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Segment
      ref={ref}
      className={cn(
        'min-w-[2ch] cursor-text rounded-sm px-1 py-0 text-center leading-6 text-current outline-0 transition-colors duration-200 ease-in-out [font:inherit] focus-visible:bg-ring/18 focus-visible:text-foreground data-disabled:cursor-default data-placeholder-shown:text-muted-foreground data-readonly:cursor-default data-[type=literal]:pointer-events-none data-[type=literal]:min-w-auto data-[type=literal]:bg-transparent data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="date-input-segment"
    />
  );
});

const DateInputSegments = forwardRef<
  ComponentRef<typeof DateInputPrimitive.SegmentGroup>,
  Omit<ComponentProps<typeof DateInputPrimitive.SegmentGroup>, 'asChild' | 'children'>
>(function DateInputSegments(props, ref) {
  return (
    <DateInputSegmentGroup ref={ref} {...props}>
      <DateInputPrimitive.SegmentContext>
        {(segment) => <DateInputSegment segment={segment} />}
      </DateInputPrimitive.SegmentContext>
    </DateInputSegmentGroup>
  );
});

function DateInputSeparator({
  className,
  'aria-hidden': ariaHidden = true,
  role = 'presentation',
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden={ariaHidden}
      role={role}
      className={cn('text-muted-foreground select-none', className)}
      {...props}
      data-slot="date-input-separator"
    />
  );
}

const DateInputHiddenInput = DateInputPrimitive.HiddenInput;
const DateInputContext = DateInputPrimitive.Context;
const DateInputSegmentContext = DateInputPrimitive.SegmentContext;

export {
  DateInput,
  DateInputContext,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
  DateInputSegments,
  DateInputSeparator,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
};