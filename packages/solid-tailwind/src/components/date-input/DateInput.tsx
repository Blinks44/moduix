import {
  DateInput as DateInputPrimitive,
  type DateInputDateValue,
  useDateInput,
  useDateInputContext,
} from '@ark-ui/solid/date-input';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const rootClass =
  'inline-flex max-w-full flex-col items-start gap-1 data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function DateInput(props: ComponentProps<typeof DateInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <DateInputPrimitive.Root
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="date-input-root"
    >
      {local.children}
    </DateInputPrimitive.Root>
  );
}

function DateInputRootProvider(props: ComponentProps<typeof DateInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <DateInputPrimitive.RootProvider
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="date-input-root-provider"
    >
      {local.children}
    </DateInputPrimitive.RootProvider>
  );
}

function DateInputLabel(props: ComponentProps<typeof DateInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Label
      class={cn('text-sm leading-5 font-medium text-foreground', local.class)}
      {...others}
      data-slot="date-input-label"
    />
  );
}

function DateInputControl(props: ComponentProps<typeof DateInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Control
      class={cn(
        'box-border flex min-h-control-md w-full items-center gap-1 rounded-md border border-border bg-background px-3 py-1 text-md text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive',
        local.class,
      )}
      {...others}
      data-slot="date-input-control"
    />
  );
}

function DateInputSegmentGroup(props: ComponentProps<typeof DateInputPrimitive.SegmentGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.SegmentGroup
      class={cn('flex items-center gap-0.5 tabular-nums', local.class)}
      {...others}
      data-slot="date-input-segment-group"
    />
  );
}

function DateInputSegment(props: ComponentProps<typeof DateInputPrimitive.Segment>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DateInputPrimitive.Segment
      class={cn(
        'min-w-[2ch] cursor-default rounded-sm px-1 text-center outline-0 transition-colors duration-normal ease-in-out focus-visible:bg-ring/18 focus-visible:text-foreground data-editable:cursor-text data-placeholder-shown:not-focus-visible:text-muted-foreground data-[type=literal]:min-w-auto data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="date-input-segment"
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
  const [local, others] = splitProps(props, ['class']);

  return (
    <span
      aria-hidden="true"
      class={cn('text-muted-foreground select-none', local.class)}
      {...others}
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
} from '@ark-ui/solid/date-input';