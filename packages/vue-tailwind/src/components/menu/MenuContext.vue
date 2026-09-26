<script setup lang="ts">
import { MenuContext as ArkMenuContext, type UseMenuContext } from '@ark-ui/vue/menu';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseMenuContext>) => unknown }>();
</script>

<template>
  <ArkMenuContext v-slot="context">
    <slot v-bind="context" />
  </ArkMenuContext>
</template>