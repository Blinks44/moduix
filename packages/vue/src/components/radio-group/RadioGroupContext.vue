<script setup lang="ts">
import {
  RadioGroupContext as ArkRadioGroupContext,
  type UseRadioGroupContext,
} from '@ark-ui/vue/radio-group';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseRadioGroupContext>) => unknown }>();
</script>

<template>
  <ArkRadioGroupContext v-slot="context">
    <slot v-bind="context" />
  </ArkRadioGroupContext>
</template>