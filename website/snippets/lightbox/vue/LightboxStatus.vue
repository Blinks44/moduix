<script setup lang="ts">
import { useLightboxContext } from '@moduix/vue/lightbox';
import styles from '@/components/examples/lightbox/lightbox-root-provider-and-context.module.css';
const dialog = useLightboxContext();
</script>

<template>
  <div data-preview-meta>
    <output :class="styles.status">Preview is {{ dialog.open ? 'open' : 'closed' }}</output>
  </div>
</template>