<script setup lang="ts">
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/text/text-basic.module.css';
</script>

<template>
  <div :class="styles.stack">
    <Text>Use text to describe interface state and supporting details.</Text>
    <Text as="small" tone="muted">Last updated 2 minutes ago</Text>
  </div>
</template>