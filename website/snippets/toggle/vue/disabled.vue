<script setup lang="ts">
import { Toggle } from '@moduix/vue/toggle';
import styles from '@/components/examples/toggle/toggle-disabled.module.css';
</script>

<template>
  <div :class="styles.row">
    <Toggle disabled>Disabled</Toggle>
    <Toggle default-pressed disabled>Pressed</Toggle>
  </div>
</template>