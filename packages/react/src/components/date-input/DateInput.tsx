import type { ComponentProps, ComponentRef } from 'react';
import {
  DateInput as DateInputPrimitive,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/react/date-input';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './DateInput.module.css';

const DateInputRoot = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Root>,
  ComponentProps<typeof DateInputPrimitive.Root>
>(function DateInputRoot({ className, ...props }, ref) {
  return (
    <DateInputPrimitive.Root
      ref={ref}
      data-slot="date-input-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="date-input-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="date-input-label"
      className={clsx(styles.label, normalizeClassName(className))}
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
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(styles.segmentGroup, normalizeClassName(className))}
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
      className={clsx(styles.segment, normalizeClassName(className))}
      {...props}
    />
  );
});

const DateInputHiddenInput = forwardRef<
  ComponentRef<typeof DateInputPrimitive.HiddenInput>,
  ComponentProps<typeof DateInputPrimitive.HiddenInput>
>(function DateInputHiddenInput(props, ref) {
  return (
    <DateInputPrimitive.HiddenInput ref={ref} data-slot="date-input-hidden-input" {...props} />
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
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
    />
  );
}

const DateInputContext = DateInputPrimitive.Context;
const DateInputSegmentContext = DateInputPrimitive.SegmentContext;

const DateInput = Object.assign(DateInputRoot, {
  Root: DateInputRoot,
  RootProvider: DateInputRootProvider,
  Label: DateInputLabel,
  Control: DateInputControl,
  SegmentGroup: DateInputSegmentGroup,
  Segment: DateInputSegment,
  HiddenInput: DateInputHiddenInput,
  Separator: DateInputSeparator,
  Context: DateInputContext,
  SegmentContext: DateInputSegmentContext,
});

export { DateInput, useDateInput, useDateInputContext };
export type {
  DateInputDateValue,
  DateInputFocusChangeDetails,
  DateInputContextProps,
  DateInputSelectionMode,
  DateInputSegmentContextProps,
  DateInputValueChangeDetails,
  UseDateInputContext,
  UseDateInputProps,
  UseDateInputReturn,
} from '@ark-ui/react/date-input';