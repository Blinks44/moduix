import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/solid/checkbox';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, onMount, splitProps } from 'solid-js';
import { CheckIcon, IndeterminateIcon } from '@/internal/icons/ui/Icons';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CheckboxRootProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  size?: CheckboxSize;
};
type CheckboxRootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

function CheckboxRoot(props: CheckboxRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <CheckboxPrimitive.Root
      asChild={local.asChild}
      data-slot="checkbox-root"
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <CheckboxHiddenInput />
    </CheckboxPrimitive.Root>
  );
}

function CheckboxRootProvider(props: CheckboxRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <CheckboxPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="checkbox-root-provider"
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <CheckboxHiddenInput />
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
      data-slot="checkbox-indicator"
      class={clsx(styles.indicator, local.class)}
      indeterminate={local.indeterminate}
      {...others}
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
      data-slot="checkbox-control"
      class={clsx(styles.control, local.class)}
      {...others}
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

function CheckboxHiddenInput() {
  const checkbox = useCheckboxContext();
  const initialChecked = checkbox().checked;
  let inputRef: HTMLInputElement | undefined;
  const readOnly = () =>
    (checkbox().getRootProps() as { 'data-readonly'?: string })['data-readonly'] !== undefined;

  onMount(() => {
    if (inputRef) inputRef.defaultChecked = initialChecked;
  });

  return (
    <CheckboxPrimitive.HiddenInput
      ref={(element) => (inputRef = element)}
      aria-readonly={readOnly() || undefined}
      data-slot="checkbox-hidden-input"
    />
  );
}

function CheckboxLabel(props: ComponentProps<typeof CheckboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CheckboxPrimitive.Label
      data-slot="checkbox-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function CheckboxGroup(props: ComponentProps<typeof CheckboxPrimitive.Group>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CheckboxPrimitive.Group
      data-slot="checkbox-group"
      class={clsx(styles.group, local.class)}
      {...others}
    />
  );
}

const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  RootProvider: CheckboxRootProvider,
  Context: CheckboxPrimitive.Context,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  Group: CheckboxGroup,
});

export { Checkbox, useCheckbox, useCheckboxContext, useCheckboxGroup, useCheckboxGroupContext };