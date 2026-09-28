<script setup lang="ts">
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/vue/image-cropper';
import { ref } from 'vue';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
const crop = ref({ x: 0, y: 0, width: 0, height: 0 });
const zoom = ref(1);
</script>

<template>
  <div>
    <ImageCropper
      aria-label="Image cropper"
      @crop-change="crop = $event.crop"
      @zoom-change="zoom = $event.zoom"
    >
      <ImageCropperViewport>
        <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
    <output>
      Zoom: {{ zoom.toFixed(2) }}x, crop: {{ Math.round(crop.x) }}, {{ Math.round(crop.y) }},
      {{ Math.round(crop.width) }} x {{ Math.round(crop.height) }}
    </output>
  </div>
</template>