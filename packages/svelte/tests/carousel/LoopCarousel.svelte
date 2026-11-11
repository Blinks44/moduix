<script lang="ts">
  import {
    Carousel,
    CarouselControl,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
    type CarouselPageChangeDetails,
  } from '@/components/carousel';

  let { onPageChange }: { onPageChange?: (details: CarouselPageChangeDetails) => void } = $props();
</script>

<Carousel aria-label="Looping gallery" loop slideCount={2} {onPageChange}>
  <CarouselItemGroup>
    <CarouselItem index={0}>First</CarouselItem>
    <CarouselItem index={1}>Second</CarouselItem>
  </CarouselItemGroup>
  <CarouselControl>
    <CarouselPrevTrigger />
    <CarouselNextTrigger />
  </CarouselControl>
</Carousel>