<script setup lang="ts">
import { AspectRatio } from '@moduix/vue/aspect-ratio';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-common-ratios.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

const ratios = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];
</script>

<template>
  <div :class="styles.root">
    <figure v-for="ratio in ratios" :key="ratio.label" :class="styles.item">
      <AspectRatio :ratio="ratio.value" :class="styles.frame">
        <img :src="image.src" :alt="image.alt" :class="styles.image" />
      </AspectRatio>
      <figcaption :class="styles.caption">{{ ratio.label }}</figcaption>
    </figure>
  </div>
</template>