<script lang="ts">
  import { TooltipArrow, type TooltipArrowProps } from '@ark-ui/svelte/tooltip';
  import { clsx } from 'clsx';
  import styles from './Tooltip.module.css';
  import TooltipArrowTip from './TooltipArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: TooltipArrowProps = $props();
</script>

<TooltipArrow {...props} bind:ref class={clsx(styles.arrow, className)} data-slot="tooltip-arrow">
  {#if children}
    {@render children()}
  {:else}
    <TooltipArrowTip />
  {/if}
</TooltipArrow>