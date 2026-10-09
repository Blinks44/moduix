<script setup lang="ts">
import {
  Lightbox,
  LightboxBackdrop,
  LightboxCloseIcon,
  LightboxContent,
  LightboxImage,
  LightboxPositioner,
  LightboxTrigger,
} from '@moduix/vue/lightbox';
import styles from '@/components/examples/lightbox/lightbox-click-to-close-image.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};
</script>

<template>
  <Lightbox>
    <LightboxTrigger :class="styles.button">Open click-to-close lightbox</LightboxTrigger>
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxContent :aria-label="image.alt">
        <LightboxCloseIcon />
        <LightboxImage :src="image.src" :alt="image.alt" close-on-click />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>