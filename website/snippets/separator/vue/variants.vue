<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-variants.module.css';

const variants = ['solid', 'dashed', 'dotted'] as const;
</script>

<template>
  <div :class="styles.root">
    <div v-for="variant in variants" :key="variant" :class="styles.item">
      <span>{{ variant }}</span>
      <Separator :variant="variant" />
    </div>
  </div>
</template>