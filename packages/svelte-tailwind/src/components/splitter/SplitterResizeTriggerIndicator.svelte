<script lang="ts">
  import {
    SplitterResizeTriggerIndicator,
    type SplitterResizeTriggerIndicatorProps,
  } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SplitterResizeTriggerIndicatorProps = $props();

  const indicatorClass =
    'pointer-events-none absolute h-control-xs w-1.5 rounded-full border border-border bg-background shadow-sm transition-[border-color,box-shadow,scale] duration-normal ease-in-out group-hover/trigger:border-muted-foreground/40 group-hover/trigger:shadow-md group-[:focus-visible:not([data-dragging])]/trigger:outline-focus group-[:focus-visible:not([data-dragging])]/trigger:outline-offset-1 group-[:focus-visible:not([data-dragging])]/trigger:outline-ring data-disabled:invisible data-dragging:scale-[1.08] data-dragging:shadow-md data-[orientation=vertical]:h-1.5 data-[orientation=vertical]:w-control-xs';
</script>

<SplitterResizeTriggerIndicator
  {...props}
  bind:ref
  class={cn(indicatorClass, className)}
  data-slot="splitter-resize-trigger-indicator"
/>