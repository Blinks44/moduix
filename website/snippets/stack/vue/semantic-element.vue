<script setup lang="ts">
import { Heading } from '@moduix/vue/heading';
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Stack as-child gap="3">
    <section>
      <Heading as="h3" size="md">Rendered as section</Heading>
      <Text tone="muted">
        Use asChild when the layout wrapper should also carry document semantics.
      </Text>
    </section>
  </Stack>
</template>