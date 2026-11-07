<script lang="ts">
  import { CarouselItem, type CarouselItemProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const itemClass = 'min-h-0 min-w-0';

  let { class: className, ref = $bindable(null), ...props }: CarouselItemProps = $props();
</script>

<CarouselItem {...props} bind:ref class={cn(itemClass, className)} data-slot="carousel-item" />