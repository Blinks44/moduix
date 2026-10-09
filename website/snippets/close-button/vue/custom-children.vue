<script setup lang="ts">
import { CloseButton } from '@moduix/vue/close-button';
import styles from '@/components/examples/close-button/close-button-custom-children.module.css';
</script>

<template>
  <CloseButton aria-label="Close custom panel">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      :class="styles.icon"
    >
      <path d="m7 7 10 10" />
      <path d="m17 7-10 10" />
    </svg>
  </CloseButton>
</template>