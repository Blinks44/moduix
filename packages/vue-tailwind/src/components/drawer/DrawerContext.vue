<script setup lang="ts">
import { DrawerContext as ArkDrawerContext, type UseDrawerContext } from '@ark-ui/vue/drawer';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseDrawerContext>) => unknown }>();
</script>

<template>
  <ArkDrawerContext v-slot="context">
    <slot v-bind="context" />
  </ArkDrawerContext>
</template>
