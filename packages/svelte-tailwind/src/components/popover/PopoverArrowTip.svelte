<script lang="ts">
  import { PopoverArrowTip, type PopoverArrowTipProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PopoverArrowTipProps = $props();
</script>

<PopoverArrowTip
  {...props}
  bind:ref
  class={cn('border-t border-l border-border', className)}
  data-slot="popover-arrow-tip"
/>