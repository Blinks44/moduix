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

const DateInput = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Root>,
  ComponentProps<typeof DateInputPrimitive.Root>
>(function DateInput({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.segmentGroup, className)}
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
      className={clsx(styles.segment, className)}
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
      className={clsx(styles.separator, className)}
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