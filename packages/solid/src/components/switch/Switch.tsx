import {
  Switch as SwitchPrimitive,
  SwitchContext,
  useSwitch,
  useSwitchContext,
} from '@ark-ui/solid/switch';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: SwitchSize;
};
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

function SwitchRoot(props: SwitchRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <SwitchPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="switch-root"
    >
      {local.children}
    </SwitchPrimitive.Root>
  );
}

function SwitchRootProvider(props: SwitchRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <SwitchPrimitive.RootProvider
      asChild={local.asChild}
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

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  HiddenInput: SwitchPrimitive.HiddenInput,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  Context: SwitchContext,
});

export { Switch, useSwitch, useSwitchContext };
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };