<script setup lang="ts">
import { PopoverContext as ArkPopoverContext, type UsePopoverContext } from '@ark-ui/vue/popover';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (popover: UnwrapRef<UsePopoverContext>) => unknown }>();
</script>

<template>
  <ArkPopoverContext v-slot="popover">
    <slot v-bind="popover" />
  </ArkPopoverContext>
</template>