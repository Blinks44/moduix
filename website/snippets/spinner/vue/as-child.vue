<script setup lang="ts">
import { Spinner } from '@moduix/vue/spinner';
import styles from '@/components/examples/spinner/spinner-as-child.module.css';
</script>

<template>
  <Spinner as-child size="lg" aria-label="Loading report">
    <span :class="styles.root">
      <span
        aria-hidden="true"
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
      >
        <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
      </span>
    </span>
  </Spinner>
</template>