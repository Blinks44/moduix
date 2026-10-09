<script setup lang="ts">
import {
  RadioGroupItemContext as ArkRadioGroupItemContext,
  type UseRadioGroupItemContext,
} from '@ark-ui/vue/radio-group';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseRadioGroupItemContext>) => unknown }>();
</script>

<template>
  <ArkRadioGroupItemContext v-slot="context">
    <slot v-bind="context" />
  </ArkRadioGroupItemContext>
</template>