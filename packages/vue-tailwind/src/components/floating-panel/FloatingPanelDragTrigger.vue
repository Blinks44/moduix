<script setup lang="ts">
import { FloatingPanelDragTrigger as ArkFloatingPanelDragTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelDragTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelDragTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelDragTrigger
    v-bind="attrs"
    :class="cn('block', className)"
    data-slot="floating-panel-drag-trigger"
  >
    <slot />
  </ArkFloatingPanelDragTrigger>
</template>