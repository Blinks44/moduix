<script setup lang="ts">
import { Container } from '@moduix/vue/container';
import { Heading } from '@moduix/vue/heading';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/container/container-full-width.module.css';
</script>

<template>
  <Container size="full" gutter="lg" :class="styles.root">
    <Heading as="h3" size="lg">Full-width section</Heading>
    <Text tone="muted"
      >The content can use all available width while the selected gutter protects it from viewport
      edges.</Text
    >
  </Container>
</template>