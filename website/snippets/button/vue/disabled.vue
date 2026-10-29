<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';

const labels = {
  button: 'Disabled',
  link: 'Disabled Link',
};
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
    <Button disabled>{{ labels.button }}</Button>
    <Button as-child disabled variant="outline">
      <a href="#button">{{ labels.link }}</a>
    </Button>
  </Stack>
</template>