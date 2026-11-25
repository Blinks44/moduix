import { Switch as SwitchPrimitive, useSwitch, useSwitchContext } from '@ark-ui/solid/switch';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { Show, children, splitProps } from 'solid-js';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  hiddenInput?: boolean;
  hiddenInputProps?: ComponentProps<typeof SwitchPrimitive.HiddenInput>;
  label?: JSX.Element;
  size?: SwitchSize;
};
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

function Switch(props: SwitchRootProps) {
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
        <SwitchPrimitive.Root
          class={clsx(styles.root, local.class)}
          {...others}
          data-size={local.size ?? 'md'}
          data-slot="switch-root"
        >
          <Show
            when={local.children === undefined}
            fallback={
              <>
                {local.children}
                <Show when={local.hiddenInput}>
                  <SwitchHiddenInput {...local.hiddenInputProps} />
                </Show>
              </>
            }
          >
            <SwitchControl />
            <Show when={local.label != null}>
              <SwitchLabel>{local.label}</SwitchLabel>
            </Show>
            <Show when={local.hiddenInput !== false}>
              <SwitchHiddenInput {...local.hiddenInputProps} />
            </Show>
          </Show>
        </SwitchPrimitive.Root>
      }
    >
      <SwitchPrimitive.Root
        asChild={local.asChild}
        class={clsx(styles.root, local.class)}
        {...others}
        data-size={local.size ?? 'md'}
        data-slot="switch-root"
      >
        {local.children}
      </SwitchPrimitive.Root>
    </Show>
  );
}

function SwitchRootProvider(props: SwitchRootProviderProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <SwitchPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="switch-root-provider"
    >
      {local.children}
    </SwitchPrimitive.RootProvider>
  );
}

function SwitchControl(props: ComponentProps<typeof SwitchPrimitive.Control>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <SwitchPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="switch-control"
    >
      {resolvedChildren() ?? <SwitchThumb />}
    </SwitchPrimitive.Control>
  );
}

function SwitchThumb(props: ComponentProps<typeof SwitchPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwitchPrimitive.Thumb
      class={clsx(styles.thumb, local.class)}
      {...others}
      data-slot="switch-thumb"
    />
  );
}

function SwitchLabel(props: ComponentProps<typeof SwitchPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwitchPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="switch-label"
    />
  );
}

const SwitchContext = SwitchPrimitive.Context;
const SwitchHiddenInput = SwitchPrimitive.HiddenInput;

export {
  Switch,
  SwitchContext,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  useSwitch,
  useSwitchContext,
};
export type {
  SwitchCheckedChangeDetails,
  SwitchContextProps,
  SwitchControlProps,
  SwitchHiddenInputProps,
  SwitchLabelProps,
  SwitchThumbProps,
  UseSwitchContext,
  UseSwitchProps,
  UseSwitchReturn,
} from '@ark-ui/solid/switch';
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };