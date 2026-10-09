<script setup lang="ts">
import { AspectRatio } from '@moduix/vue/aspect-ratio';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-basic.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};
</script>

<template>
  <AspectRatio :ratio="16 / 9" :class="styles.root">
    <img :src="image.src" :alt="image.alt" :class="styles.image" />
  </AspectRatio>
</template>