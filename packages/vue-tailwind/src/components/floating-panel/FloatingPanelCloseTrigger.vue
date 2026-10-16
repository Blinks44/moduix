<script setup lang="ts">
import { FloatingPanelCloseTrigger as ArkFloatingPanelCloseTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelCloseTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { controlButtonClass } from './floating-panel.types';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelCloseTriggerProps {
  asChild?: FloatingPanelCloseTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && controlButtonClass, className)"
    data-slot="floating-panel-close-trigger"
  >
    <slot />
  </ArkFloatingPanelCloseTrigger>
</template>