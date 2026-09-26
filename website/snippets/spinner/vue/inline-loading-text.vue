<script setup lang="ts">
import { Spinner } from '@moduix/vue/spinner';
import styles from '@/components/examples/spinner/spinner-inline-loading-text.module.css';
</script>

<template>
  <div :class="styles.root">
    <Spinner decorative size="inherit" />
    <span :class="styles.label">Saving changes</span>
  </div>
</template>