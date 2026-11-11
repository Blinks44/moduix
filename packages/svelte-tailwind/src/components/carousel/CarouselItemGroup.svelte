<script lang="ts">
  import { CarouselItemGroup, type CarouselItemGroupProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const itemGroupClass =
    'min-h-0 min-w-0 flex-1 rounded-xl outline-0 focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-y-contain';

  let { class: className, ref = $bindable(null), ...props }: CarouselItemGroupProps = $props();
</script>

<CarouselItemGroup
  {...props}
  bind:ref
  class={cn(itemGroupClass, className)}
  data-slot="carousel-item-group"
/>