<script lang="ts">
  import { TooltipArrowTip, type TooltipArrowTipProps } from '@ark-ui/svelte/tooltip';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TooltipArrowTipProps = $props();
</script>

<TooltipArrowTip
  {...props}
  bind:ref
  class={cn('border-t border-l border-border', className)}
  data-slot="tooltip-arrow-tip"
/>