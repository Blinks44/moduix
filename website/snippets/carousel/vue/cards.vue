<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from '@moduix/vue/card';
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/vue/carousel';
import styles from '@/components/examples/carousel/carousel-cards.module.css';

const destinations = [
  {
    id: 'bergen',
    title: 'Bergen, Norway',
    description: 'A colorful harbor between seven mountains.',
    image:
      'https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=1280&q=80',
  },
  {
    id: 'kyoto',
    title: 'Kyoto, Japan',
    description: 'Quiet temples, lantern-lit streets, and autumn gardens.',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1280&q=80',
  },
  {
    id: 'lisbon',
    title: 'Lisbon, Portugal',
    description: 'Sunlit hills, tiled facades, and Atlantic views.',
    image:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1280&q=80',
  },
];
</script>

<template>
  <Carousel
    :class="styles.root"
    aria-label="Featured destinations"
    :slide-count="destinations.length"
  >
    <CarouselItemGroup :class="styles.itemGroup">
      <CarouselItem
        v-for="(destination, index) in destinations"
        :key="destination.id"
        :index="index"
      >
        <Card :class="styles.card">
          <CardMedia>
            <img :class="styles.cardImage" :src="destination.image" alt="" />
          </CardMedia>
          <CardHeader>
            <CardTitle>{{ destination.title }}</CardTitle>
            <CardDescription>{{ destination.description }}</CardDescription>
          </CardHeader>
          <CardFooter :class="styles.cardFooter">
            <Button :class="styles.cardButton" variant="outline">Explore</Button>
          </CardFooter>
        </Card>
      </CarouselItem>
    </CarouselItemGroup>

    <CarouselControl :class="styles.control">
      <CarouselPrevTrigger />
      <CarouselIndicators />
      <CarouselNextTrigger />
    </CarouselControl>
  </Carousel>
</template>