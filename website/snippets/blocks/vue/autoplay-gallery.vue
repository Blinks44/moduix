<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import {
  CarouselRootProvider,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  useCarousel,
} from '@/components/ui/carousel';
import styles from './autoplay-gallery.module.css';
const slides = [
  {
    id: 'workspaces',
    category: 'Workspaces',
    title: 'Space to make ideas happen',
    description: 'Quiet rooms, shared tables, and a place to reset between meetings.',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    alt: 'A bright office with tables, chairs, and plants.',
  },
  {
    id: 'outdoors',
    category: 'Outdoors',
    title: 'Find your next wide-open weekend',
    description: 'A little fresh air, a long trail, and views worth slowing down for.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Snow-covered mountains under a clear sky.',
  },
  {
    id: 'wellbeing',
    category: 'Wellbeing',
    title: 'Make room for feeling better',
    description: 'Thoughtful care and small rituals that keep the everyday in balance.',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    alt: 'A calm spa room with warm light and a treatment bed.',
  },
  {
    id: 'community',
    category: 'Community',
    title: 'The good part is doing it together',
    description: 'Make time for the people, places, and events that bring energy back.',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    alt: 'Friends enjoying an outdoor gathering at sunset.',
  },
];

const carousel = useCarousel({
  autoplay: { delay: 3500 },
  loop: true,
  slideCount: slides.length,
  slidesPerPage: 1.12,
  padding: 'var(--autoplay-gallery-padding, var(--moduix-spacing-8))',
  spacing: 'var(--autoplay-gallery-spacing, var(--moduix-spacing-4))',
});
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') carousel.value.play();
};
const resumeAutoplay = () => requestAnimationFrame(() => carousel.value.play());
const handleWheel = (event: WheelEvent) => {
  if (event.deltaX !== 0) carousel.value.pause();
};
onMounted(() => document.addEventListener('visibilitychange', handleVisibilityChange));
onBeforeUnmount(() => document.removeEventListener('visibilitychange', handleVisibilityChange));
</script>
<template>
  <CarouselRootProvider :value="carousel" aria-label="Featured experiences" :class="styles.gallery">
    <div :class="styles.viewport">
      <CarouselItemGroup
        :class="styles.itemGroup"
        @touchstart="carousel.pause()"
        @wheel="handleWheel"
      >
        <CarouselItem
          v-for="(slide, index) in slides"
          :key="slide.id"
          :class="styles.item"
          :data-active="carousel.page === index ? '' : undefined"
          :index="index"
          snap-align="center"
        >
          <img :class="styles.image" :src="slide.src" :alt="slide.alt" />
          <div :class="styles.copy">
            <span :class="styles.category">{{ slide.category }}</span>
            <h2 :class="styles.title">{{ slide.title }}</h2>
            <p :class="styles.description">{{ slide.description }}</p>
          </div>
        </CarouselItem>
      </CarouselItemGroup>
      <CarouselControl :class="styles.control"
        ><CarouselPrevTrigger
          :class="styles.prevTrigger"
          @click="resumeAutoplay" /><CarouselNextTrigger
          :class="styles.nextTrigger"
          @click="resumeAutoplay"
      /></CarouselControl>
    </div>
    <CarouselIndicatorGroup :class="styles.indicatorGroup">
      <CarouselIndicator
        v-for="(_, index) in carousel.pageSnapPoints"
        :key="index"
        :class="styles.indicator"
        :data-playing="carousel.isPlaying ? '' : undefined"
        :index="index"
        @click="resumeAutoplay"
      />
    </CarouselIndicatorGroup>
  </CarouselRootProvider>
</template>