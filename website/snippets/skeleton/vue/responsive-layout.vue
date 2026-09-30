<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/skeleton/skeleton-responsive-layout.module.css';

const announcements = [{ titleWidth: '62%' }, { titleWidth: '48%' }];
</script>

<template>
  <Stack :class="styles.root" :gap="12">
    <Stack
      v-for="item in announcements"
      :key="item.titleWidth"
      :direction="{ mobile: 'column', desktop: 'row' }"
      :gap="12"
    >
      <Skeleton :width="72" :height="48" />
      <Stack :gap="8" fill>
        <Skeleton :width="item.titleWidth" :height="14" />
        <Skeleton :height="14" />
      </Stack>
    </Stack>
  </Stack>
</template>