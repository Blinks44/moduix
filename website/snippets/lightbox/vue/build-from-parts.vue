<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';
import { CloseButton } from '@moduix/vue/close-button';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxBody,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxImage,
  LightboxPositioner,
  LightboxTrigger,
} from '@moduix/vue/lightbox';
import styles from '@/components/examples/lightbox/lightbox-build-from-parts.module.css';

const image = {
  thumbnail:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
  alt: 'Mountain ridge at sunset',
};
</script>

<template>
  <Lightbox>
    <LightboxTrigger as-child>
      <button type="button" :class="styles.trigger">
        <img :src="image.thumbnail" :alt="image.alt" />
      </button>
    </LightboxTrigger>
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxContent :aria-label="image.alt">
        <LightboxCloseTrigger as-child>
          <CloseButton aria-label="Close image" :class="styles.closeButton"
            ><XIcon :stroke-width="3"
          /></CloseButton>
        </LightboxCloseTrigger>
        <LightboxBody>
          <LightboxImage :src="image.src" :alt="image.alt" />
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>