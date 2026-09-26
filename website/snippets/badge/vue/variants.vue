<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import styles from '@/components/examples/badge/badge-variants.module.css';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
</script>

<template>
  <div :class="styles.root">
    <Badge v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Badge>
  </div>
</template>