<script setup lang="ts">
import { Star as StarIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import styles from '@/components/examples/button/button-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconSizes = [
  { label: 'Small favorite', size: 'icon-sm' },
  { label: 'Favorite', size: 'icon-md' },
  { label: 'Large favorite', size: 'icon-lg' },
] as const;
</script>

<template>
  <div :class="styles.root">
    <Button v-for="size in sizes" :key="size" :size="size">{{ size }}</Button>
    <Button
      v-for="item in iconSizes"
      :key="item.size"
      :size="item.size"
      variant="outline"
      :aria-label="item.label"
    >
      <StarIcon />
    </Button>
  </div>
</template>