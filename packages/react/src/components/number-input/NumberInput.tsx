'use client';

import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/react/number-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { MinusIcon, PlusIcon } from '@/lib/moduix/icons/ui';
import styles from './NumberInput.module.css';

const NumberInputRoot = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Root>,
  ComponentProps<typeof NumberInputPrimitive.Root>
>(function NumberInputRoot({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.scrubber, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.decrementTrigger, className)}
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
      className={clsx(styles.input, className)}
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
      className={clsx(styles.incrementTrigger, className)}
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
      className={clsx(styles.valueText, className)}
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