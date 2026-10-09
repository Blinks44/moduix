<script setup lang="ts">
import { Heading } from '@moduix/vue/heading';

const headingText = 'Factory-composed heading';
</script>

<template>
  <Heading as-child size="xl">
    <h2>{{ headingText }}</h2>
  </Heading>
</template>