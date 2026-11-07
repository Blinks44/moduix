<script lang="ts">
  import {
    Carousel,
    CarouselAutoplayIndicator,
    CarouselAutoplayTrigger,
    CarouselItem,
    CarouselItemGroup,
  } from '@/components/carousel';
</script>

<Carousel aria-label="Autoplay gallery" slideCount={2}>
  <CarouselItemGroup>
    <CarouselItem index={0}>First</CarouselItem>
    <CarouselItem index={1}>Second</CarouselItem>
  </CarouselItemGroup>
  <CarouselAutoplayTrigger>
    <CarouselAutoplayIndicator>
      Pause slideshow
      {#snippet fallback()}Start slideshow{/snippet}
    </CarouselAutoplayIndicator>
  </CarouselAutoplayTrigger>
</Carousel>