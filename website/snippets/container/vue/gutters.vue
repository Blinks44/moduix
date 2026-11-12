<script setup lang="ts">
import { Container } from '@moduix/vue/container';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/container/container-gutters.module.css';

const gutters = [
  { value: 'none', label: 'No gutter' },
  { value: 'sm', label: 'Small gutter' },
  { value: 'md', label: 'Medium gutter' },
  { value: 'lg', label: 'Large gutter' },
] as const;
</script>

<template>
  <div :class="styles.stack">
    <Container
      v-for="gutter in gutters"
      :key="gutter.value"
      :gutter="gutter.value"
      :class="styles.container"
    >
      <Text>{{ gutter.label }}</Text>
    </Container>
  </div>
</template>