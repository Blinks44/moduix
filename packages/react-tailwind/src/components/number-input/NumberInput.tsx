'use client';

import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/react/number-input';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
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
  'group/number-input flex flex-col items-start gap-1 data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const triggerClass =
  'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center border border-border bg-background p-0 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color] duration-normal ease-in-out select-none group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:size-control-lg group-data-[size=sm]/number-input:size-control-sm group-data-[size=xl]/number-input:size-control-xl group-data-[size=xs]/number-input:size-control-xs focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent data-disabled:pointer-events-none data-disabled:text-muted-foreground [&>svg]:size-3.5 group-data-[size=lg]/number-input:[&>svg]:size-4 group-data-[size=sm]/number-input:[&>svg]:size-3 group-data-[size=xl]/number-input:[&>svg]:size-4 group-data-[size=xs]/number-input:[&>svg]:size-3 [@media(hover:hover)]:hover:bg-accent';

const NumberInput = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Root>,
  NumberInputRootProps
>(function NumberInput({ className, size = 'md', ...props }, ref) {
  return (
    <NumberInputPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-size={size}
      data-slot="number-input-root"
    />
  );
});

const NumberInputRootProvider = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.RootProvider>,
  NumberInputRootProviderProps
>(function NumberInputRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <NumberInputPrimitive.RootProvider
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-size={size}
      data-slot="number-input-root-provider"
    />
  );
});

const NumberInputLabel = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Label>,
  ComponentProps<typeof NumberInputPrimitive.Label>
>(function NumberInputLabel({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Label
      ref={ref}
      className={cn('text-sm leading-5 font-medium text-foreground', className)}
      {...props}
      data-slot="number-input-label"
    />
  );
});

const NumberInputScrubber = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Scrubber>,
  ComponentProps<typeof NumberInputPrimitive.Scrubber>
>(function NumberInputScrubber({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Scrubber
      ref={ref}
      className={cn(
        'inline-flex cursor-ew-resize items-center gap-2 text-foreground select-none data-disabled:cursor-default',
        className,
      )}
      {...props}
      data-slot="number-input-scrubber"
    />
  );
});

const NumberInputControl = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Control>,
  ComponentProps<typeof NumberInputPrimitive.Control>
>(function NumberInputControl({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Control
      ref={ref}
      className={cn('inline-flex', className)}
      {...props}
      data-slot="number-input-control"
    />
  );
});

const NumberInputDecrementTrigger = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.DecrementTrigger>,
  ComponentProps<typeof NumberInputPrimitive.DecrementTrigger>
>(function NumberInputDecrementTrigger({ className, children, ...props }, ref) {
  return (
    <NumberInputPrimitive.DecrementTrigger
      ref={ref}
      className={cn(triggerClass, 'rounded-s-md border-e-0', className)}
      {...props}
      data-slot="number-input-decrement-trigger"
    >
      {children ?? <MinusIcon />}
    </NumberInputPrimitive.DecrementTrigger>
  );
});

const NumberInputInput = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Input>,
  ComponentProps<typeof NumberInputPrimitive.Input>
>(function NumberInputInput({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Input
      ref={ref}
      className={cn(
        'h-control-md w-24 rounded-none border-x-0 border-y border-border bg-background px-3 py-1 text-center text-md leading-6 text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:h-control-lg group-data-[size=lg]/number-input:px-4 group-data-[size=lg]/number-input:text-lg group-data-[size=lg]/number-input:leading-7 group-data-[size=sm]/number-input:h-control-sm group-data-[size=sm]/number-input:px-2 group-data-[size=sm]/number-input:text-sm group-data-[size=sm]/number-input:leading-5 group-data-[size=xl]/number-input:h-control-xl group-data-[size=xl]/number-input:px-4 group-data-[size=xl]/number-input:py-2 group-data-[size=xl]/number-input:text-lg group-data-[size=xl]/number-input:leading-7 group-data-[size=xs]/number-input:h-control-xs group-data-[size=xs]/number-input:px-2 group-data-[size=xs]/number-input:py-0.5 group-data-[size=xs]/number-input:text-xs group-data-[size=xs]/number-input:leading-4 focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive',
        className,
      )}
      {...props}
      data-slot="number-input-input"
    />
  );
});

const NumberInputIncrementTrigger = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.IncrementTrigger>,
  ComponentProps<typeof NumberInputPrimitive.IncrementTrigger>
>(function NumberInputIncrementTrigger({ className, children, ...props }, ref) {
  return (
    <NumberInputPrimitive.IncrementTrigger
      ref={ref}
      className={cn(triggerClass, 'rounded-e-md border-s-0', className)}
      {...props}
      data-slot="number-input-increment-trigger"
    >
      {children ?? <PlusIcon />}
    </NumberInputPrimitive.IncrementTrigger>
  );
});

const NumberInputValueText = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.ValueText>,
  ComponentProps<typeof NumberInputPrimitive.ValueText>
>(function NumberInputValueText({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.ValueText
      ref={ref}
      className={cn('text-sm leading-5 text-muted-foreground tabular-nums', className)}
      {...props}
      data-slot="number-input-value-text"
    />
  );
});

type NumberInputFieldProps = Omit<
  ComponentProps<typeof NumberInputControl>,
  'asChild' | 'children'
>;

const NumberInputField = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Control>,
  NumberInputFieldProps
>(function NumberInputField(props, ref) {
  return (
    <NumberInputControl ref={ref} {...props}>
      <NumberInputDecrementTrigger />
      <NumberInputInput />
      <NumberInputIncrementTrigger />
    </NumberInputControl>
  );
});

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
} from '@ark-ui/react/number-input';

export type { NumberInputRootProps, NumberInputRootProviderProps, NumberInputSize };