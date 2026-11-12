<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack direction="row" gap="2" wrap="wrap">
    <Badge>Design</Badge>
    <Badge>Engineering</Badge>
    <Badge>Docs</Badge>
    <Badge>Release</Badge>
  </Stack>
</template>