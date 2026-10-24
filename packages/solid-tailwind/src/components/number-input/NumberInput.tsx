import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/solid/number-input';
import { children, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { MinusIcon, PlusIcon } from '@/lib/moduix/icons/ui';

type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type NumberInputRootProps = ComponentProps<typeof NumberInputPrimitive.Root> & {
  size?: NumberInputSize;
};
type NumberInputRootProviderProps = ComponentProps<typeof NumberInputPrimitive.RootProvider> & {
  size?: NumberInputSize;
};

const rootClass =
  'group/number-input flex flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const triggerClass =
  'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center border border-border bg-background p-0 text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,border-color,color] duration-normal ease-in-out select-none group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:size-control-lg group-data-[size=sm]/number-input:size-control-sm group-data-[size=xl]/number-input:size-control-xl group-data-[size=xs]/number-input:size-control-xs focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent data-disabled:pointer-events-none data-disabled:text-muted-foreground [&>svg]:size-3.5 group-data-[size=lg]/number-input:[&>svg]:size-4 group-data-[size=sm]/number-input:[&>svg]:size-3 group-data-[size=xl]/number-input:[&>svg]:size-4 group-data-[size=xs]/number-input:[&>svg]:size-3 [@media(hover:hover)]:hover:bg-accent';

function NumberInput(props: NumberInputRootProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <NumberInputPrimitive.Root
      class={cn(rootClass, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="number-input-root"
    >
      {local.children}
    </NumberInputPrimitive.Root>
  );
}

function NumberInputRootProvider(props: NumberInputRootProviderProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <NumberInputPrimitive.RootProvider
      class={cn(rootClass, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="number-input-root-provider"
    >
      {local.children}
    </NumberInputPrimitive.RootProvider>
  );
}

function NumberInputLabel(props: ComponentProps<typeof NumberInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Label
      class={cn('text-sm leading-5 font-medium text-foreground', local.class)}
      {...others}
      data-slot="number-input-label"
    />
  );
}

function NumberInputScrubber(props: ComponentProps<typeof NumberInputPrimitive.Scrubber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Scrubber
      class={cn(
        'inline-flex cursor-ew-resize items-center gap-2 text-foreground select-none data-disabled:cursor-default',
        local.class,
      )}
      {...others}
      data-slot="number-input-scrubber"
    />
  );
}

function NumberInputControl(props: ComponentProps<typeof NumberInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Control
      class={cn('inline-flex', local.class)}
      {...others}
      data-slot="number-input-control"
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
      class={cn(triggerClass, 'rounded-s-md border-e-0', local.class)}
      {...others}
      data-slot="number-input-decrement-trigger"
    >
      {resolvedChildren() ?? <MinusIcon />}
    </NumberInputPrimitive.DecrementTrigger>
  );
}

function NumberInputInput(props: ComponentProps<typeof NumberInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Input
      class={cn(
        'h-control-md w-24 rounded-none border-x-0 border-y border-border bg-background px-3 py-1 text-center text-md leading-6 text-foreground tabular-nums outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:h-control-lg group-data-[size=lg]/number-input:px-4 group-data-[size=lg]/number-input:text-lg group-data-[size=lg]/number-input:leading-7 group-data-[size=sm]/number-input:h-control-sm group-data-[size=sm]/number-input:px-2 group-data-[size=sm]/number-input:text-sm group-data-[size=sm]/number-input:leading-5 group-data-[size=xl]/number-input:h-control-xl group-data-[size=xl]/number-input:px-4 group-data-[size=xl]/number-input:py-2 group-data-[size=xl]/number-input:text-lg group-data-[size=xl]/number-input:leading-7 group-data-[size=xs]/number-input:h-control-xs group-data-[size=xs]/number-input:px-2 group-data-[size=xs]/number-input:py-0.5 group-data-[size=xs]/number-input:text-xs group-data-[size=xs]/number-input:leading-4 focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive',
        local.class,
      )}
      {...others}
      data-slot="number-input-input"
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
      class={cn(triggerClass, 'rounded-e-md border-s-0', local.class)}
      {...others}
      data-slot="number-input-increment-trigger"
    >
      {resolvedChildren() ?? <PlusIcon />}
    </NumberInputPrimitive.IncrementTrigger>
  );
}

function NumberInputValueText(props: ComponentProps<typeof NumberInputPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.ValueText
      class={cn('text-sm leading-5 text-muted-foreground tabular-nums', local.class)}
      {...others}
      data-slot="number-input-value-text"
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

const NumberInputContext = NumberInputPrimitive.Context;

export {
  NumberInput,
  NumberInputContext,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRootProvider,
  NumberInputScrubber,
  NumberInputValueText,
  useNumberInput,
  useNumberInputContext,
};
export type {
  NumberInputContextProps,
  NumberInputControlProps,
  NumberInputDecrementTriggerProps,
  NumberInputFocusChangeDetails,
  NumberInputIncrementTriggerProps,
  NumberInputInputProps,
  NumberInputLabelProps,
  NumberInputScrubberProps,
  NumberInputValueChangeDetails,
  NumberInputValueInvalidDetails,
  NumberInputValueTextProps,
  UseNumberInputContext,
  UseNumberInputProps,
  UseNumberInputReturn,
} from '@ark-ui/solid/number-input';

export type { NumberInputRootProps, NumberInputRootProviderProps, NumberInputSize };