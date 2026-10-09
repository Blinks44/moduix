<script setup lang="ts">
import { Toggle } from '@moduix/vue/toggle';
import styles from '@/components/examples/toggle/toggle-variants.module.css';
</script>

<template>
  <div :class="styles.row">
    <Toggle>Default</Toggle>
    <Toggle variant="outline">Outline</Toggle>
    <Toggle variant="ghost">Ghost</Toggle>
    <Toggle default-pressed>Pressed</Toggle>
  </div>
</template>