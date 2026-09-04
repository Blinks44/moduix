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
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './PinInput.module.css';

function PinInputRoot(props: ComponentProps<typeof PinInputPrimitive.Root>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'count',
    'placeholder',
  ]);

  return (
    <PinInputPrimitive.Root
      asChild={local.asChild}
      count={local.count}
      placeholder={local.placeholder ?? ''}
      data-slot="pin-input-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
    </PinInputPrimitive.Root>
  );
}

function PinInputRootProvider(props: ComponentProps<typeof PinInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <PinInputPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="pin-input-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
    </PinInputPrimitive.RootProvider>
  );
}

function PinInputLabel(props: ComponentProps<typeof PinInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Label
      data-slot="pin-input-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function PinInputControl(props: ComponentProps<typeof PinInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Control
      data-slot="pin-input-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function PinInputInput(props: ComponentProps<typeof PinInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Input
      data-slot="pin-input-input"
      class={clsx(styles.input, local.class)}
      {...others}
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
  const [local, others] = splitProps(props, ['aria-hidden', 'children', 'class', 'role']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      data-slot="pin-input-separator"
      aria-hidden={local['aria-hidden'] ?? true}
      role={local.role ?? 'presentation'}
      class={clsx(styles.separator, local.class)}
      {...others}
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

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  RootProvider: PinInputRootProvider,
  Context: PinInputPrimitive.Context,
  HiddenInput: PinInputPrimitive.HiddenInput,
  Label: PinInputLabel,
  Control: PinInputControl,
  Input: PinInputInput,
  Inputs: PinInputInputs,
  Separator: PinInputSeparator,
});

export { PinInput, usePinInput, usePinInputContext };