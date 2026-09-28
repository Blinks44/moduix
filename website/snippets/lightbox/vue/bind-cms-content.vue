<script setup lang="ts">
import {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxCloseIcon,
  LightboxContent,
  LightboxImage,
  LightboxPositioner,
} from '@moduix/vue/lightbox';
import type { LightboxImageSelectDetails } from '@moduix/vue/lightbox';
import { ref } from 'vue';
import styles from '@/components/examples/lightbox/lightbox-bind-cms-content.module.css';

const images = [
  {
    id: 'mountain',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Mountain ridge at sunset',
  },
  {
    id: 'sea',
    thumbnail:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
    alt: 'Sea cliffs under a cloudy sky',
  },
  {
    id: 'forest',
    thumbnail:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a green forest',
  },
];

const rootRef = ref<HTMLElement | null>(null);
const activeImage = ref<LightboxImageSelectDetails | null>(null);
</script>

<template>
  <div ref="rootRef" :class="styles.gallery">
    <button v-for="image in images" :key="image.id" type="button" :class="styles.galleryTrigger">
      <img :src="image.thumbnail" :data-lightbox-src="image.src" :alt="image.alt" />
    </button>
  </div>

  <Lightbox>
    <LightboxBind
      :root-ref="() => rootRef"
      selector="button"
      :on-image-select="(details) => (activeImage = details)"
    />
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxCloseIcon />
      <LightboxContent :aria-label="activeImage?.alt ?? 'Image preview'">
        <LightboxImage v-if="activeImage" :src="activeImage.src" :alt="activeImage.alt ?? ''" />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>