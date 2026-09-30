<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/skeleton/skeleton-variants.module.css';

const variants = ['pulse', 'none'] as const;
</script>

<template>
  <Stack :class="styles.root" :gap="12">
    <Skeleton v-for="variant in variants" :key="variant" :height="18" :variant="variant" />
  </Stack>
</template>