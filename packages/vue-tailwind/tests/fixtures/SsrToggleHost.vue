<script setup lang="ts">
import { ref } from 'vue';
import { Toggle, ToggleIndicator } from '../../src/components/toggle';

const pressed = ref(false);
</script>

<template>
  <Toggle ref="rootRef" as-child v-model:pressed="pressed">
    <button aria-label="Favorite">
      <ToggleIndicator ref="indicatorRef" as-child>
        <strong data-testid="on">On</strong>
        <template #fallback><em data-testid="off">Off</em></template>
      </ToggleIndicator>
    </button>
  </Toggle>
</template>