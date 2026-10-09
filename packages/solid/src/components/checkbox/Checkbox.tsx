import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/solid/checkbox';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CheckboxRootProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  size?: CheckboxSize;
};
type CheckboxRootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

function Checkbox(props: CheckboxRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <CheckboxPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="checkbox-root"
    >
      {local.children}
    </CheckboxPrimitive.Root>
  );
}

function CheckboxRootProvider(props: CheckboxRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <CheckboxPrimitive.RootProvider
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="checkbox-root-provider"
    >
      {local.children}
    </CheckboxPrimitive.RootProvider>
  );
}

function CheckboxIndicator(props: ComponentProps<typeof CheckboxPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'indeterminate']);
  const resolvedChildren = children(() => local.children);
  const slot = () =>
    local.indeterminate
      ? 'checkbox-indicator-indeterminate-icon'
      : 'checkbox-indicator-checked-icon';

  return (
    <CheckboxPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      indeterminate={local.indeterminate}
      {...others}
      data-slot="checkbox-indicator"
    >
      {resolvedChildren() ?? (
        <span aria-hidden="true" data-slot={slot()} class={styles.icon}>
          {local.indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </span>
      )}
    </CheckboxPrimitive.Indicator>
  );
}

function CheckboxControl(props: ComponentProps<typeof CheckboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CheckboxPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="checkbox-control"
    >
      {resolvedChildren() ?? (
        <>
          <CheckboxIndicator />
          <CheckboxIndicator indeterminate />
        </>
      )}
    </CheckboxPrimitive.Control>
  );
}

function CheckboxLabel(props: ComponentProps<typeof CheckboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CheckboxPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="checkbox-label"
    />
  );
}

function CheckboxGroup(props: ComponentProps<typeof CheckboxPrimitive.Group>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CheckboxPrimitive.Group
      class={clsx(styles.group, local.class)}
      {...others}
      data-slot="checkbox-group"
    />
  );
}

const CheckboxContext = CheckboxPrimitive.Context;
const CheckboxHiddenInput = CheckboxPrimitive.HiddenInput;

export {
  Checkbox,
  CheckboxContext,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
};