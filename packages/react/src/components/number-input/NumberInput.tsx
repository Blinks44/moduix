import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/react/number-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { MinusIcon, PlusIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './NumberInput.module.css';

const NumberInputRoot = forwardRef<
  ComponentRef<typeof NumberInputPrimitive.Root>,
  ComponentProps<typeof NumberInputPrimitive.Root>
>(function NumberInputRoot({ className, ...props }, ref) {
  return (
    <NumberInputPrimitive.Root
      ref={ref}
      data-slot="number-input-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-scrubber"
      className={clsx(styles.scrubber, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-decrement-trigger"
      className={clsx(styles.decrementTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-increment-trigger"
      className={clsx(styles.incrementTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="number-input-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
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