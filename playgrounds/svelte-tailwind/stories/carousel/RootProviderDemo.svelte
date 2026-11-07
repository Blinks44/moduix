<script lang="ts">
  import {
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
    CarouselRootProvider,
    useCarousel,
  } from '@/components/carousel';
  import ImageSlide from './ImageSlide.svelte';
  import { slides } from './slides';
  const frameClass = 'w-[min(52rem,calc(100vw-4rem))]';
  const carouselClass = 'w-full max-w-128';
  const controlsClass = 'justify-center';
  const statusClass = 'm-0 text-sm text-muted-foreground tabular-nums';

  // The hook lives next to the DOM it controls: Ark starts the machine when its owner mounts.
  const carousel = useCarousel({
    id: 'carousel-root-provider',
    slideCount: slides.length,
    spacing: '1em',
  });
</script>

<div class={frameClass}>
  <div class="grid justify-items-start gap-3">
    <output class={statusClass}>Page {carousel().page + 1}</output>
    <CarouselRootProvider
      aria-label="Root provider image carousel"
      class={carouselClass}
      value={carousel}
    >
      <CarouselItemGroup aria-label="Root provider image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
    </CarouselRootProvider>
  </div>
</div>