<script lang="ts">
  import { TocIndicator, type TocIndicatorProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocIndicatorProps = $props();
</script>

<TocIndicator
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none start-0 top-[calc(var(--_toc-indicator-top)+var(--moduix-spacing-0-5))] z-1 h-[calc(var(--_toc-indicator-height)-var(--moduix-spacing-1))] w-0.5 rounded-full bg-muted-foreground opacity-70 transition-[top,height] duration-normal',
    className,
  )}
  data-slot="toc-indicator"
/>