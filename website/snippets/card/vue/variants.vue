<script setup lang="ts">
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import styles from '@/components/examples/card/card-variants.module.css';

const variants = ['elevated', 'outline', 'subtle'] as const;
const descriptions = {
  elevated: 'Raised above nearby content.',
  outline: 'Separated with a visible border.',
  subtle: 'Grouped with a muted background.',
};
</script>

<template>
  <div :class="styles.root">
    <Card v-for="variant in variants" :key="variant" :class="styles.card" :variant="variant">
      <CardHeader>
        <CardTitle>{{ variant }}</CardTitle>
        <CardDescription>{{ descriptions[variant] }}</CardDescription>
      </CardHeader>
      <CardBody>Use variants to communicate surface hierarchy.</CardBody>
    </Card>
  </div>
</template>