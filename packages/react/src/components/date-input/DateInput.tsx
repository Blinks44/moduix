import {
  DateInput as DateInputPrimitive,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/react/date-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './DateInput.module.css';

const DateInputRoot = forwardRef<
  ComponentRef<typeof DateInputPrimitive.Root>,
  ComponentProps<typeof DateInputPrimitive.Root> & DateInputFormProps
>(function DateInputRoot({ asChild, children, className, names, ...props }, ref) {
  return (
    <DateInputPrimitive.Root
      ref={ref}
      data-slot="date-input-root"
      className={clsx(styles.root, normalizeClassName(className))}
      asChild={asChild}
      {...props}
    >
      {withHiddenInputs(children, asChild, names)}
    </DateInputPrimitive.Root>
  );
});

const DateInputRootProvider = forwardRef<
  ComponentRef<typeof DateInputPrimitive.RootProvider>,
  ComponentProps<typeof DateInputPrimitive.RootProvider> & DateInputFormProps
>(function DateInputRootProvider({ asChild, children, className, names, ...props }, ref) {
  return (
    <DateInputPrimitive.RootProvider
      ref={ref}
      data-slot="date-input-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      asChild={asChild}
      {...props}
    >
      {withHiddenInputs(children, asChild, names)}
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
      <DateInputPrimitive.SegmentContext>
        {(segment) => <DateInputSegment segment={segment} />}
      </DateInputPrimitive.SegmentContext>
    </DateInputSegmentGroup>
  );
});

type DateInputFormProps = {
  names?: readonly string[];
};

function withHiddenInputs(
  children: ReactNode,
  asChild: boolean | undefined,
  names: readonly string[] | undefined,
) {
  const hiddenInputs = <DateInputFormInputs names={names} />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInputs}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInputs);
}

function DateInputFormInputs({ names }: DateInputFormProps) {
  const dateInput = useDateInputContext();
  const inputCount = Math.max(dateInput.displayValues.length, names?.length ?? 0, 1);

  return (
    <>
      {Array.from({ length: inputCount }, (_, index) => (
        <DateInputPrimitive.HiddenInput
          key={index}
          index={index}
          name={names?.[index]}
          data-slot="date-input-hidden-input"
        />
      ))}
    </>
  );
}

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
  Separator: DateInputSeparator,
  Context: DateInputPrimitive.Context,
  SegmentContext: DateInputPrimitive.SegmentContext,
});

export { DateInput, type DateInputDateValue, useDateInput, useDateInputContext };