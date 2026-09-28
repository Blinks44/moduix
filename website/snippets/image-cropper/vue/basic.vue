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
  <ImageCropper aria-label="Image cropper">
    <ImageCropperViewport>
      <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
</template>