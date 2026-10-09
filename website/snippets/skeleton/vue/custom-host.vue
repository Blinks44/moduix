<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import styles from '@/components/examples/skeleton/skeleton-custom-host.module.css';

const loadingRegion = { label: 'Loading summary' };
</script>

<template>
  <Skeleton as-child :class="styles.root" :height="72" border-radius="var(--moduix-radius-lg)">
    <section :aria-label="loadingRegion.label" />
  </Skeleton>
</template>