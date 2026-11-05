<script module lang="ts">
  import type { SwitchRootProviderProps as ArkSwitchRootProviderProps } from '@ark-ui/svelte/switch';
  import type { SwitchSize } from './Switch.svelte';

  export interface SwitchRootProviderProps extends ArkSwitchRootProviderProps {
    size?: SwitchSize;
  }
</script>

<script lang="ts">
  import { SwitchRootProvider } from '@ark-ui/svelte/switch';
  import { clsx } from 'clsx';
  import styles from './Switch.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: SwitchRootProviderProps = $props();
</script>

<SwitchRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="switch-root-provider"
/>