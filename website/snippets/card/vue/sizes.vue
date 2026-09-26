<script setup lang="ts">
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import styles from '@/components/examples/card/card-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const descriptions = {
  sm: 'Compact supporting content.',
  md: 'Default product content.',
  lg: 'Prominent standalone content.',
};
</script>

<template>
  <div :class="styles.root">
    <Card v-for="size in sizes" :key="size" :class="styles.card" :size="size">
      <CardHeader>
        <CardTitle>Card {{ size }}</CardTitle>
        <CardDescription>{{ descriptions[size] }}</CardDescription>
      </CardHeader>
      <CardBody>Shared content with size-specific density.</CardBody>
    </Card>
  </div>
</template>