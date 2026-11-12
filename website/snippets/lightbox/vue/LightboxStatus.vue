<script setup lang="ts">
import { useLightboxContext } from '@moduix/vue/lightbox';
const dialog = useLightboxContext();
</script>

<template>
  <div data-preview-meta>
    <output>Preview is {{ dialog.open ? 'open' : 'closed' }}</output>
  </div>
</template>