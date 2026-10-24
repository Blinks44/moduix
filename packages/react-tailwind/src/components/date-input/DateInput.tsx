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

const rootClass =
  'inline-flex max-w-full flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const DateInput = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Root>,
  ComponentProps<typeof DateInputPrimitive.Root>
>(function DateInput({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
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
      className={cn(rootClass, className)}
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
        'flex min-h-control-md w-full items-center gap-1 rounded-md border border-border bg-background px-3 py-1 text-md text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive',
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
      className={cn('flex items-center gap-0.5 tabular-nums', className)}
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
        'min-w-[2ch] cursor-default rounded-sm px-1 text-center outline-0 transition-colors duration-normal ease-in-out focus-visible:bg-ring/18 focus-visible:text-foreground data-editable:cursor-text data-placeholder-shown:not-focus-visible:text-muted-foreground data-[type=literal]:min-w-auto data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground',
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

const DateInputSeparator = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  function DateInputSeparator({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn('text-muted-foreground select-none', className)}
        {...props}
        data-slot="date-input-separator"
      />
    );
  },
);

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

export type {
  DateInputContextProps,
  DateInputControlProps,
  DateInputFocusChangeDetails,
  DateInputHiddenInputProps,
  DateInputLabelProps,
  DateInputPlaceholderChangeDetails,
  DateInputRootProps,
  DateInputRootProviderProps,
  DateInputSegmentContextProps,
  DateInputSegmentGroupProps,
  DateInputSegmentProps,
  DateInputSelectionMode,
  DateInputValueChangeDetails,
  UseDateInputContext,
  UseDateInputProps,
  UseDateInputReturn,
} from '@ark-ui/react/date-input';