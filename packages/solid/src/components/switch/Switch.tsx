import {
  Switch as SwitchPrimitive,
  SwitchContext,
  useSwitch,
  useSwitchContext,
} from '@ark-ui/solid/switch';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, onMount, splitProps } from 'solid-js';
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
      data-slot="switch-root"
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <SwitchHiddenInput />
    </SwitchPrimitive.Root>
  );
}

function SwitchRootProvider(props: SwitchRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <SwitchPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="switch-root-provider"
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <SwitchHiddenInput />
    </SwitchPrimitive.RootProvider>
  );
}

function SwitchControl(props: ComponentProps<typeof SwitchPrimitive.Control>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <SwitchPrimitive.Control
      data-slot="switch-control"
      class={clsx(styles.control, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <SwitchThumb />}
    </SwitchPrimitive.Control>
  );
}

function SwitchThumb(props: ComponentProps<typeof SwitchPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      class={clsx(styles.thumb, local.class)}
      {...others}
    />
  );
}

function SwitchLabel(props: ComponentProps<typeof SwitchPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwitchPrimitive.Label
      data-slot="switch-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function SwitchHiddenInput() {
  const switchApi = useSwitchContext();
  const initialChecked = switchApi().checked;
  let inputRef: HTMLInputElement | undefined;
  const readOnly = () =>
    (switchApi().getRootProps() as { 'data-readonly'?: string })['data-readonly'] !== undefined;

  onMount(() => {
    if (inputRef) inputRef.defaultChecked = initialChecked;
  });

  return (
    <SwitchPrimitive.HiddenInput
      ref={(element) => (inputRef = element)}
      aria-readonly={readOnly() || undefined}
      data-slot="switch-hidden-input"
    />
  );
}

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  Context: SwitchContext,
});

export { Switch, useSwitch, useSwitchContext };
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };