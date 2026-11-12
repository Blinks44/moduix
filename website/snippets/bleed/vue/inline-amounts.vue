<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/bleed/bleed-inline-amounts.module.css';

const inlineAmounts = [
  { label: 'Small inline bleed', value: 'sm' },
  { label: 'Large inline bleed', value: 'lg' },
  { label: 'Full inline bleed', value: 'full' },
] as const;
</script>

<template>
  <div :class="styles.root">
    <Bleed
      v-for="amount in inlineAmounts"
      :key="amount.value"
      :inline="amount.value"
      :class="styles.panel"
    >
      <Text>{{ amount.label }}</Text>
    </Bleed>
  </div>
</template>