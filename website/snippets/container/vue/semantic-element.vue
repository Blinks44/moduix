<script setup lang="ts">
import { Container } from '@moduix/vue/container';
import { Heading } from '@moduix/vue/heading';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/container/container-semantic-element.module.css';
</script>

<template>
  <Container as-child size="md" :class="styles.root">
    <main>
      <Heading as="h3" size="lg">Main content area</Heading>
      <Text tone="muted">Use asChild when the wrapper should carry semantic meaning.</Text>
    </main>
  </Container>
</template>