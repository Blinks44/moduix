<script setup lang="ts">
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/text/text-weight.module.css';
</script>

<template>
  <div :class="styles.stack">
    <Text weight="regular">Regular weight</Text>
    <Text weight="medium">Medium weight</Text>
    <Text weight="semibold">Semibold weight</Text>
    <Text weight="bold">Bold weight</Text>
  </div>
</template>