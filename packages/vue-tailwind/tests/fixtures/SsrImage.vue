<script setup lang="ts">
import { Image, ImageSource } from '../../src/components/image';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';
</script>

<template>
  <picture>
    <ImageSource
      media="(min-width: 48rem)"
      type="image/avif"
      :src="imageUrl"
      :width="800"
      :height="520"
    />
    <Image :src="imageUrl" alt="Mountain landscape" :width="800" :height="520" />
  </picture>
</template>