<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack as-child :gap="12">
    <section>
      <h3>Rendered as section</h3>
      <p>Use asChild when the layout wrapper should also carry document semantics.</p>
    </section>
  </Stack>
</template>