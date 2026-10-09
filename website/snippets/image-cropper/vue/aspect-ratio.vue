<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/vue/image-cropper';
import { ref } from 'vue';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const aspectRatios = [
  { label: '16:9', value: 16 / 9 },
  { label: '1:1', value: 1 },
  { label: '9:16', value: 9 / 16 },
];

const aspectRatio = ref(16 / 9);
</script>

<template>
  <div>
    <ImageCropper :aspect-ratio="aspectRatio" aria-label="Image cropper">
      <ImageCropperViewport>
        <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
    <output
      >Aspect ratio:
      {{ aspectRatios.find((aspect) => aspect.value === aspectRatio)?.label }}</output
    >
    <Button
      v-for="aspect in aspectRatios"
      :key="aspect.label"
      size="sm"
      type="button"
      @click="aspectRatio = aspect.value"
    >
      {{ aspect.label }}
    </Button>
  </div>
</template>