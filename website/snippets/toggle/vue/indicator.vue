<script setup lang="ts">
import { Check as CheckIcon, Star as StarIcon } from '@lucide/vue';
import { Toggle, ToggleIndicator } from '@moduix/vue/toggle';
</script>

<template>
  <Toggle aria-label="Favorite" size="icon-md" variant="outline">
    <ToggleIndicator>
      <CheckIcon aria-hidden="true" focusable="false" />
      <template #fallback><StarIcon aria-hidden="true" focusable="false" /></template>
    </ToggleIndicator>
  </Toggle>
</template>