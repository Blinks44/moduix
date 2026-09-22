import { Toggle as TogglePrimitive, ToggleContext, useToggleContext } from '@ark-ui/solid/toggle';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Toggle.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';
type ToggleRootProps = ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

function Toggle(props: ToggleRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'size', 'variant']);

  return (
    <TogglePrimitive.Root
      asChild={local.asChild}
      {...others}
      data-slot="toggle-root"
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
    />
  );
}

function ToggleIndicator(props: ComponentProps<typeof TogglePrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TogglePrimitive.Indicator
      asChild={local.asChild}
      {...others}
      data-slot="toggle-indicator"
      class={clsx(styles.indicator, local.class)}
    />
  );
}

export { Toggle, ToggleContext, ToggleIndicator, useToggleContext };
export type { ToggleRootProps, ToggleSize, ToggleVariant };