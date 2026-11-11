<script lang="ts">
  import {
    FloatingPanelContent,
    type FloatingPanelContentProps,
  } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelContentProps = $props();

  const contentClass =
    'relative flex flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-behind:opacity-[0.55] data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none';
</script>

<FloatingPanelContent
  {...props}
  bind:ref
  class={cn(contentClass, className)}
  data-slot="floating-panel-content"
/>