<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import { Container } from '@moduix/vue/container';
import styles from '@/components/examples/container/container-with-bleed.module.css';
</script>

<template>
  <Container :class="styles.root">
    <h3>Article body</h3>
    <p>Keep the reading width constrained, then use Bleed for content that should stretch wider.</p>
    <Bleed inline="md">
      <div :class="styles.bleedSurface">Bleed content escapes the constrained column.</div>
    </Bleed>
  </Container>
</template>