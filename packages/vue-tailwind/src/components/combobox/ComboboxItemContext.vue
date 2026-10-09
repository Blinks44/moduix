<script setup lang="ts">
import {
  ComboboxItemContext as ArkComboboxItemContext,
  type UseComboboxItemContext,
} from '@ark-ui/vue/combobox';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseComboboxItemContext>) => unknown }>();
</script>

<template>
  <ArkComboboxItemContext v-slot="context">
    <slot v-bind="context" />
  </ArkComboboxItemContext>
</template>