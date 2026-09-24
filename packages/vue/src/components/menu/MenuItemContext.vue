<script setup lang="ts">
import { MenuItemContext as ArkMenuItemContext, type UseMenuItemContext } from '@ark-ui/vue/menu';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseMenuItemContext>) => unknown }>();
</script>

<template>
  <ArkMenuItemContext v-slot="context">
    <slot v-bind="context" />
  </ArkMenuItemContext>
</template>