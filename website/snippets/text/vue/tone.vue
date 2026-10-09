<script setup lang="ts">
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/text/text-tone.module.css';
</script>

<template>
  <div :class="styles.stack">
    <Text tone="default">Default tone</Text>
    <Text tone="muted">Muted tone</Text>
    <Text tone="subtle">Subtle tone</Text>
    <Text tone="primary">Primary tone</Text>
    <Text tone="destructive">Destructive tone</Text>
  </div>
</template>