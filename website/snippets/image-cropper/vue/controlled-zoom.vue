<script setup lang="ts">
import { ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from '@lucide/vue';
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
const minZoom = 0.5;
const maxZoom = 3;
const zoom = ref(1);
</script>

<template>
  <div>
    <ImageCropper
      v-model:zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      aria-label="Image cropper"
    >
      <ImageCropperViewport>
        <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
    <output>Zoom: {{ zoom.toFixed(1) }}x</output>
    <Button
      size="sm"
      type="button"
      aria-label="Zoom out"
      @click="zoom = Math.max(minZoom, zoom - 0.1)"
    >
      <ZoomOutIcon />
    </Button>
    <Button
      size="sm"
      type="button"
      aria-label="Zoom in"
      @click="zoom = Math.min(maxZoom, zoom + 0.1)"
    >
      <ZoomInIcon />
    </Button>
  </div>
</template>