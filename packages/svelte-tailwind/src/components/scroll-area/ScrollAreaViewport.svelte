<script lang="ts">
  import { ScrollAreaViewport, type ScrollAreaViewportProps } from '@ark-ui/svelte/scroll-area';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ScrollAreaViewportProps = $props();

  const viewportClass =
    'h-full min-h-0 w-full min-w-0 [scrollbar-width:none] rounded-[inherit] outline-0 group-data-[fade]/scroll-area:not-forced-colors:[mask-image:linear-gradient(to_bottom,transparent_0,black_min(var(--spacing-10),var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(var(--spacing-10),var(--scroll-area-overflow-y-end,0px))),transparent_100%)] group-data-[fade]/scroll-area:not-forced-colors:mask-no-repeat focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring forced-colors:focus-visible:outline-[Highlight] [&::-webkit-scrollbar]:hidden';
</script>

<ScrollAreaViewport
  {...props}
  bind:ref
  class={cn(viewportClass, className)}
  data-slot="scroll-area-viewport"
/>