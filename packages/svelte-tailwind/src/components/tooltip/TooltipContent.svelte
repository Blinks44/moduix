<script lang="ts">
  import { TooltipContent, type TooltipContentProps } from '@ark-ui/svelte/tooltip';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TooltipContentProps = $props();
</script>

<TooltipContent
  {...props}
  bind:ref
  class={cn(
    'relative max-w-[min(20rem,var(--available-width))] origin-(--transform-origin) rounded-md border border-border bg-popover px-2 py-1 text-center text-sm wrap-anywhere text-popover-foreground shadow-md data-instant:data-[state]:animate-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="tooltip-content"
/>