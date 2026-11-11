<script module lang="ts">
  import type { SwapRootProviderProps as ArkSwapRootProviderProps } from '@ark-ui/svelte/swap';
  import type { SwapAnimation } from './Swap.svelte';

  export interface SwapRootProviderProps extends ArkSwapRootProviderProps {
    animation?: SwapAnimation;
  }
</script>

<script lang="ts">
  import { SwapRootProvider } from '@ark-ui/svelte/swap';
  import { clsx } from 'clsx';
  import styles from './Swap.module.css';

  let {
    animation = 'scale',
    class: className,
    ref = $bindable(null),
    ...props
  }: SwapRootProviderProps = $props();
</script>

<SwapRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-animation={animation}
  data-slot="swap-root-provider"
/>