import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/solid/number-input';
import { children, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { MinusIcon, PlusIcon } from '@/lib/moduix/icons/ui/Icons';

function NumberInputRoot(props: ComponentProps<typeof NumberInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'value']);

  return (
    <NumberInputPrimitive.Root
      asChild={local.asChild}
      value={local.value}
      data-slot="number-input-root"
      class={cn(
        'group/number-input flex w-auto max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </NumberInputPrimitive.Root>
  );
}

function NumberInputRootProvider(props: ComponentProps<typeof NumberInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'value']);

  return (
    <NumberInputPrimitive.RootProvider
      asChild={local.asChild}
      value={local.value}
      data-slot="number-input-root-provider"
      class={cn(
        'group/number-input flex w-auto max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </NumberInputPrimitive.RootProvider>
  );
}

function NumberInputLabel(props: ComponentProps<typeof NumberInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Label
      data-slot="number-input-label"
      class={cn('text-sm leading-5 font-medium text-foreground', local.class)}
      {...others}
    />
  );
}

function NumberInputScrubber(props: ComponentProps<typeof NumberInputPrimitive.Scrubber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Scrubber
      data-slot="number-input-scrubber"
      class={cn(
        'inline-flex cursor-ew-resize items-center gap-2 text-foreground select-none data-disabled:cursor-default',
        local.class,
      )}
      {...others}
    />
  );
}

function NumberInputControl(props: ComponentProps<typeof NumberInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Control
      data-slot="number-input-control"
      class={cn('inline-flex items-stretch', local.class)}
      {...others}
    />
  );
}

function NumberInputDecrementTrigger(
  props: ComponentProps<typeof NumberInputPrimitive.DecrementTrigger>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <NumberInputPrimitive.DecrementTrigger
      data-slot="number-input-decrement-trigger"
      class={cn(
        'box-border inline-flex size-control-md min-w-control-md cursor-pointer items-center justify-center rounded-s-md border border-e-0 border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none group-data-invalid/number-input:border-destructive focus-visible:z-1 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent disabled:pointer-events-none data-disabled:pointer-events-none data-focus:z-1 data-focus:outline-1 data-focus:-outline-offset-1 data-focus:outline-ring group-data-invalid/number-input:data-focus:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive data-invalid:data-focus:outline-destructive motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <MinusIcon />}
    </NumberInputPrimitive.DecrementTrigger>
  );
}

function NumberInputInput(props: ComponentProps<typeof NumberInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Input
      data-slot="number-input-input"
      class={cn(
        'h-control-md w-24 rounded-none border-x-0 border-y border-border border-x-current bg-background px-3 py-1 text-center text-md leading-6 text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out group-data-invalid/number-input:border-t-destructive group-data-invalid/number-input:border-b-destructive focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive data-focus:z-1 data-focus:outline-ring group-data-invalid/number-input:data-focus:outline-destructive data-invalid:border-t-destructive data-invalid:border-b-destructive data-invalid:focus-visible:outline-destructive data-invalid:data-focus:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function NumberInputIncrementTrigger(
  props: ComponentProps<typeof NumberInputPrimitive.IncrementTrigger>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <NumberInputPrimitive.IncrementTrigger
      data-slot="number-input-increment-trigger"
      class={cn(
        'box-border inline-flex size-control-md min-w-control-md cursor-pointer items-center justify-center rounded-e-md border border-s-0 border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none group-data-invalid/number-input:border-destructive focus-visible:z-1 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent disabled:pointer-events-none data-disabled:pointer-events-none data-focus:z-1 data-focus:outline-1 data-focus:-outline-offset-1 data-focus:outline-ring group-data-invalid/number-input:data-focus:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive data-invalid:data-focus:outline-destructive motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <PlusIcon />}
    </NumberInputPrimitive.IncrementTrigger>
  );
}

function NumberInputValueText(props: ComponentProps<typeof NumberInputPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.ValueText
      data-slot="number-input-value-text"
      class={cn('text-sm leading-5 text-muted-foreground tabular-nums', local.class)}
      {...others}
    />
  );
}

type NumberInputFieldProps = Omit<
  ComponentProps<typeof NumberInputControl>,
  'asChild' | 'children'
>;

function NumberInputField(props: NumberInputFieldProps) {
  return (
    <NumberInputControl {...props}>
      <NumberInputDecrementTrigger />
      <NumberInputInput />
      <NumberInputIncrementTrigger />
    </NumberInputControl>
  );
}

const NumberInput = Object.assign(NumberInputRoot, {
  Root: NumberInputRoot,
  RootProvider: NumberInputRootProvider,
  Context: NumberInputPrimitive.Context,
  Label: NumberInputLabel,
  Scrubber: NumberInputScrubber,
  Control: NumberInputControl,
  Field: NumberInputField,
  DecrementTrigger: NumberInputDecrementTrigger,
  Input: NumberInputInput,
  IncrementTrigger: NumberInputIncrementTrigger,
  ValueText: NumberInputValueText,
});

export { NumberInput, useNumberInput, useNumberInputContext };