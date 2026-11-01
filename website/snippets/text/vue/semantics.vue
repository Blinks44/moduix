<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Stack gap="3">
    <Text>Paragraph text rendered as p.</Text>
    <Text as="span">Inline text rendered as span.</Text>
    <Text as="small" tone="muted">Small supporting text rendered as small.</Text>
    <Text as="strong">Important text rendered as strong.</Text>
    <Text as="em">Emphasized text rendered as em.</Text>
    <Text as="div">Block text rendered as div.</Text>
  </Stack>
</template>