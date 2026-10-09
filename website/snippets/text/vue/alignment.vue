<script setup lang="ts">
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/text/text-alignment.module.css';
</script>

<template>
  <div :class="styles.aligned">
    <Text align="start">Start-aligned text.</Text>
    <Text align="center">Center aligned text.</Text>
    <Text align="end">End-aligned text.</Text>
  </div>
</template>