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
  import styles from './Carousel.stories.module.css';
  import ImageSlide from './ImageSlide.svelte';
  import { slides } from './slides';

  // The hook lives next to the DOM it controls: Ark starts the machine when its owner mounts.
  const carousel = useCarousel({
    id: 'carousel-root-provider',
    slideCount: slides.length,
    spacing: '1em',
  });
</script>

<div class={styles.frame}>
  <div class={styles.exampleStack}>
    <output class={styles.output}>Page {carousel().page + 1}</output>
    <CarouselRootProvider
      aria-label="Root provider image carousel"
      class={styles.carousel}
      value={carousel}
    >
      <CarouselItemGroup aria-label="Root provider image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={styles.compactControls}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
    </CarouselRootProvider>
  </div>
</div>