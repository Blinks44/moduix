<script lang="ts">
  import {
    SliderDraggingIndicator,
    type SliderDraggingIndicatorProps,
  } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SliderDraggingIndicatorProps = $props();
</script>

<SliderDraggingIndicator
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none rounded-sm bg-foreground px-2 py-1 text-xs leading-none font-medium whitespace-nowrap text-background data-[orientation=horizontal]:bottom-full data-[orientation=horizontal]:mb-2 data-[orientation=vertical]:start-full data-[orientation=vertical]:ms-2',
    className,
  )}
  data-slot="slider-dragging-indicator"
/>