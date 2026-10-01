<script setup lang="ts">
import { Check as CheckIcon } from '@lucide/vue';
import { Toggle } from '@moduix/vue/toggle';
</script>

<template>
  <Toggle as-child variant="outline" default-pressed>
    <button type="button">
      <CheckIcon aria-hidden="true" focusable="false" />
      Save to favorites
    </button>
  </Toggle>
</template>