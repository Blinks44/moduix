<script setup lang="ts">
import { RatingGroup, RatingGroupControl, RatingGroupItems } from '@moduix/vue/rating-group';
import styles from '@/components/examples/rating-group/component-sizes.module.css';
</script>

<template>
  <div :class="styles.stack">
    <RatingGroup size="xs" :default-value="3" aria-label="Extra-small rating">
      <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    </RatingGroup>
    <RatingGroup size="sm" :default-value="3" aria-label="Small rating">
      <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    </RatingGroup>
    <RatingGroup size="md" :default-value="3" aria-label="Medium rating">
      <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    </RatingGroup>
    <RatingGroup size="lg" :default-value="3" aria-label="Large rating">
      <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    </RatingGroup>
    <RatingGroup size="xl" :default-value="3" aria-label="Extra-large rating">
      <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    </RatingGroup>
  </div>
</template>