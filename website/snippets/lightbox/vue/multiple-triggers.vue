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
import { ref } from 'vue';
import styles from '@/components/examples/lightbox/lightbox-multiple-triggers.module.css';

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

const activeImage = ref(images[0]);
const selectImage = ({ value }: { value: string | null }) => {
  activeImage.value = images.find((image) => image.id === value) ?? images[0];
};
</script>

<template>
  <Lightbox @trigger-value-change="selectImage">
    <div :class="styles.gallery">
      <LightboxTrigger v-for="image in images" :key="image.id" :value="image.id" as-child>
        <button type="button" :class="styles.galleryTrigger">
          <img :src="image.thumbnail" :alt="image.alt" />
        </button>
      </LightboxTrigger>
    </div>
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxCloseIcon />
      <LightboxContent :aria-label="activeImage.alt">
        <LightboxImage :src="activeImage.src" :alt="activeImage.alt" />
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>