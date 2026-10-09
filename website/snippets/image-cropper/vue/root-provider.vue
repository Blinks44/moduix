<script setup lang="ts">
import { RotateCcw as RestartIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '@moduix/vue/image-cropper';
import { ref } from 'vue';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });
const resets = ref(0);

const handleReset = () => {
  imageCropper.value.reset();
  resets.value += 1;
};
</script>

<template>
  <div>
    <ImageCropperRootProvider :value="imageCropper" aria-label="Image cropper">
      <ImageCropperViewport>
        <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
    <output>Resets: {{ resets }}</output>
    <Button size="sm" type="button" aria-label="Reset crop" @click="handleReset">
      <RestartIcon />
    </Button>
  </div>
</template>