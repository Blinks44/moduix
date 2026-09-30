<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<template>
  <div :class="styles.root">
    <div v-for="size in sizes" :key="size" :class="styles.item">
      <span>{{ size }}</span>
      <Separator :size="size" />
    </div>
  </div>
</template>