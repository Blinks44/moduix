<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import styles from '@/components/examples/button/button-variants.module.css';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;
</script>

<template>
  <div :class="styles.root">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
</template>