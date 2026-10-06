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
import styles from '@/components/examples/lightbox/lightbox-advanced-customization.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};
</script>

<template>
  <Lightbox>
    <LightboxTrigger :class="styles.button">Open styled lightbox</LightboxTrigger>
    <LightboxBackdrop :class="styles.customBackdrop" />
    <LightboxPositioner>
      <LightboxContent :class="styles.customContent" :aria-label="image.alt">
        <LightboxCloseIcon :class="styles.customClose" />
        <LightboxImage :src="image.src" :alt="image.alt" />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>