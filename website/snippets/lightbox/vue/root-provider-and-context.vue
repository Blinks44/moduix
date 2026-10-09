<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  LightboxCloseIcon,
  LightboxContent,
  LightboxImage,
  LightboxPositioner,
  LightboxRootProvider,
  useLightbox,
} from '@moduix/vue/lightbox';
import LightboxStatus from './LightboxStatus.vue';

const image = {
  src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
  alt: 'Road through a green forest',
};

const lightbox = useLightbox();
</script>

<template>
  <Button @click="lightbox.setOpen(true)">
    Lightbox is {{ lightbox.open ? 'open' : 'closed' }}
  </Button>
  <LightboxRootProvider :value="lightbox">
    <LightboxPositioner>
      <LightboxContent :aria-label="image.alt">
        <LightboxCloseIcon />
        <LightboxImage :src="image.src" :alt="image.alt" />
        <LightboxStatus />
      </LightboxContent>
    </LightboxPositioner>
  </LightboxRootProvider>
</template>