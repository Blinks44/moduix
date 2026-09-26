<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/vue/carousel';
import { ref } from 'vue';
import styles from '@/components/examples/carousel/carousel-dynamic.module.css';

const slides = [
  {
    id: 'fjord',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    id: 'coast',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    id: 'village',
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    id: 'forest',
    src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
    alt: 'A misty green forest with tall trees.',
  },
  {
    id: 'desert',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
    alt: 'Golden sand dunes under a bright sky.',
  },
];

const visibleSlides = ref(slides.slice(0, 4));
const page = ref(0);

const addSlide = () => {
  const template = slides[visibleSlides.value.length % slides.length];

  visibleSlides.value = [
    ...visibleSlides.value,
    {
      ...template,
      id: `${template.id}-${visibleSlides.value.length}`,
    },
  ];
};
</script>

<template>
  <div :class="styles.stack">
    <Carousel
      :class="styles.root"
      aria-label="Dynamic gallery"
      :page="page"
      :slide-count="visibleSlides.length"
      @page-change="page = $event.page"
    >
      <CarouselItemGroup :class="styles.itemGroup" aria-label="Dynamic gallery">
        <CarouselItem v-for="(slide, index) in visibleSlides" :key="slide.id" :index="index">
          <img :class="styles.image" :src="slide.src" :alt="slide.alt" />
        </CarouselItem>
      </CarouselItemGroup>
      <CarouselControl :class="styles.control">
        <CarouselPrevTrigger />
        <CarouselIndicators />
        <CarouselNextTrigger />
      </CarouselControl>
    </Carousel>

    <div>
      <output>Slides: {{ visibleSlides.length }}</output>
      <Button size="sm" variant="outline" @click="addSlide">Add slide</Button>
    </div>
  </div>
</template>