<script setup lang="ts">
import { Container } from '@moduix/vue/container';
import styles from '@/components/examples/container/container-basic.module.css';
</script>

<template>
  <Container :class="styles.root">
    <h3>Responsive page content</h3>
    <p>The content column stays readable while inline gutters fluidly adapt.</p>
  </Container>
</template>