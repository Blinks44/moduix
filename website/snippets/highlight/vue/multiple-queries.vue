<script setup lang="ts">
import { Highlight } from '@moduix/vue/highlight';
import { Text } from '@moduix/vue/text';
</script>

<template>
  <Text>
    <Highlight
      :query="['React', 'Vue']"
      text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
    />
  </Text>
</template>