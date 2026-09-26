<script setup lang="ts">
import { CloseButton } from '@moduix/vue/close-button';
import styles from '@/components/examples/close-button/close-button-as-child.module.css';
</script>

<template>
  <CloseButton aria-label="Close composed panel" as-child>
    <button type="button">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        stroke="currentColor"
        :class="styles.icon"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    </button>
  </CloseButton>
</template>