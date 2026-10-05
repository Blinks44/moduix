<script setup lang="ts">
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Text } from '../../src';
const rootRef = ref<ComponentPublicInstance>();
defineExpose({ rootRef });
</script>

<template>
  <Text ref="rootRef" as-child tone="primary" :line-clamp="2" class="hydrated-text">
    <a href="#text">Hydrated copy</a>
  </Text>
</template>