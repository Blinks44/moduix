<script setup lang="ts">
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '../../src';

defineProps<{ dir?: 'ltr' | 'rtl' }>();
defineEmits<{ pageChange: [details: { page: number }] }>();
</script>

<template>
  <Carousel
    aria-label="Travel gallery"
    :dir="dir"
    :slide-count="2"
    @page-change="$emit('pageChange', $event)"
  >
    <CarouselItemGroup>
      <CarouselItem :index="0">First</CarouselItem>
      <CarouselItem :index="1">Second</CarouselItem>
    </CarouselItemGroup>
    <CarouselControl>
      <CarouselPrevTrigger />
      <CarouselNextTrigger />
      <CarouselIndicators />
    </CarouselControl>
    <CarouselProgressText />
  </Carousel>
</template>