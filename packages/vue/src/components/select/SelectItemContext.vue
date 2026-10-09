<script setup lang="ts">
import {
  SelectItemContext as ArkSelectItemContext,
  useSelectItemContext,
} from '@ark-ui/vue/select';
import type { UnwrapRef } from 'vue';

defineSlots<{
  default: (context: UnwrapRef<ReturnType<typeof useSelectItemContext>>) => unknown;
}>();
</script>

<template>
  <ArkSelectItemContext v-slot="context">
    <slot v-bind="context" />
  </ArkSelectItemContext>
</template>