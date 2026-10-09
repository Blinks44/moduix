<script setup lang="ts">
import {
  ListboxItemContext as ArkListboxItemContext,
  type UseListboxItemContext,
} from '@ark-ui/vue/listbox';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseListboxItemContext>) => unknown }>();
</script>

<template>
  <ArkListboxItemContext v-slot="context">
    <slot v-bind="context" />
  </ArkListboxItemContext>
</template>