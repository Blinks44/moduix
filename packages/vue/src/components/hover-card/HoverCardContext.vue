<script setup lang="ts">
import {
  HoverCardContext as ArkHoverCardContext,
  type UseHoverCardContext,
} from '@ark-ui/vue/hover-card';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (hoverCard: UnwrapRef<UseHoverCardContext>) => unknown }>();
</script>

<template>
  <ArkHoverCardContext v-slot="hoverCard">
    <slot v-bind="hoverCard" />
  </ArkHoverCardContext>
</template>