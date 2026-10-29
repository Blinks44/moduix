<script setup lang="ts">
import {
  ImageCropper,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperSelection,
  ImageCropperViewport,
} from '@moduix/vue/image-cropper';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
</script>

<template>
  <ImageCropper aria-label="Image cropper">
    <ImageCropperViewport>
      <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
      <ImageCropperSelection>
        <ImageCropperGrid axis="horizontal" />
        <ImageCropperGrid axis="vertical" />
        <ImageCropperHandle
          v-for="position in ImageCropperHandles"
          :key="position"
          :position="position"
        />
      </ImageCropperSelection>
    </ImageCropperViewport>
  </ImageCropper>
</template>