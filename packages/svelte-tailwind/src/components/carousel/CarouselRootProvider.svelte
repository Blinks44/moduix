<script lang="ts">
  import { CarouselRootProvider, type CarouselRootProviderProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const rootClass =
    'flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row';

  let { class: className, ref = $bindable(null), ...props }: CarouselRootProviderProps = $props();
</script>

<CarouselRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="carousel-root-provider"
/>