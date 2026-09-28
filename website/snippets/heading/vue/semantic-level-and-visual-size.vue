<script setup lang="ts">
import { Heading } from '@moduix/vue/heading';

const headingText = 'Page title rendered as h2';
</script>

<template>
  <Heading as="h2" size="2xl">{{ headingText }}</Heading>
</template>