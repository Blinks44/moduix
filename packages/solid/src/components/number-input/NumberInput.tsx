import {
  NumberInput as NumberInputPrimitive,
  useNumberInput,
  useNumberInputContext,
} from '@ark-ui/solid/number-input';
import { clsx } from 'clsx';
import { children, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { MinusIcon, PlusIcon } from '@/lib/moduix/icons/ui';
import styles from './NumberInput.module.css';

type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type NumberInputRootProps = ComponentProps<typeof NumberInputPrimitive.Root> & {
  size?: NumberInputSize;
};
type NumberInputRootProviderProps = ComponentProps<typeof NumberInputPrimitive.RootProvider> & {
  size?: NumberInputSize;
};

function NumberInput(props: NumberInputRootProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <NumberInputPrimitive.Root
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="number-input-label"
    />
  );
}

function NumberInputScrubber(props: ComponentProps<typeof NumberInputPrimitive.Scrubber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Scrubber
      class={clsx(styles.scrubber, local.class)}
      {...others}
      data-slot="number-input-scrubber"
    />
  );
}

function NumberInputControl(props: ComponentProps<typeof NumberInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <NumberInputPrimitive.Control
      class={clsx(styles.control, local.class)}
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
      class={clsx(styles.decrementTrigger, local.class)}
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
      class={clsx(styles.input, local.class)}
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
      class={clsx(styles.incrementTrigger, local.class)}
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
      class={clsx(styles.valueText, local.class)}
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