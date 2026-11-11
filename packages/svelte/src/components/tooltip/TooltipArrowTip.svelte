<script lang="ts">
  import { TooltipArrowTip, type TooltipArrowTipProps } from '@ark-ui/svelte/tooltip';
  import { clsx } from 'clsx';
  import styles from './Tooltip.module.css';

  let { class: className, ref = $bindable(null), ...props }: TooltipArrowTipProps = $props();
</script>

<TooltipArrowTip
  {...props}
  bind:ref
  class={clsx(styles.arrowTip, className)}
  data-slot="tooltip-arrow-tip"
/>