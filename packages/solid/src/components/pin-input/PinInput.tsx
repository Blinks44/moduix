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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="pin-input-root"
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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="pin-input-root-provider"
    >
      {local.children}
    </PinInputPrimitive.RootProvider>
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
  const [local, others] = splitProps(props, ['aria-hidden', 'children', 'class', 'role']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      aria-hidden={local['aria-hidden'] ?? true}
      role={local.role ?? 'presentation'}
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