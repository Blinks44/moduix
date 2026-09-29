<script setup lang="ts">
import {
  ProgressContext as ArkProgressContext,
  type UseProgressContext,
} from '@ark-ui/vue/progress';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseProgressContext>) => unknown }>();
</script>

<template>
  <ArkProgressContext v-slot="context">
    <slot v-bind="context" />
  </ArkProgressContext>
</template>