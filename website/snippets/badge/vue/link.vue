<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';

const link = {
  href: '#styling',
  label: 'Badge styling guidance',
};
</script>

<template>
  <Badge variant="link" as-child>
    <a :href="link.href">{{ link.label }}</a>
  </Badge>
</template>