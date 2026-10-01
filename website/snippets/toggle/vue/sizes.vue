<script setup lang="ts">
import { Toggle } from '@moduix/vue/toggle';
import styles from '@/components/examples/toggle/toggle-sizes.module.css';
</script>

<template>
  <div :class="styles.row">
    <Toggle size="xs">Extra-small</Toggle>
    <Toggle size="sm">Small</Toggle>
    <Toggle size="md">Medium</Toggle>
    <Toggle size="lg">Large</Toggle>
  </div>
</template>