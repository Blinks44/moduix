<script module lang="ts">
  import type { ToggleRootProps as ArkToggleRootProps } from '@ark-ui/svelte/toggle';

  export type ToggleVariant = 'default' | 'outline' | 'ghost';

  export type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

  export interface ToggleRootProps extends ArkToggleRootProps {
    size?: ToggleSize;
    variant?: ToggleVariant;
  }
</script>

<script lang="ts">
  import { ToggleRoot } from '@ark-ui/svelte/toggle';
  import { clsx } from 'clsx';
  import styles from './Toggle.module.css';

  let {
    class: className,
    pressed = $bindable(),
    ref = $bindable(null),
    size = 'md',
    variant = 'default',
    ...props
  }: ToggleRootProps = $props();
</script>

<ToggleRoot
  {...props}
  bind:ref
  bind:pressed
  class={clsx(styles.root, className)}
  data-size={size}
  data-variant={variant}
  data-slot="toggle-root"
/>