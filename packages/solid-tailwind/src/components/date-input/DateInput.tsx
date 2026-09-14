import {
  DateInput as DateInputPrimitive,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/solid/date-input';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function DateInputRoot(props: ComponentProps<typeof DateInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <DateInputPrimitive.Root
      asChild={local.asChild}
      data-slot="date-input-root"
      class={cn(
        'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        local.class,
      )}
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
      class={cn(
        'inline-flex w-full max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        local.class,
      )}
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
      class={cn('text-sm leading-5 font-medium text-foreground', local.class)}
      {...others}
    />
  );
}

function DateInputControl(props: ComponentProps<typeof DateInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Control
      data-slot="date-input-control"
      class={cn(
        'box-border inline-flex min-h-control-md w-full items-center rounded-md border border-border bg-background px-3 py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive data-invalid:data-focus:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function DateInputSegmentGroup(props: ComponentProps<typeof DateInputPrimitive.SegmentGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.SegmentGroup
      data-slot="date-input-segment-group"
      class={cn('inline-flex items-center gap-0.5 tabular-nums', local.class)}
      {...others}
    />
  );
}

function DateInputSegment(props: ComponentProps<typeof DateInputPrimitive.Segment>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Segment
      data-slot="date-input-segment"
      class={cn(
        'min-w-[2ch] cursor-text rounded-sm px-1 py-0 text-center leading-6 text-current outline-0 transition-colors duration-200 ease-in-out [font:inherit] focus-visible:bg-ring/18 focus-visible:text-foreground data-disabled:cursor-default data-placeholder-shown:text-muted-foreground data-readonly:cursor-default data-[type=literal]:pointer-events-none data-[type=literal]:min-w-auto data-[type=literal]:bg-transparent data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground motion-reduce:transition-none',
        local.class,
      )}
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
      class={cn('text-muted-foreground select-none', local.class)}
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