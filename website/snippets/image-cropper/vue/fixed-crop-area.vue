<script setup lang="ts">
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/vue/image-cropper';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
</script>

<template>
  <ImageCropper
    fixed-crop-area
    crop-shape="circle"
    :aspect-ratio="1"
    aria-label="Image cropper"
    :initial-crop="{ x: 112, y: 64, width: 220, height: 220 }"
  >
    <ImageCropperViewport>
      <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
</template>