<script lang="ts">
  import { TooltipContent, type TooltipContentProps } from '@ark-ui/svelte/tooltip';
  import { clsx } from 'clsx';
  import styles from './Tooltip.module.css';

  let { class: className, ref = $bindable(null), ...props }: TooltipContentProps = $props();
</script>

<TooltipContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="tooltip-content"
/>