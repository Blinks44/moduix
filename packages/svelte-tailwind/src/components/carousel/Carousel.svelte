<script lang="ts">
  import { CarouselRoot, type CarouselRootProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const rootClass =
    'flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row';

  let {
    class: className,
    page = $bindable(),
    ref = $bindable(null),
    ...props
  }: CarouselRootProps = $props();
</script>

<CarouselRoot
  {...props}
  bind:page
  bind:ref
  class={cn(rootClass, className)}
  data-slot="carousel-root"
/>