<script module lang="ts">
  import type { SwapRootProps as ArkSwapRootProps } from '@ark-ui/svelte/swap';

  export type SwapAnimation = 'fade' | 'scale' | 'rotate' | 'flip' | (string & {});

  export interface SwapRootProps extends ArkSwapRootProps {
    animation?: SwapAnimation;
  }
</script>

<script lang="ts">
  import { SwapRoot } from '@ark-ui/svelte/swap';
  import { clsx } from 'clsx';
  import styles from './Swap.module.css';

  let {
    animation = 'scale',
    class: className,
    ref = $bindable(null),
    ...props
  }: SwapRootProps = $props();
</script>

<SwapRoot
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-animation={animation}
  data-slot="swap-root"
/>