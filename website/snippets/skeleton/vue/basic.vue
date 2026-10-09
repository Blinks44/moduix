<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/skeleton/skeleton-basic.module.css';

const lines = [
  { width: '100%', height: 18 },
  { width: '86%', height: 18 },
  { width: '64%', height: 18 },
];
</script>

<template>
  <Stack :class="styles.root" :gap="10">
    <Skeleton v-for="line in lines" :key="line.width" :width="line.width" :height="line.height" />
  </Stack>
</template>