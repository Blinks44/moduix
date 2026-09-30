<script setup lang="ts">
import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@moduix/vue/signature-pad';
import type { SignaturePadDrawEndDetails } from '@moduix/vue/signature-pad';
import { ref } from 'vue';
import styles from '@/components/examples/signature-pad/signature-pad-image-preview.module.css';

const imageType = 'image/png';
const imageUrl = ref('');

const handleDrawEnd = (details: SignaturePadDrawEndDetails) => {
  void details.getDataUrl(imageType).then((url) => {
    imageUrl.value = url;
  });
};
</script>

<template>
  <div :class="styles.root">
    <SignaturePad @draw-end="handleDrawEnd">
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePad>
    <img v-if="imageUrl" :src="imageUrl" alt="Signature preview" :class="styles.preview" />
    <div v-else :class="styles.placeholder">Preview appears after signing</div>
  </div>
</template>