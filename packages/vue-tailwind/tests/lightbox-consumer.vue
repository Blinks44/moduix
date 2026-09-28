<script setup lang="ts">
import { ref } from 'vue';
import {
  Lightbox,
  LightboxCloseIcon,
  LightboxContent,
  LightboxImage,
  LightboxPositioner,
  LightboxTrigger,
} from '../src/components/lightbox';

const open = ref(false);
</script>

<template>
  <Lightbox v-model:open="open" :portalled="false">
    <LightboxTrigger>Open preview</LightboxTrigger>
    <LightboxPositioner>
      <LightboxCloseIcon />
      <LightboxContent aria-label="Image preview">
        <LightboxImage
          src="/full-size.jpg"
          alt="Mountain ridge"
          close-on-click
          data-close-on-click=""
        />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>