import type { ComponentProps, ComponentRef } from 'react';
import { DateInput as DateInputPrimitive, DateInputSegmentContext } from '@ark-ui/react/date-input';
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

const DateInputSegments = forwardRef<
  ComponentRef<typeof DateInputPrimitive.SegmentGroup>,
  Omit<ComponentProps<typeof DateInputPrimitive.SegmentGroup>, 'asChild' | 'children'>
>(function DateInputSegments(props, ref) {
  return (
    <DateInputSegmentGroup ref={ref} {...props}>
      <DateInputSegmentContext>
        {(segment) => <DateInputSegment segment={segment} />}
      </DateInputSegmentContext>
    </DateInputSegmentGroup>
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

const DateInput = Object.assign(DateInputRoot, {
  Root: DateInputRoot,
  RootProvider: DateInputRootProvider,
  Label: DateInputLabel,
  Control: DateInputControl,
  SegmentGroup: DateInputSegmentGroup,
  Segment: DateInputSegment,
  Segments: DateInputSegments,
  HiddenInput: DateInputHiddenInput,
  Separator: DateInputSeparator,
});

export { DateInput };