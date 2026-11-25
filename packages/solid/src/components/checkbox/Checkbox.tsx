import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/solid/checkbox';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { Show, children, splitProps } from 'solid-js';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CheckboxRootProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  hiddenInput?: boolean;
  hiddenInputProps?: ComponentProps<typeof CheckboxPrimitive.HiddenInput>;
  label?: JSX.Element;
  size?: CheckboxSize;
};
type CheckboxRootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

function Checkbox(props: CheckboxRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'hiddenInput',
    'hiddenInputProps',
    'label',
    'size',
  ]);

  return (
    <Show
      when={local.asChild}
      fallback={
        <CheckboxPrimitive.Root
          class={clsx(styles.root, local.class)}
          {...others}
          data-size={local.size ?? 'md'}
          data-slot="checkbox-root"
        >
          <Show
            when={local.children === undefined}
            fallback={
              <>
                {local.children}
                <Show when={local.hiddenInput}>
                  <CheckboxHiddenInput {...local.hiddenInputProps} />
                </Show>
              </>
            }
          >
            <CheckboxControl />
            <Show when={local.label != null}>
              <CheckboxLabel>{local.label}</CheckboxLabel>
            </Show>
            <Show when={local.hiddenInput !== false}>
              <CheckboxHiddenInput {...local.hiddenInputProps} />
            </Show>
          </Show>
        </CheckboxPrimitive.Root>
      }
    >
      <CheckboxPrimitive.Root
        asChild={local.asChild}
        class={clsx(styles.root, local.class)}
        {...others}
        data-size={local.size ?? 'md'}
        data-slot="checkbox-root"
      >
        {local.children}
      </CheckboxPrimitive.Root>
    </Show>
  );
}

function CheckboxRootProvider(props: CheckboxRootProviderProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <CheckboxPrimitive.RootProvider
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

  return (
    <CheckboxPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      indeterminate={local.indeterminate}
      {...others}
      data-slot="checkbox-indicator"
    >
      {resolvedChildren() ?? (local.indeterminate ? <IndeterminateIcon /> : <CheckIcon />)}
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

export type { CheckboxRootProps, CheckboxRootProviderProps, CheckboxSize };

export type {
  CheckboxCheckedChangeDetails,
  CheckboxCheckedState,
  CheckboxContextProps,
  CheckboxControlProps,
  CheckboxGroupProps,
  CheckboxHiddenInputProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  UseCheckboxContext,
  UseCheckboxGroupContext,
  UseCheckboxGroupProps,
  UseCheckboxGroupReturn,
  UseCheckboxProps,
  UseCheckboxReturn,
} from '@ark-ui/solid/checkbox';