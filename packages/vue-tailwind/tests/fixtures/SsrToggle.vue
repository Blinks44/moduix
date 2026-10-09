<script setup lang="ts">
import { Toggle, ToggleIndicator } from '../../src/components/toggle';
</script>

<template>
  <Toggle default-pressed>
    Favorite
    <ToggleIndicator
      ><span>On</span><template #fallback><span>Off</span></template></ToggleIndicator
    >
  </Toggle>
</template>