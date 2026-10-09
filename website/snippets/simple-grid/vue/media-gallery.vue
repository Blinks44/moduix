<script setup lang="ts">
import { SimpleGrid } from '@moduix/vue/simple-grid';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/simple-grid/simple-grid-media-gallery.module.css';

const destinations = [
  {
    name: 'Alpine lake',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    name: 'Coastal trail',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=80',
    alt: 'Ocean waves beside a sandy coastal trail.',
  },
  {
    name: 'Forest cabin',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=640&q=80',
    alt: 'A small cabin surrounded by green forest.',
  },
];
</script>

<template>
  <SimpleGrid as-child min-child-width="10rem" gap="var(--moduix-spacing-3)" :class="styles.root">
    <ul aria-label="Travel destinations">
      <li v-for="destination in destinations" :key="destination.name" :class="styles.item">
        <img :src="destination.image" :alt="destination.alt" loading="lazy" :class="styles.image" />
        <Text as="span" size="sm" weight="medium" :class="styles.caption">{{
          destination.name
        }}</Text>
      </li>
    </ul>
  </SimpleGrid>
</template>