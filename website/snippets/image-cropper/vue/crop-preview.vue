<script setup lang="ts">
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
const imageCropper = useImageCropper({ cropShape: 'circle', aspectRatio: 1 });
const preview = ref<string>();
const status = ref('Preview not created');

const handleCrop = async () => {
  try {
    const result = await imageCropper.value.getCroppedImage({ output: 'dataUrl' });

    if (typeof result === 'string') {
      preview.value = result;
      status.value = 'Preview created';
    } else {
      preview.value = undefined;
      status.value = 'Image is not ready';
    }
  } catch {
    preview.value = undefined;
    status.value = 'Preview could not be created';
  }
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
    <output>{{ status }}</output>
    <img v-if="preview" :src="preview" alt="Cropped image preview" width="128" height="128" />
    <Button type="button" @click="handleCrop">Create crop preview</Button>
  </div>
</template>