<script lang="ts">
  import {
    Carousel,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
    CarouselProgressText,
    type CarouselPageChangeDetails,
  } from '@/components/carousel';

  let {
    dir,
    onPageChange,
  }: { dir?: 'ltr' | 'rtl'; onPageChange?: (details: CarouselPageChangeDetails) => void } =
    $props();
</script>

<Carousel aria-label="Travel gallery" {dir} slideCount={2} {onPageChange}>
  <CarouselItemGroup>
    <CarouselItem index={0}>First</CarouselItem>
    <CarouselItem index={1}>Second</CarouselItem>
  </CarouselItemGroup>
  <CarouselControl>
    <CarouselPrevTrigger />
    <CarouselNextTrigger />
    <CarouselIndicators />
  </CarouselControl>
  <CarouselProgressText />
</Carousel>