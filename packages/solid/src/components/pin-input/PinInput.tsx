import {
  PinInput as PinInputPrimitive,
  usePinInput as usePinInputPrimitive,
  usePinInputContext,
  type UsePinInputProps,
  type UsePinInputReturn,
} from '@ark-ui/solid/pin-input';
import { clsx } from 'clsx';
import { children, For, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import styles from './PinInput.module.css';

type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PinInputRootProps = ComponentProps<typeof PinInputPrimitive.Root> & {
  size?: PinInputSize;
};
type PinInputRootProviderProps = ComponentProps<typeof PinInputPrimitive.RootProvider> & {
  size?: PinInputSize;
};

function PinInput(props: PinInputRootProps) {
  const [local, others] = splitProps(props, ['class', 'placeholder', 'size']);

  return (
    <PinInputPrimitive.Root
      placeholder={local.placeholder ?? ''}
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="pin-input-root"
    />
  );
}

function PinInputRootProvider(props: PinInputRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <PinInputPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="pin-input-root-provider"
    />
  );
}

function PinInputLabel(props: ComponentProps<typeof PinInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="pin-input-label"
    />
  );
}

function PinInputControl(props: ComponentProps<typeof PinInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="pin-input-control"
    />
  );
}

function PinInputInput(props: ComponentProps<typeof PinInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Input
      class={clsx(styles.input, local.class)}
      {...others}
      data-slot="pin-input-input"
    />
  );
}

function PinInputInputs(props: { class?: string }) {
  const pinInput = usePinInputContext();

  return (
    <For each={pinInput().items}>
      {(index) => <PinInputInput index={index} class={props.class} />}
    </For>
  );
}

function PinInputSeparator(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      aria-hidden="true"
      class={clsx(styles.separator, local.class)}
      {...others}
      data-slot="pin-input-separator"
    >
      {resolvedChildren() ?? <SeparatorMarkIcon />}
    </span>
  );
}

function usePinInput(props: UsePinInputProps | (() => UsePinInputProps) = {}): UsePinInputReturn {
  return usePinInputPrimitive(() => ({
    placeholder: '',
    ...(typeof props === 'function' ? props() : props),
  }));
}

const PinInputContext = PinInputPrimitive.Context;
const PinInputHiddenInput = PinInputPrimitive.HiddenInput;

export {
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
  usePinInput,
  usePinInputContext,
};
export type {
  PinInputContextProps,
  PinInputControlProps,
  PinInputHiddenInputProps,
  PinInputInputProps,
  PinInputLabelProps,
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
  UsePinInputContext,
  UsePinInputProps,
  UsePinInputReturn,
} from '@ark-ui/solid/pin-input';

export type { PinInputRootProps, PinInputRootProviderProps, PinInputSize };