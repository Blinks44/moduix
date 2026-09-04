import {
  DateInput as DateInputPrimitive,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/solid/date-input';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './DateInput.module.css';

function DateInputRoot(props: ComponentProps<typeof DateInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <DateInputPrimitive.Root
      asChild={local.asChild}
      data-slot="date-input-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
    </DateInputPrimitive.Root>
  );
}

function DateInputRootProvider(props: ComponentProps<typeof DateInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <DateInputPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="date-input-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
    </DateInputPrimitive.RootProvider>
  );
}

function DateInputLabel(props: ComponentProps<typeof DateInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Label
      data-slot="date-input-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function DateInputControl(props: ComponentProps<typeof DateInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Control
      data-slot="date-input-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function DateInputSegmentGroup(props: ComponentProps<typeof DateInputPrimitive.SegmentGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.SegmentGroup
      data-slot="date-input-segment-group"
      class={clsx(styles.segmentGroup, local.class)}
      {...others}
    />
  );
}

function DateInputSegment(props: ComponentProps<typeof DateInputPrimitive.Segment>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Segment
      data-slot="date-input-segment"
      class={clsx(styles.segment, local.class)}
      {...others}
    />
  );
}

type DateInputSegmentsProps = Omit<
  ComponentProps<typeof DateInputPrimitive.SegmentGroup>,
  'asChild' | 'children'
>;

function DateInputSegments(props: DateInputSegmentsProps) {
  return (
    <DateInputSegmentGroup {...props}>
      <DateInputPrimitive.SegmentContext>
        {(segment) => <DateInputSegment segment={segment} />}
      </DateInputPrimitive.SegmentContext>
    </DateInputSegmentGroup>
  );
}

function DateInputSeparator(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['aria-hidden', 'class', 'role']);

  return (
    <span
      data-slot="date-input-separator"
      aria-hidden={local['aria-hidden'] ?? true}
      role={local.role ?? 'presentation'}
      class={clsx(styles.separator, local.class)}
      {...others}
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