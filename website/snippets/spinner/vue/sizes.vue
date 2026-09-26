<script setup lang="ts">
import { Spinner } from '@moduix/vue/spinner';
import styles from '@/components/examples/spinner/spinner-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <div :class="styles.root">
    <Spinner v-for="size in sizes" :key="size" decorative :size="size" />
  </div>
</template>