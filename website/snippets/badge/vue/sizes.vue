<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import styles from '@/components/examples/badge/badge-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
</script>

<template>
  <div :class="styles.root">
    <Badge v-for="size in sizes" :key="size" :size="size">{{ size }}</Badge>
  </div>
</template>