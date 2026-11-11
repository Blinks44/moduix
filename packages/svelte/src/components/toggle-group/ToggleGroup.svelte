<script module lang="ts">
  import type { ToggleGroupRootProps as ArkToggleGroupRootProps } from '@ark-ui/svelte/toggle-group';
  import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.svelte';

  export interface ToggleGroupRootProps extends ArkToggleGroupRootProps {
    size?: ToggleSize;
    variant?: ToggleVariant;
  }
</script>

<script lang="ts">
  import { ToggleGroupRoot } from '@ark-ui/svelte/toggle-group';
  import { clsx } from 'clsx';
  import { setToggleGroupStyleContext } from './context';
  import styles from './ToggleGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    variant = 'default',
    ...props
  }: ToggleGroupRootProps = $props();

  setToggleGroupStyleContext({
    size: () => size,
    variant: () => variant,
  });
</script>

<ToggleGroupRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-size={size}
  data-variant={variant}
  data-slot="toggle-group-root"
/>