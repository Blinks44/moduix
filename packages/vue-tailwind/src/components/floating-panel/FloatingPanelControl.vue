<script setup lang="ts">
import { FloatingPanelControl as ArkFloatingPanelControl } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelControlProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelControl
    v-bind="attrs"
    :class="cn('inline-flex flex-none items-center gap-1', className)"
    data-slot="floating-panel-control"
  >
    <slot />
  </ArkFloatingPanelControl>
</template>