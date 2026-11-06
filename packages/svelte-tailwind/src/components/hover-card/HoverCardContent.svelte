<script lang="ts">
  import { HoverCardContent, type HoverCardContentProps } from '@ark-ui/svelte/hover-card';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: HoverCardContentProps = $props();

  const contentClass =
    'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(24rem,var(--available-width))] min-w-[min(14rem,var(--available-width))] origin-(--transform-origin) rounded-lg border border-border bg-popover p-2 wrap-anywhere text-popover-foreground shadow-lg outline-0 has-[>[data-slot=hover-card-body]]:flex has-[>[data-slot=hover-card-body]]:flex-col data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none';
</script>

<HoverCardContent
  {...props}
  bind:ref
  class={cn(contentClass, className)}
  data-slot="hover-card-content"
/>