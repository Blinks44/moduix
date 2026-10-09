<script setup lang="ts">
import {
  FlipHorizontal as FlipHorizontalIcon,
  RotateCcw as RestartIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/vue/image-cropper';
import { ref } from 'vue';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
const rotation = ref(0);
const flip = ref({ horizontal: false, vertical: false });
</script>

<template>
  <div>
    <ImageCropper v-model:rotation="rotation" v-model:flip="flip" aria-label="Image cropper">
      <ImageCropperContext v-slot="context">
        <div>
          <Button size="sm" type="button" aria-label="Zoom out" @click="context.zoomBy(-0.1)"
            ><ZoomOutIcon
          /></Button>
          <Button size="sm" type="button" aria-label="Zoom in" @click="context.zoomBy(0.1)"
            ><ZoomInIcon
          /></Button>
          <Button
            size="sm"
            type="button"
            aria-label="Rotate counterclockwise"
            @click="context.rotateBy(-90)"
            ><RotateCcwIcon
          /></Button>
          <Button
            size="sm"
            type="button"
            aria-label="Rotate clockwise"
            @click="context.rotateBy(90)"
            ><RotateCwIcon
          /></Button>
          <Button
            size="sm"
            type="button"
            aria-label="Flip horizontally"
            @click="context.flipHorizontally()"
            ><FlipHorizontalIcon
          /></Button>
          <Button size="sm" type="button" aria-label="Reset crop" @click="context.reset()"
            ><RestartIcon
          /></Button>
        </div>
      </ImageCropperContext>
      <ImageCropperViewport>
        <ImageCropperImage :src="sampleImage" alt="Landscape" cross-origin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
    <output>Rotation: {{ rotation }}deg, horizontal flip: {{ String(flip.horizontal) }}</output>
  </div>
</template>