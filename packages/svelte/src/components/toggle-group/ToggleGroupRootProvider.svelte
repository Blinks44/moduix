<script module lang="ts">
  import type { ToggleGroupRootProviderProps as ArkToggleGroupRootProviderProps } from '@ark-ui/svelte/toggle-group';
  import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.svelte';

  export interface ToggleGroupRootProviderProps extends ArkToggleGroupRootProviderProps {
    size?: ToggleSize;
    variant?: ToggleVariant;
  }
</script>

<script lang="ts">
  import { ToggleGroupRootProvider } from '@ark-ui/svelte/toggle-group';
  import { clsx } from 'clsx';
  import { setToggleGroupStyleContext } from './context';
  import styles from './ToggleGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    variant = 'default',
    ...props
  }: ToggleGroupRootProviderProps = $props();

  setToggleGroupStyleContext({
    size: () => size,
    variant: () => variant,
  });
</script>

<ToggleGroupRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-variant={variant}
  data-slot="toggle-group-root-provider"
/>