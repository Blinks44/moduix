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

const NumberInput = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Root>,
  ComponentProps<typeof NumberInputPrimitive.Root>
>(function NumberInput({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Root
      ref={ref}
      className={cn(
        'group/number-input flex w-auto max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="number-input-root"
    />
  );
});

const NumberInputRootProvider = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.RootProvider>,
  ComponentProps<typeof NumberInputPrimitive.RootProvider>
>(function NumberInputRootProvider({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.RootProvider
      ref={ref}
      className={cn(
        'group/number-input flex w-auto max-w-none flex-col items-start gap-1 data-disabled:opacity-50',
        className,
      )}
      {...props}
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
      className={cn('inline-flex items-stretch', className)}
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
      className={cn(
        'box-border inline-flex size-control-md min-w-control-md cursor-pointer items-center justify-center rounded-s-md border border-e-0 border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none group-data-invalid/number-input:border-destructive focus-visible:z-1 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
        'h-control-md w-24 rounded-none border-x-0 border-y border-border bg-background px-3 py-1 text-center text-md leading-6 text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out group-data-invalid/number-input:border-t-destructive group-data-invalid/number-input:border-b-destructive focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive data-invalid:border-t-destructive data-invalid:border-b-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
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
      className={cn(
        'box-border inline-flex size-control-md min-w-control-md cursor-pointer items-center justify-center rounded-e-md border border-s-0 border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none group-data-invalid/number-input:border-destructive focus-visible:z-1 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
