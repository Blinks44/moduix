<script lang="ts">
  import {
    Carousel,
    CarouselIndicator,
    CarouselIndicatorGroup,
    CarouselItem,
    CarouselItemGroup,
  } from '@/components/carousel';
</script>

<Carousel aria-label="Thumbnail gallery" slideCount={2}>
  <CarouselItemGroup>
    <CarouselItem index={0}>First</CarouselItem>
    <CarouselItem index={1}>Second</CarouselItem>
  </CarouselItemGroup>
  <CarouselIndicatorGroup>
    <CarouselIndicator
      index={0}
      class="h-12 w-20 bg-transparent data-current:h-12 data-current:w-20 data-current:bg-transparent"
    />
    <CarouselIndicator index={1} />
  </CarouselIndicatorGroup>
</Carousel>