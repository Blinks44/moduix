<script setup lang="ts">
import { Heading } from '@moduix/vue/heading';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack :gap="3">
    <Heading>Heading level 1</Heading>
    <Heading as="h2">Heading level 2</Heading>
    <Heading as="h3">Heading level 3</Heading>
    <Heading as="h4">Heading level 4</Heading>
    <Heading as="h5">Heading level 5</Heading>
    <Heading as="h6">Heading level 6</Heading>
  </Stack>
</template>