<script setup lang="ts">
import { Container } from '@moduix/vue/container';
import { Heading } from '@moduix/vue/heading';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/container/container-basic.module.css';
</script>

<template>
  <Container :class="styles.root">
    <Heading as="h3" size="lg">Responsive page content</Heading>
    <Text tone="muted">The content column stays readable while inline gutters fluidly adapt.</Text>
  </Container>
</template>