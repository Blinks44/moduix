<script setup lang="ts">
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { SimpleGrid } from '../../src';
const rootRef = ref<ComponentPublicInstance>();
defineExpose({ rootRef });
</script>

<template>
  <SimpleGrid ref="rootRef" as-child min-child-width="10rem" :gap="12" class="hydrated-grid">
    <ul aria-label="Projects">
      <li>Analytics</li>
    </ul>
  </SimpleGrid>
</template>