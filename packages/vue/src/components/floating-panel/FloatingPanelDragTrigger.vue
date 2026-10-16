<script setup lang="ts">
import { FloatingPanelDragTrigger as ArkFloatingPanelDragTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelDragTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelDragTriggerProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelDragTrigger v-bind="attrs" data-slot="floating-panel-drag-trigger">
    <slot />
  </ArkFloatingPanelDragTrigger>
</template>