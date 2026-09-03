import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/solid/number-input';
import { clsx } from 'clsx';
import { children, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { MinusIcon, PlusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NumberInput.module.css';

function NumberInputRoot(props: ComponentProps<typeof NumberInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'value']);

  return (
    <NumberInputPrimitive.Root
      asChild={local.asChild}
      value={local.value}
      data-slot="number-input-root"
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function NumberInputScrubber(props: ComponentProps<typeof NumberInputPrimitive.Scrubber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Scrubber
      data-slot="number-input-scrubber"
      class={clsx(styles.scrubber, local.class)}
      {...others}
    />
  );
}

function NumberInputControl(props: ComponentProps<typeof NumberInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Control
      data-slot="number-input-control"
      class={clsx(styles.control, local.class)}
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
      class={clsx(styles.decrementTrigger, local.class)}
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
      class={clsx(styles.input, local.class)}
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
      class={clsx(styles.incrementTrigger, local.class)}
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
      class={clsx(styles.valueText, local.class)}
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