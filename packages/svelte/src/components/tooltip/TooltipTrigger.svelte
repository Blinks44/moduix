<script lang="ts">
  import { TooltipTrigger, type TooltipTriggerProps } from '@ark-ui/svelte/tooltip';
  import { clsx } from 'clsx';
  import styles from './Tooltip.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: TooltipTriggerProps = $props();
</script>

<TooltipTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="tooltip-trigger"
/>