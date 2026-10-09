<script setup lang="ts">
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/text/text-truncation.module.css';
</script>

<template>
  <div :class="styles.narrow">
    <Text truncate>Release notes for the weekly platform update are ready for review.</Text>
    <Text :line-clamp="2">
      Longer interface copy can be clamped when it appears inside dense cards, tables, or
      constrained previews where the surrounding layout owns disclosure.
    </Text>
  </div>
</template>