<script setup lang="ts">
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/skeleton/skeleton-media-object.module.css';

const userRowSkeleton = { avatarSize: 48, titleWidth: '46%', bodyWidth: '72%' };
</script>

<template>
  <Stack :class="styles.root" direction="row" align="center" :gap="12">
    <Skeleton :box-size="userRowSkeleton.avatarSize" border-radius="var(--moduix-radius-full)" />
    <Stack direction="column" :gap="8" fill>
      <Skeleton :width="userRowSkeleton.titleWidth" :height="16" />
      <Skeleton :height="14" />
      <Skeleton :width="userRowSkeleton.bodyWidth" :height="14" />
    </Stack>
  </Stack>
</template>