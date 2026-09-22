import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/solid/password-input';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './PasswordInput.module.css';

function PasswordInput(props: ComponentProps<typeof PasswordInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="password-input-root"
    />
  );
}

function PasswordInputRootProvider(
  props: ComponentProps<typeof PasswordInputPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="password-input-root-provider"
    />
  );
}

function PasswordInputLabel(props: ComponentProps<typeof PasswordInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="password-input-label"
    />
  );
}

function PasswordInputControl(props: ComponentProps<typeof PasswordInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="password-input-control"
    />
  );
}

type PasswordInputInputProps = ComponentProps<typeof PasswordInputPrimitive.Input> & {
  defaultValue?: string | number | readonly string[];
};

function PasswordInputInput(props: PasswordInputInputProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'defaultValue']);

  return (
    <PasswordInputPrimitive.Input
      asChild={local.asChild}
      {...others}
      {...{ 'prop:defaultValue': local.defaultValue }}
      data-slot="password-input-input"
      class={clsx(styles.input, local.class)}
    />
  );
}

function PasswordInputVisibilityTrigger(
  props: ComponentProps<typeof PasswordInputPrimitive.VisibilityTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.VisibilityTrigger
      class={clsx(styles.visibilityTrigger, local.class)}
      {...others}
      data-slot="password-input-visibility-trigger"
    />
  );
}

function PasswordInputIndicator(props: ComponentProps<typeof PasswordInputPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'fallback']);
  const resolvedChildren = children(() => local.children);

  return (
    <PasswordInputPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      fallback={local.fallback ?? <EyeClosedIcon />}
      {...others}
      data-slot="password-input-indicator"
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

const PasswordInputContext = PasswordInputPrimitive.Context;

export {
  PasswordInput,
  PasswordInputContext,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
  usePasswordInputContext,
};
