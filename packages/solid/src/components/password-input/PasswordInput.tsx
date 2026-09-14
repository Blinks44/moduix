import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/solid/password-input';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, createEffect, splitProps } from 'solid-js';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './PasswordInput.module.css';

function PasswordInputRoot(props: ComponentProps<typeof PasswordInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Root
      data-slot="password-input-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function PasswordInputRootProvider(
  props: ComponentProps<typeof PasswordInputPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.RootProvider
      data-slot="password-input-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function PasswordInputLabel(props: ComponentProps<typeof PasswordInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Label
      data-slot="password-input-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function PasswordInputControl(props: ComponentProps<typeof PasswordInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Control
      data-slot="password-input-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

type PasswordInputInputProps = ComponentProps<typeof PasswordInputPrimitive.Input> & {
  defaultValue?: string | number | readonly string[];
};

function PasswordInputInput(props: PasswordInputInputProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'defaultValue', 'ref']);
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    if (inputRef) inputRef.defaultValue = String(local.defaultValue ?? '');
  });

  return (
    <PasswordInputPrimitive.Input
      asChild={local.asChild}
      {...others}
      {...(local.asChild ? { 'prop:defaultValue': local.defaultValue } : {})}
      data-slot="password-input-input"
      class={clsx(styles.input, local.class)}
      ref={(element) => {
        inputRef = element;
        if (typeof local.ref === 'function') local.ref(element);
      }}
    />
  );
}

function PasswordInputVisibilityTrigger(
  props: ComponentProps<typeof PasswordInputPrimitive.VisibilityTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.VisibilityTrigger
      data-slot="password-input-visibility-trigger"
      class={clsx(styles.visibilityTrigger, local.class)}
      {...others}
    />
  );
}

function PasswordInputIndicator(props: ComponentProps<typeof PasswordInputPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'fallback']);
  const resolvedChildren = children(() => local.children);

  return (
    <PasswordInputPrimitive.Indicator
      data-slot="password-input-indicator"
      class={clsx(styles.indicator, local.class)}
      fallback={local.fallback ?? <EyeClosedIcon />}
      {...others}
    >
      {resolvedChildren() ?? <EyeIcon />}
    </PasswordInputPrimitive.Indicator>
  );
}

type PasswordInputFieldProps = Omit<
  ComponentProps<typeof PasswordInputControl>,
  'asChild' | 'children'
>;

function PasswordInputField(props: PasswordInputFieldProps) {
  return (
    <PasswordInputControl {...props}>
      <PasswordInputInput />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  );
}

const PasswordInput = Object.assign(PasswordInputRoot, {
  Root: PasswordInputRoot,
  RootProvider: PasswordInputRootProvider,
  Context: PasswordInputPrimitive.Context,
  Label: PasswordInputLabel,
  Control: PasswordInputControl,
  Field: PasswordInputField,
  Input: PasswordInputInput,
  VisibilityTrigger: PasswordInputVisibilityTrigger,
  Indicator: PasswordInputIndicator,
});

export { PasswordInput, usePasswordInput, usePasswordInputContext };