<script lang="ts">
  import { CarouselControl, type CarouselControlProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const controlClass =
    'flex min-w-0 items-center justify-center gap-3 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-between';

  let { class: className, ref = $bindable(null), ...props }: CarouselControlProps = $props();
</script>

<CarouselControl
  {...props}
  bind:ref
  class={cn(controlClass, className)}
  data-slot="carousel-control"
/>