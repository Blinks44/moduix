'use client';

import {
  DateInput as DateInputPrimitive,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/react/date-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './DateInput.module.css';

const DateInputRoot = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Root>,
  ComponentProps<typeof DateInputPrimitive.Root>
>(function DateInputRoot({ asChild, children, className, ...props }, ref) {
  return (
    <DateInputPrimitive.Root
      ref={ref}
      data-slot="date-input-root"
      className={clsx(styles.root, className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </DateInputPrimitive.Root>
  );
});

const DateInputRootProvider = forwardRef<
  ComponentRef<typeof DateInputPrimitive.RootProvider>,
  ComponentProps<typeof DateInputPrimitive.RootProvider>
>(function DateInputRootProvider({ asChild, children, className, ...props }, ref) {
  return (
    <DateInputPrimitive.RootProvider
      ref={ref}
      data-slot="date-input-root-provider"
      className={clsx(styles.root, className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </DateInputPrimitive.RootProvider>
  );
});

const DateInputLabel = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Label>,
  ComponentProps<typeof DateInputPrimitive.Label>
>(function DateInputLabel({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Label
      ref={ref}
      data-slot="date-input-label"
      className={clsx(styles.label, className)}
      {...props}
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
      data-slot="date-input-control"
      className={clsx(styles.control, className)}
      {...props}
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
      data-slot="date-input-segment-group"
      className={clsx(styles.segmentGroup, className)}
      {...props}
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
      data-slot="date-input-segment"
      className={clsx(styles.segment, className)}
      {...props}
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
      data-slot="date-input-separator"
      aria-hidden={ariaHidden}
      role={role}
      className={clsx(styles.separator, className)}
      {...props}
    />
  );
}

const DateInput = Object.assign(DateInputRoot, {
  Root: DateInputRoot,
  RootProvider: DateInputRootProvider,
  HiddenInput: DateInputPrimitive.HiddenInput,
  Label: DateInputLabel,
  Control: DateInputControl,
  SegmentGroup: DateInputSegmentGroup,
  Segment: DateInputSegment,
  Segments: DateInputSegments,
  Separator: DateInputSeparator,
  Context: DateInputPrimitive.Context,
  SegmentContext: DateInputPrimitive.SegmentContext,
});

export { DateInput, type DateInputDateValue, useDateInput, useDateInputContext };