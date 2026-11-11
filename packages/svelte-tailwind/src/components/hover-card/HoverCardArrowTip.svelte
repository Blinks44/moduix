<script lang="ts">
  import { HoverCardArrowTip, type HoverCardArrowTipProps } from '@ark-ui/svelte/hover-card';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: HoverCardArrowTipProps = $props();
</script>

<HoverCardArrowTip
  {...props}
  bind:ref
  class={cn('border-t border-l border-border', className)}
  data-slot="hover-card-arrow-tip"
/>