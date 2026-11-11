<script lang="ts">
  import { SwapIndicator, type SwapIndicatorProps } from '@ark-ui/svelte/swap';
  import { clsx } from 'clsx';
  import styles from './Swap.module.css';

  let { class: className, ref = $bindable(null), ...props }: SwapIndicatorProps = $props();
</script>

<SwapIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="swap-indicator"
/>