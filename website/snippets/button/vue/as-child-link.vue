<script setup lang="ts">
import { Button } from '@moduix/vue/button';

const link = {
  href: '#button',
  label: 'Open Button Docs',
};
</script>

<template>
  <Button as-child variant="outline">
    <a :href="link.href">{{ link.label }}</a>
  </Button>
</template>