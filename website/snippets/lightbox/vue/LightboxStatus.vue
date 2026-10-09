<script setup lang="ts">
import { useLightboxContext } from '@moduix/vue/lightbox';
const dialog = useLightboxContext();
</script>

<template>
  <output>Preview is {{ dialog.open ? 'open' : 'closed' }}</output>
</template>