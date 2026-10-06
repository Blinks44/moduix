<script setup lang="ts">
import {
  ImageCropper,
  ImageCropperViewport,
  ImageCropperImage,
  ImageCropperCropArea,
} from '../../src/components/image-cropper';
import landscape from './landscape.svg';
</script>
<template>
  <ImageCropper aria-label="SSR crop">
    <ImageCropperViewport>
      <ImageCropperImage :src="landscape" alt="Landscape" />
      <ImageCropperCropArea />
    </ImageCropperViewport>
  </ImageCropper>
</template>