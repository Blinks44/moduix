<script setup lang="ts">
import { Container } from '@moduix/vue/container';
import styles from '@/components/examples/container/container-semantic-element.module.css';
</script>

<template>
  <Container as-child size="md" :class="styles.root">
    <main>
      <h3>Main content area</h3>
      <p>Use asChild when the wrapper should carry semantic meaning.</p>
    </main>
  </Container>
</template>